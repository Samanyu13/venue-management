var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/addVenue', function(req, res, next) {
    res.render('private/admin/add_venue', {title: 'Register Venue'});
});

router.get('/removeVenue', function(req, res, next) {
    res.render('private/admin/remove_venue', {title: 'Remove Venue'});
});

router.post('/addVenue', function(req, res, next) {

    let tosend = {};
    tosend.venue_name = req.body.venue_name;
    tosend.venue_type = req.body.venue_type;
    tosend.venue_code = req.body.venue_code;
    tosend.incharge_id = req.body.incharge_id;

    methods.Venue.addVenue(tosend)
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

router.post('/removeVenue', function(req, res, next) {

    var info = req.body.venue_code;

    methods.Venue.removeVenue(info)
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
