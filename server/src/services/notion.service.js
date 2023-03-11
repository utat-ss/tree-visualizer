const notion = require('@notionhq/client');
const { getEnv } = require('../utils/env.util')

const notionClient = new notion.Client({
  auth: getEnv('NOTION_TOKEN'),
})

const _getNotionDB = async function(database_id) {
  let data = [];
  let has_more = true;
  let cursor = undefined;

  // Go through pagination to grab all data
  while (has_more) {
    const results = await notionClient.databases.query({
      database_id: database_id,
      start_cursor: cursor
    });
    has_more = results.has_more;
    cursor = results.next_cursor;
    data.push(...results.results);
  }

  return data;
}

const _parseRequirementsForAPI = async function(raw_data) {
  return raw_data;
}

const _parseRequirementsForVis = async function(raw_data) {
  // Simplify into title, parent, child(ren)
  let all_obj = {};
  for (let elem of raw_data) {
    all_obj[elem.id] = {
      title: elem.properties["ID"].title[0]?.plain_text,
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

module.exports = { getRequirements };
