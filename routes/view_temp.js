var express = require('express');
var vis = require("vis");
var router = express.Router();

var pg = require('pg');
var conString = "postgres://app_rw:samplepass@localhost/iothub";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view_temp', {title: "Show temp", myvar: "tempreture, C"});
});

router.post('/', function(req, res, next) { 
    console.log(req.params);
    res.render('view_temp', {items: "Show data", myvar: "... sorry, other devices not available"});
});

module.exports = router;
module.exports.get_items2