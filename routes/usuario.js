module.exports = function(app) {
    var usuario = app.controllers.usuario;
	var routesUtil = require('../routes/utils');

    app.post('/usuario/alteracao_senha/:pessoa_fisica_pessoa_id', routesUtil.ensureAuthenticated, usuario.alterarSenha);
}