const express = require('express');
const router = express.Router();
const fs = require('fs');

// GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Upload Template HTML' });
});

// Listen to React request and send relative data back to react
router.get('/getData/:name', function (req, res, next) {
  const templateName = req.params.name;

  const templateInfoPath = './data/convertedTemplateInfo.json';

  // get all current saved templates information
  const currentTemplates = JSON.parse(fs.readFileSync(templateInfoPath));

  let templateData = [];

  for (let i = 0, len = currentTemplates.length; i < len; i++) {
    if (currentTemplates[i].templateName === templateName) {
      templateData.push(currentTemplates[i]);
      break;
    }
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (templateData.length > 0) {
    const dataToReturn = JSON.parse(fs.readFileSync(templateData[0].convertedJsonPath));

    res.send(dataToReturn);
  } else {
    res.send(templateData);
  }
});

// auto-generate fields templates in HTML file
router.get('generateFieldsTemplate/:name', function (req, res, next) {

});

module.exports = router;
