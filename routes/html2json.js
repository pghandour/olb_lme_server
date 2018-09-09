const express = require('express');
const router = express.Router();
const convertHtml2Json = require('../public/javascripts/convertHtml2Json.js');

router.post('/', function (req, res, next) {
  const templateName = JSON.parse(req.body.templates);

  if (templateName.length > 0) {
    templateName.forEach(template => {
      convertHtml2Json(template);
    });
  }

  // return the json results
  res.send("Success: Convert HTML to JSON");
});

module.exports = router;
