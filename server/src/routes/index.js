var express = require('express');
var router = express.Router();

const { Client } = require("@notionhq/client");
const { getEnv } = require("../utils/env.util");
const notionService = require("../services/notion.service");

// Initializing a client
const notion = new Client({
  auth: getEnv("NOTION_TOKEN"),
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await notionService.getData();
  let nodes_json = JSON.stringify(data.nodes);
  let edges_json = JSON.stringify(data.edges);
  res.render('index', { title: 'TreeVisualizer' , nodes: nodes_json, edges: edges_json});
});

module.exports = router;
