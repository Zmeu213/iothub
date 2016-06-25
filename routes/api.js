var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Sucses');
});

router.get('/:temp', function(req, res, next) {
  res.send(req.params);
});

module.exports = router;