module.exports = function(app) {
  var usuario = app.controllers.usuario;
  var usuarioRevendedor = app.controllers.usuarioRevendedor;
  var routesUtil = require('../routes/utils');


  app.get("/usuario/cadastro",routesUtil.ensureAuthenticated, usuarioRevendedor.index);
  app.post("/usuario/cadastrar_usuario",routesUtil.ensureAuthenticated, usuarioRevendedor.cadastrar);

  app.get("/usuario/lista",routesUtil.ensureAuthenticated, usuarioRevendedor.listar);

  app.get("/usuario/:id/alterar",routesUtil.ensureAuthenticated, usuarioRevendedor.alterarProcura);
  app.post("/usuario/alterar/salvar",routesUtil.ensureAuthenticated, usuarioRevendedor.alterarSalva);
  app.post("/usuario/alterar",routesUtil.ensureAuthenticated, usuarioRevendedor.indexAlterar);
  app.post('/usuario/:id/senha', routesUtil.ensureAuthenticated, usuario.alterarSenha);

  app.get("/usuario/deletar/:id",routesUtil.ensureAuthenticated, usuarioRevendedor.deletar);
};
