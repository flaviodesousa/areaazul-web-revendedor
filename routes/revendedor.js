module.exports = function(app) {
    var revendedor = app.controllers.revendedor;
	var routesUtil = require('../routes/utils');

    app.get("/revendedor/cadastro", revendedor.index);
    app.post("/revendedor/cadastrar_revendedor", revendedor.cadastrar);
   /* app.get("/revendedor/pj", routesUtil.ensureAuthenticated, revendedor.pessoajuridica);
    app.post("/revendedor/cadastrar_revendedor", revendedor.inserir);
    app.get('/revendedor/ativacao_revendedor', revendedor.ativacao);
    app.post('/revendedor/ativar', routesUtil.ensureAuthenticated, revendedor.ativar);*/
}