const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.get('/classes', function(req, res, next) {
  res.render('select_venue/classes', { title: 'Classes' });
});

router.get('/classes/:name', function(req, res, next) {
  res.render('venue', { title: 'Venue'});
});

router.get('/main', function(req, res, next) {
  res.render('select_venue/main', { title: 'Main Halls' });
});

router.get('/lecture', function(req, res, next) {
  res.render('select_venue/lecture', { title: 'Lectures' });
});

router.get('/labs', function(req, res, next) {
  res.render('select_venue/labs', { title: 'Labs' });
});

  module.exports = router;