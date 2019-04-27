var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/addIncharge', function(req, res, next) {
    res.render('private/admin/add_incharge', {title: 'Register Incharge'});
});

router.get('/removeIncharge', function(req, res, next) {
    res.render('private/admin/remove_incharge', {title: 'Remove Incharge'});
});

module.exports = router;
