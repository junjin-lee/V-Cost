'use strict';
//Just a test comment
var express = require('express');
var controller = require('./report.controller');

var router = express.Router();
router.get('/getItemStatistics', controller.getItemStatistics);

module.exports = router;
