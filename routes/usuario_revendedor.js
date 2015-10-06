module.exports = function(app) {
    var usuarioRevendedor = app.controllers.usuarioRevendedor;




	var routesUtil = require('../routes/utils');

    app.get("/usuario_revendedor/cadastro", usuarioRevendedor.index);
    app.post("/usuario_revendedor/cadastrar_usuario_revendedor", usuarioRevendedor.cadastrar);
}