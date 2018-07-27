'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();
router.get('/', controller.find);
router.get('/info', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.put('/editinfo/:id', controller.editinfo);

module.exports = router;
