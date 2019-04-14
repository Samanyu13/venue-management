const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.get('/classes', function(req, res, next) {
  res.render('select_venue/classes', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
    res.render('select_venue/main', { title: 'Express' });
  });

  router.get('/lecture', function(req, res, next) {
    res.render('select_venue/lecture', { title: 'Express' });
  });

  router.get('/labs', function(req, res, next) {
    res.render('select_venue/labs', { title: 'Express' });
  });

  module.exports = router;