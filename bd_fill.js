var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');
var api = require('./routes/api');

var pg = require('pg');
var conString = "postgres://app_rw:samplepass@localhost/iothub";

var app = express();


var date = new Date('2016-06-01T12:00:00');
// console.log(date.toUTCString());
date.setMinutes(date.getMinutes() + 5);
//console.log(date.toUTCString());

function parseDate(date) {
   //Grab each of your components
   var yyyy = date.getFullYear().toString();
   var MM = (date.getMonth()+1).toString();
   var dd  = date.getDate().toString();
   var hh = date.getHours().toString();
   var mm = date.getMinutes().toString();
//   var ss = date.getSeconds().toString();

   //Returns your formatted result
  return yyyy + '-' + (MM[1]?MM:"0"+MM[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + ' ' + (hh[1]?hh:"0"+hh[0]) + ':' + (mm[1]?mm:"0"+mm[0]);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function go_on() {
    var client = new pg.Client(conString);
    client.connect();
    var intrand = 200;
    var new_rand = 0;
    var result_str  = "INSERT INTO data(data, time, devicae_id) VALUES "
   
    for (var i = 0; i <= 100000; i++) {
        date.setMinutes(date.getMinutes() + 5);
        new_rand = Math.random() * (4) - 2 
        if (intrand + new_rand > 300) {
            intrand = 300 - Math.random()
        }
        else {
            if (intrand + new_rand < 100){
                intrand = 100 + Math.random()
            }
            else
            {
                intrand = intrand + new_rand
            }
        }
        console.log(i + "] INSERT "+ parseDate(date) +", text: " + intrand)
        result_str = result_str + "('"+intrand+"','"+parseDate(date)+"', 8) ";
        if (i<100000){ result_str = result_str + ','} else { result_str = result_str + ';'} 
    }
    client.query(result_str, 
    function(err, result) {
        console.log(err);
        client.end(); 
        }
    );
};
go_on()