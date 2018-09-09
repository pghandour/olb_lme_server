const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.get('/', function (req, res, next) {
  res.render('templateList', { title: 'Template List' });
});

/* POST users listing. */
router.post('/', upload.array('templates'), (req, res, next) => {
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

module.exports = router;
