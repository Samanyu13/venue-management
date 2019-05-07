const express = require("express");
const router = express.Router();
const methods = require("../../methods");


router.get('/', function(req, res, next) {
  res.render('select_venue/main', { title: 'Main' });
});

router.get('/:ven_code', function(req, res, next) {

  var code = req.params.ven_code;
  methods.Venue.getVenues_EventsByCode(code)
  .then(model => {
    console.log(JSON.stringify(model));
    if(model.success == true) {
      res.render('venue', { data: model.data});
    }else{
      res.render('error', { data: model.err});
    }
  })
});

  module.exports = router;