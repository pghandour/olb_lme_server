const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Upload Template HTML' });
});

router.get('/getData/:name', function (req, res, next) {
  const templateName = req.params.name;
  console.log("+++ templateName => ", templateName);
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
  console.log('templateData => ', templateData);
  if (templateData.length > 0) {
    const dataToReturn = JSON.parse(fs.readFileSync(templateData[0].convertedJsonPath));

    res.send(dataToReturn);
  }
  return templateData;
});

module.exports = router;
