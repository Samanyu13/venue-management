var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/dashboard', function(req, res, next) {
    res.render('private/incharge/dashboard',{ title: 'Dashboard'});
});

router.get('/getInchargeDetails/:info', function(req, res, next) {

    let info = req.params.info;
    methods.Incharge.getUserDetails(info)
    .then((details) => {
        return res.json({
            'success': true,
            'details': details.details
        });
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            'success': false,
            'err': err
        });
    });
});

module.exports = router;
