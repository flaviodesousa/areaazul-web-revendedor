module.exports = function(app) {
  const ativacao = app.controllers.ativacao;
  const routesUtil = require('../routes/utils');

  app.get('/ativacao',
    routesUtil.ensureAuthenticated,
    ativacao.ativar);
  app.post('/ativacao/salvar_ativacao',
    routesUtil.ensureAuthenticated,
    ativacao.salvarAtivacao);
};
