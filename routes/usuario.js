module.exports = function(app) {
    var usuario = app.controllers.usuario;
    var routesUtil = require('../routes/utils');

    app.post('/usuario/alteracao_senha/:id', routesUtil.ensureAuthenticated, usuario.alterarSenha);
}
