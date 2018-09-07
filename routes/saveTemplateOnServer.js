const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('templateList', { title: 'Template List' });
});

/* POST users listing. */
router.post('/', upload.array('templates'), function (req, res, next) {
  const files = req.files;

  for (let i = 0, len = files.length; i < len; i++) {
    let oldpath = files[i].path;
    let newpath = files[i].destination + files[i].originalname;

    fs.rename(oldpath, newpath, function (err) {
      if (err) return err;
    });
  }

  res.json(req.files);
});

module.exports = router;
