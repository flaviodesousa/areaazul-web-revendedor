var routesUtil = require('../routes/utils');
var passport = require('passport');

module.exports = function(app) {
    var login = app.controllers.login;
   
    app.get("/login", login.index);
    app.post('/logar', login.autenticar);
    app.get("/novaSenha", login.novaSenha);
    app.post("/verificaEmail", login.verificaEmail);
}