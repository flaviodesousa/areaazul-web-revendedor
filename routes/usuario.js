module.exports = function(app) {
    var usuario = app.controllers.usuario;
	var routesUtil = require('../routes/utils');

    app.post('/usuario/alteracao_senha/:id_usuario_revendedor', routesUtil.ensureAuthenticated, usuario.alterarSenha);
}