const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.post('/loadAll',function(req, res, next) {
    methods.Calendar.loadAllEvents()
    .then((events) => {
        console.log(events)
        return res.json(events.list);
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            success: false,
            err: err
        }); 
    });
})

router.post('/loadUser',function(req, res, next) {
    var x = JSON.parse(req.body.user);
    methods.Calendar.loadUserEvents(x.venue_id)
    .then((events) => {
        return res.json(events.list);
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            success: false,
            err: err
        }); 
    });
})

router.post('/loadForVenue',function(req, res, next) {
    var x = JSON.parse(req.body.user);
    methods.Calendar.loadUserEvents(x.venue_id)
    .then((events) => {
        return res.json(events.list);
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            success: false,
            err: err
        }); 
    });
})

router.post('/loadVenueByCode',function(req, res, next) {
    var x = JSON.parse(req.body.user);
    methods.Calendar.loadUserEvents(x.venue_id)
    .then((events) => {
        return res.json(events.list);
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            success: false,
            err: err
        }); 
    });
})

router.post('/loadVenueByCode/:code',function(req, res, next) {
    var x = req.params.code;
    methods.Calendar.loadUserEvents(x)
    .then((events) => {
        return res.json(events.list);
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            success: false,
            err: err
        }); 
    });
})

router.get('/getUserEvents/:info',function(req, res, next) {
    var x = req.params.info;
    console.log(x)
    methods.Calendar.loadUserEvents(x)
    .then((events) => {
        return res.json(events.all);
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            success: false,
            err: err
        }); 
    });
})

module.exports = router;