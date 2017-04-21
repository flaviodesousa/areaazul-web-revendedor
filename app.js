'use strict';

const AreaAzul = require('areaazul');

const bodyParser = require('body-parser');
const express = require('express');
const load = require('express-load');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const store = new KnexSessionStore({ knex: AreaAzul._internals.Bookshelf.knex });

const app = express();
const flash = require('connect-flash');

const passport = require('passport');
require('./authentication')(passport);

const expressValidator = require('express-validator');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const AREAAZUL_WEB_SECRET = process.env.AREAAZUL_WEB_SECRET || '4r344zu1';
const AREAAZUL_API_ENDPOINT = process.env.AREAAZUL_API_ENDPOINT;

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.cookie('api-endpoint', AREAAZUL_API_ENDPOINT);
  next();
});
app.use(session({
  secret: AREAAZUL_WEB_SECRET,
  name: 'areaazul-web-revenda',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 900000 },
  store: store
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

// Modulos - Modelo - Controller - Rotas
load('controllers').then('routes').into(app);

if (app.get('env') === 'development') {
  app.use(errorHandler());
} else {
  // Production error handler no stack traces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
    next();
  });
}

module.exports = app;
