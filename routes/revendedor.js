module.exports = function(app) {
    var revendedor = app.controllers.revendedor;
	var routesUtil = require('../routes/utils');

    app.get("/revendedor", routesUtil.ensureAuthenticated, revendedor.index);
    app.get("/revendedor/pf", routesUtil.ensureAuthenticated, revendedor.pessoafisica);
    app.get("/revendedor/pj", routesUtil.ensureAuthenticated, revendedor.pessoajuridica);
    app.post("/revendedor/cadastrar_revendedor", routesUtil.ensureAuthenticated, revendedor.inserir);
    app.get('/revendedor/ativacao_revendedor', routesUtil.ensureAuthenticated, revendedor.ativacao);
    app.post('/revendedor/ativar', routesUtil.ensureAuthenticated, revendedor.ativar);
}