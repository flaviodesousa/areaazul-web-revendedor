module.exports = function(app){
	var veiculo = app.controllers.veiculo;
	var routesUtil = require('../routes/utils');

	app.get("/veiculo", routesUtil.ensureAuthenticated, veiculo.procurarVeiculo);
}