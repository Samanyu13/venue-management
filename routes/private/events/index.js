var express = require('express');
var router = express.Router();
const methods = require("../../../methods");

router.get('/add_event', function(req, res, next) {
    res.render('private/incharge/add_event',{ title: 'Add Event'});
});

router.get('/delete_event', function(req, res, next) {
    res.render('private/incharge/delete_event',{ title: 'Delete Event'});
});

router.get('/edit_event', function(req, res, next) {
    res.render('private/incharge/edit_event',{ title: 'Edit Event'});
});

router.post('/add_event', function(req, res, next) {

    var tosend = {};
    tosend.event_name = req.body.event_name;
    tosend.coordinator = req.body.coordinator;
    tosend.date = req.body.date;
    tosend.coordinator_phone = req.body.coordinator_phone;
    tosend.start_time = req.body.start_time;
    tosend.end_time = req.body.end_time;
    tosend.venue_id = req.body.venue_id;

    methods.Incharge.addEvent(tosend)
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
