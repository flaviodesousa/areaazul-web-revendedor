module.exports = function() {

  const AreaAzul = require('areaazul');
  const UsuarioRevendedor = AreaAzul.facade.UsuarioRevendedor;
  const RecuperacaoSenha = AreaAzul.facade.RecuperacaoSenha;

  return {
    index: function(req, res) {
      res.render('usuario/index');
    },
    alterarSenha: function(req, res) {
      var usuario = {
        id_usuario_revendedor: req.body.id_usuario_revendedor,
        login: req.body.login,
        senha: req.body.senha,
        nova_senha: req.body.nova_senha,
        conf_senha: req.body.conf_senha
      };

      var arr = UsuarioRevendedor.validarSenha(usuario);
      if (arr.length == 0) {
        UsuarioRevendedor.alterarSenha(usuario,
          function() {
            req.flash('info', 'Alterado com sucesso!!!');
            res.redirect('/');
          },
          function(result) {
            req.flash('info', 'Erro ao alterar!!!');
            res.render('usuario/home', {
              value: result.attributes,
              message: req.flash('info') });
          });
      } else {
        for (var i = 0; i < arr.length; i++) {
          req.flash('info', arr[ i ].problem);
        }
        res.render('usuario/home', {
          value: req.body,
          message: req.flash('info') });
      }
    },
    alterarSenhas: function(req, res) {

      var passwordRecovery = {
        id_recuperacao_senha: req.params.id_recuperacao_senha
      };

      RecuperacaoSenha.procurar(passwordRecovery,
        function(result) {
          req.flash('info', 'Encontrado!');
          res.render('usuario/alterarSenha', {
            value: result.attributes,
            message: req.flash('info') });

        }, function() {

          req.flash('info', 'Erro não encontrado!');
          res.render('usuario/alterarSenha', { message: req.flash('info') });
        });
    },
    recuperar_senha: function(req, res) {
      var usuario = {
        pessoa_id: req.params.id,
        nova_senha: req.body.nova_senha,
        conf_senha: req.body.conf_senha
      };

      var arr = UsuarioRevendedor.validarSenhaAlteracao(usuario);
      if (arr.length == 0) {
        UsuarioRevendedor.alterarSenhaRecuperacao(usuario,
          function() {
            req.flash('info', 'Alterado com sucesso!!!');
            res.render('usuario/alterarSenha', {
              value: usuario.pessoa_id,
              message: req.flash('info') });
          },
          function() {
            req.flash('info', 'Erro ao alterar!!!');
            res.render('usuario/alterarSenha', {
              value: usuario.pessoa_id,
              message: req.flash('info') });
          });
      } else {
        for (var i = 0; i < arr.length; i++) {
          req.flash('info', arr[ i ].problem);
        }
        res.render('usuario/alterarSenha', {
          value: usuario.pessoa_id,
          message: req.flash('info') });
      }
    }

  };
};
