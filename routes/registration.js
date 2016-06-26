var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registration', { title: 'Registere to IoThub' });
});

router.post('/', function(request, response){
    console.log(request.body);
    
	response.send('Thank you!');
    //console.log(request.body.user.email);
})

module.exports = router;
