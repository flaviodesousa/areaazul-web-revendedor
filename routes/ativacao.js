module.exports = function(app){
	var ativacao = app.controllers.ativacao;

	app.get("/ativacao/ativacao_revenda", ativacao.ativar);
	app.post("/ativacao/salvar_ativacao", ativacao.salvarAtivacao);
}