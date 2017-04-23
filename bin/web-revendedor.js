#!/usr/bin/env node

const debug = require('debug')('areaazul');
const app = require('../app');

app.set('port', process.env.AREAAZUL_WEB_REVENDEDOR_PORT || 18360);
app.set('host', process.env.AREAAZUL_WEB_REVENDEDOR_HOST || 'localhost');

const server = app.listen(app.get('port'), app.get('host'), function() {
  debug('Express server listening on port ' + server.address().port);
});
