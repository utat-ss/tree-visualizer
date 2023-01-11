var express = require('express');
var router = express.Router();

const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function getData() {
  let all = []
  let has_more = true;
  let cursor = undefined;
  while (has_more) {
    const results = await notion.databases.query({
      database_id: "b9c7195bd9fa414a97ee704f503a0e9f",
      start_cursor: cursor
    });
    has_more = results.has_more;
    cursor = results.next_cursor;
    all.push(...results.results);
  }
  
  let all_obj = {}
  for (let elem of all) {
    all_obj[elem.id] = {
      title: elem.properties["ID"].title[0]?.plain_text,
      parent: elem.properties.Parent.relation[0]?.id,
      children: elem.properties.Child.relation?.map(r => r.id)
    }
  }

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
    if (entry.children.length > 0) {
      for (let child in entry.children) {
        edges.push({
          from: key,
          to: child
        })
      }
    }
  }

  return {
    nodes: nodes,
    edges: edges
  }

  // for (let key of Object.keys(all_obj)) {
  //   console.log("--------------------------------");
  //   console.log("ID: " + all_obj[key].title);
  //   console.log("parent: " + all_obj[all_obj[key].parent]?.title);
  //   for (let child of all_obj[key].children) {
  //     console.log("child: " + all_obj[child].title)
  //   }
  // }
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await getData();
  let nodes_json = JSON.stringify(data.nodes);
  let edges_json = JSON.stringify(data.edges);
  res.render('index', { title: 'TreeVisualizer' , nodes: nodes_json, edges: edges_json});
});

module.exports = router;
