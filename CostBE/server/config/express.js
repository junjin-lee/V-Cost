/**
 * Express configuration
 */

'use strict';

var express =require('express');
var morgan =require('morgan');
var bodyParser =require('body-parser');
var methodOverride =require('method-override');
var cookieParser =require('cookie-parser');
var errorHandler =require('errorhandler');
var path =require('path');
var config =require('./environment');
var session =require('express-session');
var connectMongo =require('connect-mongo');
var mongoose =require('mongoose');
var MongoStore = connectMongo(session);

module.exports=function(app) {
  var env = app.get('env');

  if(env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }
  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  if(env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
