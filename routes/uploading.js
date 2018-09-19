const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const convertHtml2Json = require('../public/javascripts/convertHtml2Json.js');

router.post('/templates', upload.array('templates'), (req, res, next) => {
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

router.post('/html2json/:lob/:category', function (req, res, next) {
  const templateName = JSON.parse(req.body.templates);
  const selectedLob = req.params.lob;
  const selectedCategory = req.params.category;

  if (templateName.length > 0) {
    templateName.forEach(template => {
      convertHtml2Json(template, selectedLob, selectedCategory);

    });
  }

  // return the json results
  res.send("Success: Convert HTML to JSON");
});

module.exports = router;
