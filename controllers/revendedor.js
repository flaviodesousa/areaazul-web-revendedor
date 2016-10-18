module.exports = function() {
  const debug = require('debug')(
    'areaazul-web-revendedor:controllers:revendedor');
  var AreaAzul = require('areaazul');
  var Revendedor = AreaAzul.db.model('Revendedor');

  function cadastrarCommon(req, res, camposRevendedor) {
    Revendedor
      .cadastrar(camposRevendedor)
      .then(function() {
        req.body = [];
        req.flash('info', 'Salvo com sucesso!');
        res.render('login/index', { message: req.flash('info') });
      })
      .catch(function(err) {
        if (err.details) {
          for (var i = 0; i < err.details.length; i++) {
            req.flash('info', err.details[ i ].problem);
            res.render('revendedor/cadastro', {
              message: req.flash('info')
              , values: req.body
            });
          }
        } else {
          req.flash('info', err);
          res.render('revendedor/cadastro', {
            message: req.flash('info')
            , values: req.body
          });
        }
      });
  }

  return {
    index: function(req, res) {
      res.render('revendedor/cadastro', { values: req.body });
    },

    cadastrarPJ: function(req, res) {

      debug('Revendedor.cadastrarPJ() parametros', req.body);

      cadastrarCommon(req, res, {
        cnpj: req.body.cnpj,
        login: req.body.nome_usuario_pj,
        email: req.body.email_responsavel_pj,
        nova_senha: req.body.nova_senha_pj,
        conf_senha: req.body.conf_senha_pj,
        telefone: req.body.celular_pj,
        nome_fantasia: req.body.nome_fantasia_pj,
        razao_social: req.body.razao_social_pj,
        cpf: req.body.cpf_responsavel_pj,
        nome: req.body.responsavel_nome_pj,
        autorizacao: 'administrador',
        termo_servico: req.body.termo_servico
      });
    },

    cadastrarPF: function(req, res) {

      debug('Revendedor.cadastrarPF() parametros', req.body);

      cadastrarCommon(req, res, {
        cpf: req.body.cpf,
        login: req.body.nome_usuario_pf,
        email: req.body.email_pf,
        nova_senha: req.body.senha_pf,
        conf_senha: req.body.confirmar_senha_pf,
        telefone: req.body.celular_pf,
        nome: req.body.nome_pf,
        autorizacao: 'administrador',
        termo_servico: req.body.termo_servico
      });
    }
  };
};
