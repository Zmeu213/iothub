var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('custom_view', { title: 'Sorry, not now' });
});

module.exports = router;