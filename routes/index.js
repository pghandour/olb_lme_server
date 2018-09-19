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

  const templateInfoPath = './data/Template.json';

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

router.get('/getLobData', (req, res) => {
  const dataPath = './data/Lob.json';
  const lobData = JSON.parse(fs.readFileSync(dataPath));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(lobData);
});

router.get('/getCategories', (req, res) => {
  const dataPath = './data/Category.json';
  const categories = JSON.parse(fs.readFileSync(dataPath));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(categories);
});

router.get('/getLobAndCategory', (req, res) => {
  const lobDataPath = './data/Lob.json';
  const categoryDataPath = './data/Category.json';

  const lobData = JSON.parse(fs.readFileSync(lobDataPath));
  const categories = JSON.parse(fs.readFileSync(categoryDataPath));

  let dataToReturn = {
    lobOptions: lobData,
    categoryOptions: categories
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(dataToReturn);
});

router.get('/getTemplateImg/:lob/:category', (req, res) => {
  const lob = req.params.lob;
  const category = req.params.category;

  const dataPath = './data/Template.json';
  const templateData = JSON.parse(fs.readFileSync(dataPath));

  let imagesPath = [];

  templateData.forEach(template => {
    if (template.lob === lob && template.category === category) {
      imagesPath.push(
        {
          templateName: template.templateName,
          imgPath: template.templateImgPath
        }
      );
    }
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(imagesPath);
});

module.exports = router;
