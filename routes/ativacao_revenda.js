module.exports = function(app){
	var ativacao = app.controllers.ativacao;
	var routesUtil = require('../routes/utils');

	app.get("/ativacao/ativacaoRevenda", ativacao.ativar);
	app.post("/ativacao/salvar_ativacao", ativacao.salvarAtivacao);
	app.get("/ativacao/cidades/:id", ativacao.listarCidades);
}