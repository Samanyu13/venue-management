var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); 
});

router.get('/venue', function(req, res, next) {
  res.render('venue', { title: 'Express' });
});

router.use('/private',auth, require('./private'));
router.use('/calendar', require('./calendar'));
router.use('/select_venue', require('./select_venue'));
router.use('/authentication', require('./authentication'));

module.exports = router;
