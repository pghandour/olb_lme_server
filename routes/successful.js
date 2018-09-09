const express = require('express');
const router = express.Router();

router.get('/:result', function (req, res, next) {
  const result = req.params.result;
  res.render('successful', { title: result });
});

module.exports = router;