'use strict';
//Just a test comment
var express = require('express');
var controller = require('./cost.controller');

const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
});

var router = express.Router();
router.get('/', controller.find);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.post('/import_costs', upload.single('file'), controller.importCosts);
router.get('/export', controller.exportCosts);

module.exports = router;
