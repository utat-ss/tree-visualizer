const notion = require('@notionhq/client');
const { getEnv } = require('../utils/env.util')

const newNotionClient = function(auth_token = undefined) {
  if (auth_token === undefined) auth_token = getEnv('NOTION_TOKEN');

  return new notion.Client({
    auth: auth_token,
  });
}

const _getNotionDB = async function(database_id, notion_client = undefined) {
  if (notion_client === undefined) notion_client = newNotionClient();

  let data = [];
  let has_more = true;
  let cursor = undefined;

  // Go through pagination to grab all data
  while (has_more) {
    const results = await notion_client.databases.query({
      database_id: database_id,
      start_cursor: cursor
    });
    has_more = results.has_more;
    cursor = results.next_cursor;
    data.push(...results.results);
  }

  return data;
}

const _getDBTitles = async function(database_id, col = 'Name', notion_client = undefined) {
  if (notion_client === undefined) notion_client = newNotionClient();

  let raw_data = await _getNotionDB(database_id, notion_client);

  let titles = {};
  for (let elem of raw_data) {
    titles[elem.id] = elem.properties[col].title?.[0]?.plain_text;
  }

  return titles;
}

const getRequirementQualifiers = async function() {
  return await _getDBTitles(getEnv('NOTION_REQUIREMENT_QUALIFIERS_DB_ID'), 'Qualifiers');
}

const getTestPlans = async function() {
  return await _getDBTitles(getEnv('NOTION_TEST_PLANS_DB_ID'));
}

const getSystems = async function() {
  return await _getDBTitles(getEnv('NOTION_SYSTEM_ARCHITECTURE_DB_ID'));
}

const getTrades = async function() {
  return await _getDBTitles(getEnv('NOTION_TRADES_DB_ID'));
}

const getTeams = async function() {
  return await _getDBTitles(getEnv('NOTION_TEAMS_DB_ID'));
}

const getMissions = async function() {
  return await _getDBTitles(getEnv('NOTION_MISSIONS_DB_ID'));
}

const _parseRequirementsForAPI = async function(raw_data) {
  const qualifiers = await getRequirementQualifiers();
  const test_plans = await getTestPlans();
  const systems = await getSystems();
  const trades = await getTrades();
  const teams = await getTeams();
  const missions = await getMissions();

  let data = {};
  for (let elem of raw_data) {
    let props = elem.properties;
    data[elem.id] = {
      'created-by': props['Created by'].created_by.name,
      'parent-id': props.Parent.relation?.[0]?.id ?? '',                  // Notion enforced limit 1
      'last-edited': props['Last Edited'].last_edited_time,
      'qualifier': qualifiers[props['🛑 Qualifier'].relation?.[0]?.id] ?? '',   // Notion enforced limit 1
      'collection': props.Collection.multi_select.map(c => c.name),       // * list
      'test-plans': props['🏁 Test Plans'].relation.map(r => test_plans[r.id]),  // * list
      'system': systems[props['🏗️ System'].relation?.[0]?.id] ?? '',                  // Notion enforced limit 1
      'rationale': props.Rationale.rich_text?.[0]?.plain_text ?? '',
      'trades': props['🃏 Trades'].relation.map(r => trades[r.id]),      // * list
      'last-edited-by': props['Last Edited By'].last_edited_by.name,
      'stakeholder': props['⚽ Stakeholder'].relation.map(r => teams[r.id]),          // * list
      'mission': missions[props['🏆 Mission'.relation?.[0]?.id]] ?? '',  // Notion enforced limit 1
      'description': props.Description.rich_text?.[0]?.plain_text ?? '',
      'title': props.ID.title?.[0]?.plain_text ?? '',
      'url': elem.url
    }
  }

  return data;
}

const _parseRequirementsForVis = async function(raw_data) {
  // Simplify into title, parent, child(ren)
  let all_obj = {};
  for (let elem of raw_data) {
    all_obj[elem.id] = {
      title: elem.properties['ID'].title[0]?.plain_text,
      parent: elem.properties.Parent.relation[0]?.id,
      children: elem.properties.Child.relation?.map(r => r.id)
    }
  }

  // Parse into node/edge format that vis-network understands
  let nodes = [];
  let edges = [];
  for (let key of Object.keys(all_obj)) {
    entry = all_obj[key];
    nodes.push({
      id: key,
      label: entry.title
    });

    if (entry.parent != undefined) {
      edges.push({
        from: entry.parent,
        to: key
      });
    }
  }

  // Return nodes and edges
  return {
    nodes: nodes,
    edges: edges
  }
}

const getRequirements = async function(format = 'api') {
  let raw_data = await _getNotionDB(getEnv('NOTION_REQUIREMENTS_DB_ID'));

  switch (format) {
    case 'api': return _parseRequirementsForAPI(raw_data);
    case 'vis': return _parseRequirementsForVis(raw_data);
  }
}

module.exports = { newNotionClient, getRequirements, _getNotionDB };
