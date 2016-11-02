'use strict';

var AreaAzul = require('areaazul');
var UsuarioRevendedor = AreaAzul.facade.UsuarioRevendedor;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UsuarioRevendedor
      .buscarPorId(id)
      .then(function(usuarioRevendedor) {
        done(null, usuarioRevendedor);
      })
      .catch(function(err) {
        done(err, null);
      });
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'senha',
      passReqToCallback: true,
      session: true
    },
    function(req, username, password, done) {
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
