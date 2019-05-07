const express = require("express");
const router = express.Router();

router.use('/classes', require('./classes'));
router.use('/main', require('./main'));
router.use('/lecture', require('./lecture'));
router.use('/labs', require('./labs'));

  module.exports = router;