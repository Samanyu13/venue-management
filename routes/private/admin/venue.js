var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/addVenue', function(req, res, next) {
    res.render('private/admin/add_venue', {title: 'Register Venue'});
});

router.get('/removeVenue', function(req, res, next) {
    res.render('private/admin/remove_venue', {title: 'Remove Venue'});
});

module.exports = router;
