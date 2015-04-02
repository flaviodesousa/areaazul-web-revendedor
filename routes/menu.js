module.exports = function(app){
	var menu = app.controllers.menu;

	app.get("/", menu.index);
	app.get("/menu_cadastro", menu.menu_cadastro);
}