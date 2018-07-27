/**
 * Main application routes
 */

'use strict';
const express = require('express');
const utils = require('./utils/utils');

module.exports = function (app) {
  // Insert routes below
  var apiRoutes = express.Router();
  apiRoutes.use(utils.cors);
  apiRoutes.use('/login', require('./api/login'));
  apiRoutes.use('/users', utils.mustlogin, require('./api/user'));
  apiRoutes.use('/category', utils.mustlogin, require('./api/category'));
  apiRoutes.use('/costitem', utils.mustlogin, require('./api/costitem'));
  apiRoutes.use('/cost', utils.mustlogin, require('./api/cost'));
  apiRoutes.use('/report', utils.mustlogin, require('./api/report'));
  app.use('/api', apiRoutes);

  // All other routes return error
  app.use(function (req, res, next) {
    console.log('404:', req.url);
    res.status(404).send({
      message: 'url not found.'
    });
  });

};
