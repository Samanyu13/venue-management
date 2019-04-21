const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.post('/loadAll',function(req, res, next) {
    methods.Calendar.loadAllEvents()
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

module.exports = router;