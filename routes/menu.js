module.exports = function(app){
	var menu = app.controllers.menu;
	 var routesUtil = require('../routes/utils');

	app.get("/",  routesUtil.ensureAuthenticated, menu.index);
	app.get("/menu_cadastro",  routesUtil.ensureAuthenticated, menu.menu_cadastro);
}