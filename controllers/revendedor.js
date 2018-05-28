module.exports = function() {
  const debug = require('debug')(
    'areaazul-web-revendedor:controllers:revendedor');
  const AreaazulUtils = require('@areaazul/utils');
  const AreaAzul = require('@areaazul/api');
  const Revendedor = AreaAzul.facade.Revendedor;

  function cadastrarCommon(req, res, camposRevendedor) {
    Revendedor
      .cadastrar(camposRevendedor)
      .then(function() {
        req.body = [];
        req.flash('info', 'Salvo com sucesso!');
        res.render('login/index', { message: req.flash('info') });
      })
      .catch(function(err) {
        req.flash('warning', 'Dados inválidos');
        if (err.details) {
          err.details.forEach(p => req.flash('warning', p.problem));
        }
        res.render('revendedor/cadastro',
          {
            values: req.body,
            messages: {
              info: req.flash('info'),
              danger: req.flash('danger'),
              warning: req.flash('warning'),
              success: req.flash('success')
            }
          });
      });
  }

  return {
    index: function(req, res) {
      res.render('revendedor/cadastro',
        {
          values: req.body,
          messages: {
            info: req.flash('info'),
            danger: req.flash('danger'),
            warning: req.flash('warning'),
            success: req.flash('success')
          }
        });
    },

    cadastrarPJ: function(req, res) {

      debug('Revendedor.cadastrarPJ() parametros', AreaazulUtils.semSenhas(req.body));

      cadastrarCommon(req, res, {
        cnpj: req.body.cnpj,
        login: req.body.nome_usuario_pj,
        email: req.body.email_responsavel_pj,
        nova_senha: req.body.nova_senha_pj,
        conf_senha: req.body.conf_senha_pj,
        telefone: req.body.celular_pj,
        nome_fantasia: req.body.nome_fantasia_pj,
        razao_social: req.body.razao_social_pj,
        contato: req.body.contato,
        cpf: req.body.cpf_responsavel_pj,
        nome: req.body.responsavel_nome_pj,
        autorizacao: 'administrador',
        termo_servico: req.body.termo_servico
      });
    },

    cadastrarPF: function(req, res) {

      debug('Revendedor.cadastrarPF() parametros', AreaazulUtils.semSenhas(req.body));

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
