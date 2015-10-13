
'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var load = require('express-load');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var session = require('express-session');

var app = express();
var flash = require('connect-flash');

var passport = require('passport');
require('./authentication')(passport);

var expressValidator = require('express-validator');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var webSecret = process.env.AREAAZUL_WEB_SECRET || '4r344zu1';

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: webSecret,
  name: 'areaazul-web-adm',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge:  900000},
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

// Modulos - Modelo - Controler - Rotas
load('controllers').then('routes').into(app);

if (app.get('env') === 'development') {
  app.use(errorHandler());
} else {
  // Production error handler no stacktraces leaked to user
  app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
  next();
});
}

module.exports = app;
