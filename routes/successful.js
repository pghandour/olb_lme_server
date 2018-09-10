const express = require('express');
const router = express.Router();

router.get('/html2json', function (req, res, next) {
  res.render('successful', { title: 'Success: Convert HTML to JSON' });
});

module.exports = router;