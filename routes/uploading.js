const express = require('express');
const router = express.Router();
const multer = require('multer');
const htmlUpload = multer({ dest: 'uploads/' });
const imageUpload = multer({ dest: 'public/images/' });
const fs = require('fs');
const convertHtml2Json = require('../public/javascripts/convertHtml2Json.js');

router.post('/templates', htmlUpload.array('templates'), (req, res, next) => {
  const files = req.files;
  let uploadedFiles = [];

  for (let i = 0, len = files.length; i < len; i++) {
    let oldpath = files[i].path;
    let newpath = files[i].destination + files[i].originalname;
    uploadedFiles.push(files[i].originalname);

    fs.rename(oldpath, newpath, function (err) {
      if (err) return err;
    });
  }

  res.send(JSON.stringify(uploadedFiles));
});

router.post('/templateimages', imageUpload.array('templateimages'), (req, res, next) => {
  const files = req.files;
  let imagesPath = [];

  for (let i = 0, len = files.length; i < len; i++) {
    let oldpath = files[i].path;
    let newpath = files[i].destination + files[i].originalname;

    fs.rename(oldpath, newpath, function (err) {
      if (err) return err;
    });

    newpath = newpath.slice('public'.length);
    imagesPath.push(newpath);
  }

  res.send(JSON.stringify(imagesPath));
});

router.post('/html2json/:lob/:category', function (req, res, next) {
  const templateNames = JSON.parse(req.body.htmlNames);
  const imagesPath = JSON.parse(req.body.imagesPath);
  const selectedLob = req.params.lob;
  const selectedCategory = req.params.category;
  const templatesLen = templateNames.length;
  const imagesLen = imagesPath.length;

  if (templatesLen > 0 && imagesLen > 0
    && templatesLen === imagesLen
  ) {

    templateNames.forEach(template => {
      imagesPath.forEach(imagePath => {
        let templateName = template.split('.')[0];
        let imageName = imagePath.split('.')[0].slice('/images/'.length);

        if (templateName === imageName) {
          convertHtml2Json(template, selectedLob, selectedCategory, imagePath);
          return;
        }
      })
    });
  }

  // return the json results
  res.send("Success! Converted HTML to JSON.");
});

router.post('/add-category', function (req, res, next) {
  var filePath = 'data/Category.json';
  var categories;
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    
    //read in the data
    categories = JSON.parse(data); 
    
    // add the new category
    categories.push(req.body) 
    
    // Make it into an object
    var newCategories = JSON.stringify(categories); 

    // Write it to file
    fs.writeFile(filePath, newCategories, (err, data) => {
      if (err) throw err;
      res.send("Success: Added Category")
    });
  });
});

module.exports = router;
