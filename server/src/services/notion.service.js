const notion = require("@notionhq/client");
const { getEnv } = require("../utils/env.util")

const notionClient = new notion.Client({
  auth: getEnv("NOTION_TOKEN"),
})

const getRequirementsData = async function() {
  let all = []
  let has_more = true;
  let cursor = undefined;

  // Go through pagination to grab all data
  while (has_more) {
    const results = await notionClient.databases.query({
      database_id: "b9c7195bd9fa414a97ee704f503a0e9f",    // systems -> requirements DB
      start_cursor: cursor
    });
    has_more = results.has_more;
    cursor = results.next_cursor;
    all.push(...results.results);
  }

  // Simplify into title, parent, child(ren)
  let all_obj = {}
  for (let elem of all) {
    all_obj[elem.id] = {
      title: elem.properties["ID"].title[0]?.plain_text,
      parent: elem.properties.Parent.relation[0]?.id,
      children: elem.properties.Child.relation?.map(r => r.id)
    }
  }

  // Parse into node/edge format that vis-network understands
  let nodes = []
  let edges = []
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

module.exports = { getRequirementsData };
