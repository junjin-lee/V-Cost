/**
 * Main application file
 */

'use strict';

var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('./config/environment');
var http = require('http');


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render({
    message: err.message
  });
});

// Start server
function startServer() {
  server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
