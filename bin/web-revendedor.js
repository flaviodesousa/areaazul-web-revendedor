#!/usr/bin/env node

var debug = require('debug')('areaazul');
var app = require('../app');

app.set('port', process.env.PORT || 18360);

var server = app.listen(app.get('port'), 'localhost', function () {
  debug('Express server listening on port ' + server.address().port);
});
