var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');

//PGSQL integration
var pgp = require('pg-promise')();  
var connection_string_for_postgres = {
    host: 'localhost',
    port: 5433,
    database: 'testdb',
    user: 'app_ro',
    password: 'samplepass'
};
var db = pgp(connection_string_for_postgres);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use(express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use(express.static(__dirname + '/node_modules/jquery2')); // redirect JS jQuery
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/', routes);
app.use('/registration', registration);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Custome responses



app.listen(3000, function () {
  console.log('Server start at port 3000!');
});

module.exports = app;
module.exports.db = db;