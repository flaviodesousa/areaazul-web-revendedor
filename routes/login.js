module.exports = function(app) {
  const passport = require('passport');
  const AreaAzul = require('@areaazul/api');
  const Pessoa = AreaAzul.facade.Pessoa;

  const usuario = app.controllers.usuario;


  app.get('/', function(req, res) {
    res.render('login/index', {
      messages: {
        info: req.flash('info'),
        danger: req.flash('danger'),
        warning: req.flash('warning'),
        success: req.flash('success')
      }
    });
  });


  app.post('/', function(req, res) {
    function report(req, res, err, user) {
      AreaAzul.log.warn('Acesso negado', { error: err, user: user });
      req.flash('warning', 'Acesso negado! Senha ou usuário inválidos.');
      res.redirect('/');
    }

    passport.authenticate('local', function(err, user) {
      if (err || !user) {
        report(req, res, err, user);
        return;
      }
      req.logIn(user, function(err) {
        if (err) {
          report(req, res, err, user);
          return;
        }
        res.redirect('ativacao');
      });
    })(req, res);
  });


  app.get('/novaSenha', function(req, res) {
    res.render('login/novaSenha');
  });


  app.post('/verificaEmail', function(req, res) {
    Pessoa.verificaEmail({
        email: req.body.email
      },
      function() {
        req.flash('info', 'Foi enviado um email com a senha provisória!!!');
        res.render('login/novaSenha', { message: req.flash('info') });
      },
      function() {
        req.flash('warning', 'Email não existe!!!');
        res.render('login/novaSenha', { message: req.flash('info') });
      });
  });
  app.get('/usuario/alteracao_senha/:id_recuperacao_senha', usuario.alterarSenhas);
  app.post('/usuario/recuperacao_senha/:id', usuario.recuperar_senha);


  app.get('/logout', function(req, res) {
    req.flash('success', `Sessão com usuário ${req.user.login} encerrada com sucesso.`);
    req.logout();
    res.redirect('/');
  });
};
