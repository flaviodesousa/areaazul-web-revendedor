module.exports = function (app) {
  const login = app.controllers.login;
  const usuario = app.controllers.usuario;

  app.get('/', login.index);
  app.post('/logar', login.autenticar);
  app.get('/novaSenha', login.novaSenha);
  app.post('/verificaEmail', login.verificaEmail);
  app.get('/usuario/alteracao_senha/:id_recuperacao_senha', usuario.alterarSenhas);
  app.post('/usuario/recuperacao_senha/:id', usuario.recuperar_senha);
  app.get('/logout', login.sair);
};
