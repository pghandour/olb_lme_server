const express = require('express');
const router = express.Router();
const convertHtml2Json = require('../public/javascripts/convertHtml2Json.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const templateName = "sample.html";

  convertHtml2Json(templateName);

  // enable cross-origin-resource-sharing (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // return the json results
  res.send("Template is converted to a JSON file.");
});

module.exports = router;
