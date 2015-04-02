module.exports = function(app){
	var menuController = {
		index: function(req, res){
			res.render('menu/index');
		},
		menu_cadastro: function(req, res){
			res.render('menu/menu_cadastro');
		}
	}
	return menuController;
}