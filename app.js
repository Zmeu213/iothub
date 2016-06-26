var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var vis = require("vis");

var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');
var api = require('./routes/api');
var view_temp = require('./routes/view_temp');
var about = require('./routes/about');
var user = require("./routes/user");
var custom_view = require("./routes/custom_webpage");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use('/view_temp', view_temp);
app.use('/about', about);
app.use('/user', user);
app.use('/comming_soon', custom_view);

app.use('/api', api);

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



app.listen(process.env.PORT, function () {
  console.log('Server start at port '+process.env.PORT+'!');
});

module.exports = app;