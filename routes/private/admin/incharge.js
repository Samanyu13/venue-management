var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/addIncharge', function(req, res, next) {
    res.render('private/admin/add_incharge', {title: 'Register Incharge'});
});

router.get('/removeIncharge', function(req, res, next) {
    res.render('private/admin/remove_incharge', {title: 'Remove Incharge'});
});

router.post('/removeIncharge', function(req, res, next) {

    var info = req.body.username;

    methods.Admin.removeIncharge(info)
    .then(result => {
        return res.json({
            'success': true,
            'data': result.data
        });
    })
    .catch(err => {
        return res.json({
            'success': false,
            'err': err
        });    
    });
});

module.exports = router;
