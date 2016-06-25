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
    var func_query = client.query('SELECT * FROM data;', function(err, result) {
        f(result.rows);
        client.end();
    });
};

function custom_select_by_device_id(id, f){
    var client = new pg.Client(conString);
    client.connect();
    console.log("SELECT * was called WHERE devicae_id = "+ id +";");
    var func_query = client.query('SELECT * FROM data WHERE devicae_id = '+ id +';', function(err, result) {
        f(result.rows);
        client.end();
    });
};

function custom_select_by_user_id(id, f){
    var client = new pg.Client(conString);
    client.connect();
    console.log("SELECT * was called WHERE user_id = "+ id +";");
    var func_query = client.query('SELECT * FROM data WHERE devicae_id = (select device_id from device_user where user_id = '+ id +' );', function(err, result) {
        f(result.rows);
        client.end();
    });
};

function custom_select_from_to(id, from, to, f){
    var client = new pg.Client(conString);
    client.connect();
    console.log("select * from data where time > '"+from+"' AND time < '"+to+"';");
    var func_query = client.query("select * from data where time > '"+from+"' AND time < '"+to+"' AND devicae_id = "+id+";", function(err, result) {
        f(result.rows);
        client.end();
    });
};

router.get('/select', function(req, res, next) {
  	custom_select((t) => {
        res.send(t);
    })
});

router.get('/select/device=:id', function(req, res, next) {
  	custom_select_by_device_id(req.params.id, (t) => {
        res.send(t);
    })
});

router.get('/select/user=:id', function(req, res, next) {
  	custom_select_by_user_id(req.params.id, (t) => {
        res.send(t);
    })
});

router.get('/get_temp/user=:id/from=:from/to=:to', function(req, res, next) {
  	custom_select_from_to(req.params.id, req.params.from, req.params.to, (t) => {
        res.send(t);
    })
});

module.exports = router;