#!/usr/bin/env node

const debug = require('debug')('areaazul');
const app = require('../app');

app.set('port', process.env.AREAAZUL_WEB_REVENDEDOR || 18360);

const server = app.listen(app.get('port'), 'localhost', function() {
  debug('Express server listening on port ' + server.address().port);
});
