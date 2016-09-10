var AreaAzul = require('areaazul');
var UsuarioRevendedor = AreaAzul.db.model('UsuarioRevendedor');
var passport = require('passport');

module.exports = function () {
  return {
    index: function (req, res) {
      res.render('login/index');
    },
    novaSenha: function (req, res) {
      res.render('login/novaSenha');
    },

    sair: function (req, res) {
      req.logout();
      res.redirect('/');
    },

    verificaEmail: function (req, res) {
      var person = {
        email: req.body.email
      };
      Pessoa.verificaEmail(person,
        function () {
          req.flash('info', 'Foi enviado um email com a senha provisória!!!');
          res.render('login/novaSenha', {message: req.flash('info')});
        },
        function () {
          req.flash('info', 'Email não existe!!!');
          res.render('login/novaSenha', {message: req.flash('info')});
        });
    },
    autenticar: function (req, res) {
      passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
          req.flash('info', 'Erro ao logar!!!');
          res.render('login', {message: req.flash('info')});
          return;
        }
        req.logIn(user, function (err) {

          if (err) {
            return res.render('login', {
              error: 'true', value: req.session.passport.user
            });
          }
          res.redirect('ativacao/ativacaoRevenda');
        });
      })(req, res);
    }
  };
};
