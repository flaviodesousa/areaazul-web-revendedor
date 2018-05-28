'use strict';

const AreaAzul = require('@areaazul/api');
const UsuarioRevendedor = AreaAzul.facade.UsuarioRevendedor;
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser(function(userJSON, done) {
    const user = JSON.parse(userJSON);
    UsuarioRevendedor
      .buscarPorId(user.id)
      .then(function(usuarioRevendedor) {
        done(null, usuarioRevendedor);
      })
      .catch(AreaAzul.BusinessException, err => {
        AreaAzul.log.warn('Usuário da sessão não recuperável. Encerrando.', { err: err });
        done(null, false);
      })
      .catch(function(err) {
        done(err, null);
      });
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'senha',
      session: true
    },
    function(username, password, done) {
      UsuarioRevendedor
        .autentico(username, password)
        .catch(AreaAzul.AuthenticationError, () => {
          return done(null, false);
        })
        .then(function(user) {
          return done(null, user);
        })
        .catch(function(err) {
          return done(err);
        });
    }
  ));
};
