'use strict';

var AreaAzul = require('areaazul');
var UsuarioRevendedor = AreaAzul.models.UsuarioRevendedor;
var BusinessException = AreaAzul.BusinessException;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
   UsuarioRevendedor
      .buscarPorId(id)
      .then(function(ua) {
        done(null, ua);
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
      session: true,
    },
    function(req, username, password, done) {
      UsuarioRevendedor
        .autorizado(username, password)
        .then(function(user) {
          if (!user) { return done(null, false); }
          return done(null, user);
        })
        .catch(function(err) {
          if (err instanceof BusinessException) {
            return done(null, false);
          }
          return done(err);
        });
    }
  ));
};
