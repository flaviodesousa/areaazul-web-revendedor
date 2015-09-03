module.exports = function(app){
	var ativacaoController = {
		ativar: function(req, res){
			res.render('ativacao/ativacao_revenda');
		},
	}
	return ativacaoController;
}