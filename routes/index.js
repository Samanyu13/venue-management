var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); 
});

router.get('/venue', function(req, res, next) {
  res.render('venue', { title: 'Express' });
});

router.use('/authentication', require('./authentication'));

router.use('/select_venue', require('./select_venue'));

module.exports = router;
