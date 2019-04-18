const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.post('/load',function(req, res, next) {
    methods.Calendar.loadEvents()
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