module.exports = function(app) {
    var usuarioRevendedor = app.controllers.usuarioRevendedor;
	var routesUtil = require('../routes/utils');


    app.get("/usuario_revendedor/cadastro", usuarioRevendedor.index);
    app.post("/usuario_revendedor/cadastrar_usuario_revendedor", usuarioRevendedor.cadastrar);
    
    app.get("/usuario_revendedor/lista", usuarioRevendedor.listar);

    app.get("/usuario_revendedor/alterar/:pessoa_fisica_pessoa_id", usuarioRevendedor.alterar);

    app.get("/usuario_revendedor/deletar/:pessoa_fisica_pessoa_id",usuarioRevendedor.deletar);
}