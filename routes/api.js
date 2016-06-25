var express = require('express');
var router = express.Router();

//PGSQL integration
// var pgp = require('pg-promise')();  

var pg = require('pg');
var conString = "postgres://app_rw:samplepass@localhost/iothub";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to IoThub API!");
});

function custom_select(f){
    var client = new pg.Client(conString);
    client.connect();
    console.log("SELECT * was called");
    var func_query = client.query('SELECT * FROM public."Data" data;', function(err, result) {
        f(result.rows)
        client.end();
    });
};

router.get('/select', function(req, res, next) {
  	custom_select((t) => {
        res.send(t);
    })
});

module.exports = router;