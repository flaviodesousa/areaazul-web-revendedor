module.exports = function(app) {
    var usuarioRevendedor = app.controllers.usuarioRevendedor;
    var routesUtil = require('../routes/utils');


    app.get("/usuario_revendedor/cadastro",routesUtil.ensureAuthenticated, usuarioRevendedor.index);
    app.post("/usuario_revendedor/cadastrar_usuario_revendedor",routesUtil.ensureAuthenticated, usuarioRevendedor.cadastrar);

    app.get("/usuario_revendedor/lista",routesUtil.ensureAuthenticated, usuarioRevendedor.listar);

    app.get("/usuario_revendedor/alterar/:pessoa_fisica_pessoa_id",routesUtil.ensureAuthenticated, usuarioRevendedor.alterarProcura);
    app.post("/usuario_revendedor/alterar/salvar",routesUtil.ensureAuthenticated, usuarioRevendedor.alterarSalva);
    app.post("/usuario_revendedor/alterar",routesUtil.ensureAuthenticated, usuarioRevendedor.indexAlterar);

    app.get("/usuario_revendedor/deletar/:pessoa_fisica_pessoa_id",routesUtil.ensureAuthenticated, usuarioRevendedor.deletar);
}