module.exports = function() {
  const AreaAzul = require('areaazul');
  const log = AreaAzul.log;
  const UsuarioRevendedor = AreaAzul.db.model('UsuarioRevendedor');
  const UsuariosRevendedores = AreaAzul.db.collection('UsuariosRevendedores');

  return {
    index: function(req, res) {
      res.render('usuario_revendedor/cadastro', {
        values: req.body
      });
    },
    cadastrar: function(req, res) {
      var parametros = {
        cpf: req.body.cpf,
        login: req.body.nome_usuario_pf,
        email: req.body.email_pf,
        senha: req.body.senha_pf,
        confirmar_senha: req.body.confirmar_senha_pf,
        telefone: req.body.celular_pf,
        nome: req.body.nome_pf,
        autorizacao: 'funcionario',
        revendedor_id: req.session.passport.user,
        termo_servico: req.body.termo_servico
      };

      UsuarioRevendedor.inserir(parametros)
        .then(function() {
          req.body = [];
          req.flash('info', 'Salvo com sucesso!');
          res.render('usuario_revendedor/cadastro', {
            message: req.flash('info'),
            values: req.body
          });
        })
        .catch(AreaAzul.BusinessException, e => {
          for (var i = 0; i < e.details.length; i++) {
            req.flash('info', e.details[ i ].problem);
            res.render('usuario_revendedor/cadastro', {
              message: req.flash('info'),
              values: req.body
            });
          }
        })
        .catch(function(err) {
          log.err('Erro inserindo UsuarioRevendedor', err);
          req.flash('info', err);
          res.render('usuario_revendedor/cadastro', {
            message: req.flash('info'),
            values: req.body
          });
        });
    },
    listar: function(req, res) {
      UsuariosRevendedores
        .listarUsuarioRevenda(
          req.user.get('revendedor_id'))
        .then(function(listaDeUsusarios) {
          res.render('usuario_revendedor/lista', {
            lista: listaDeUsusarios.toJSON()
          });
        });
    },

    indexAlterar: function(req, res) {
      res.render('usuario_revendedor/alterar');
    },

    alterarProcura: function(req, res) {
      UsuarioRevendedor.procurar(req.params.id,
        function(result) {
          res.render('usuario_revendedor/alterar', {
            value: result.attributes
          });
          return result;
        });
    },


    alterarSalva: function(req, res) {
      var parametros = {
        cpf: req.body.cpf,
        login: req.body.nome_usuario_pf,
        email: req.body.email_pf,
        senha: req.body.senha_pf,
        confirmar_senha: req.body.confirmar_senha_pf,
        nome: req.body.nome_pf,
        telefone: req.body.telefone,
        autorizacao: req.body.autorizacao,
        revendedor_id: req.session.passport.user
      };
      UsuarioRevendedor.alterar(parametros)
        .then(function() {
          req.flash('info', 'Salvo com sucesso!');
          res.redirect('/usuario_revendedor/lista');
        })
        .catch(function(err) {
          if (err.details) {
            for (var i = 0; i < err.details.length; i++) {
              req.flash('info', err.details[ i ].problem);
              res.redirect('usuario_revendedor/alterar');
            }
          }
        });
    },

    deletar: function(req, res) {

      UsuarioRevendedor
        .desativar(req.params.id)
        .then(
          function(result) {
            res.redirect('/usuario_revendedor/lista');
            return result;
          })
        .catch(
          function(result) {

            res.redirect('/usuario_revendedor/lista');
            return result;
          });

    }

  };
};
