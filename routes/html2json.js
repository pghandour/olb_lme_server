const express = require('express');
const router = express.Router();
const fs = require('fs');
const himalaya = require('himalaya');
const removeWhitespace = require('../public/javascripts/himalaya-strip-whitespace.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // read html file
  const html = fs.readFileSync('./uploads/sample.html', { encoding: 'utf8' });

  // convert html to json
  const json = himalaya.parse(html);

  // remove whitespace and linebreaks
  const cleanJson = removeWhitespace(json);

  // get contents inside html tag
  const htmlTag = cleanJson[1];

  // get an array of all tags inside body tag
  const arrayOfTags = htmlTag.children[1].children;

  // enable cross-origin-resource-sharing (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // return the json results
  res.send(arrayOfTags);
});

module.exports = router;
