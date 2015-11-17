module.exports = function(app) {
    var ativacao = app.controllers.ativacao;
    var routesUtil = require('../routes/utils');

    app.get("/ativacao/ativacaoRevenda", routesUtil.ensureAuthenticated, ativacao.ativar);
    app.post("/ativacao/salvar_ativacao", routesUtil.ensureAuthenticated, ativacao.salvarAtivacao);
    app.get("/ativacao/cidades/:id", routesUtil.ensureAuthenticated, ativacao.listarCidades);
    app.get("/ativacao/estados", routesUtil.ensureAuthenticated, ativacao.listarEstados);
}