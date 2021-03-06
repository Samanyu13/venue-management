var express = require('express');
var router = express.Router();

router.use('/incharge', require('./incharge'));
router.use('/events', require('./events'));
router.use('/admin', require('./admin'));

module.exports = router;
