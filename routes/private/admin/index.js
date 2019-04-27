var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/dashboard', function(req, res, next) {
    res.render('private/admin/dashboard',{ title: 'Admin Dashboard'});
})

router.use('/incharge', require('./incharge.js'));
router.use('/venue', require('./venue.js'));

module.exports = router;