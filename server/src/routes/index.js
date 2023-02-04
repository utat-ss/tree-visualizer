var express = require('express');
var router = express.Router();

const { getEnv } = require("../utils/env.util");
const notionService = require("../services/notion.service");

// GET : TreeVisualizer demo
router.get('/', async function(req, res, next) {
  let data = await notionService.getRequirementsData();
  let nodes_json = JSON.stringify(data.nodes);
  let edges_json = JSON.stringify(data.edges);
  res.render('index', { title: 'TreeVisualizer' , nodes: nodes_json, edges: edges_json});
});

// GET : JSON API
router.get('/api/requirements', async function(req, res, next) {
  let data = await notionService.getRequirementsData();
  res.json(data);
});

module.exports = router;
