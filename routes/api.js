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

router.get('/get_data/device=:id/from=:from/to=:to', function(req, res, next) {
  	custom_select_from_to(req.params.id, req.params.from, req.params.to, (t) => {
        res.send(t);
    })
});

router.get('/get_data/device=:id/from=:from/to=:to/count=:count', function(req, res, next) {
    var arr_of_json = ["fail"];
  	custom_select_from_to(req.params.id, req.params.from, req.params.to, (t) => {
        // arr_of_json;
        var need  = Math.floor(t.length / req.params.count) < 1 ? 1 : Math.floor(t.length / req.params.count);
        arr_of_json = [];
        
        for (var i = 0; i < req.params.count; i++) {
            cust_json = {};
            var data_sum = 0;
            // var time_sum = new Date(0);
            for(var j = need*i; j < (need*(i+1) < t.length ? need*(i+1) : t.length); j++){
                data_sum = data_sum + parseFloat(t[j].data);
                // time_sum.setMinutes(time_sum.getMinutes() + t[j].time.getMinutes());
                // time_sum = time_sum + t[j];
            }
            // console.log(j + " | " +data_sum +"/"+need+" | " + data_sum/need);
            // console.log(time_sum)
            cust_json["data"] = JSON.stringify(data_sum/need)
            arr_of_json.push(cust_json);
        }
        res.send(JSON.stringify(arr_of_json));
    })
});


module.exports = router;