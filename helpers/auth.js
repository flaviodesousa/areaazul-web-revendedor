var bcrypt = require('bcrypt'),
    LocalStrategy = require('passport-local').Strategy,
    AreaAzul = require('areaazul'),
    Usuario_Revendedor = AreaAzul.models.usuario_revendedor;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log(user)
        done(null, user.id_usuario_revendedor);
    });

    passport.deserializeUser(function(user_id, done) {
       var user = Usuario_Revendedor.search(new Usuario_Revendedor.Usuario_Revendedor({
                'id_usuario_revendedor': user_id,
            }), function(user, error) {
            if(user != null){
                return done(null, user);
            }
             return done(error);
        });
    });

    passport.use(new LocalStrategy({
            usernameField: 'login',
            passwordField: 'senha'
        }, function(username, password, done) {
            var user = Usuario_Revendedor.search(new Usuario_Revendedor.Usuario_Revendedor({
                'login': username,
            }), function(retorno) {
                if (retorno != null) {
                    var pwd = retorno['senha'];
                    var acesso = retorno['primeiro_acesso'];
                    var hash = Usuario_Revendedor.compareSenha(password, pwd);
                    if (hash != false) {
                        if(acesso == true){
                            return done(null, retorno);
                        }
                        return done(null, retorno);
                    }else{
                       return done(null, false, {
                            'message': 'Usuario não encontrado!'
                        }); 
                    }
                }else{
                    return done(null, false, {
                    'message': 'Senha invalida!'
                    });
                }
            })
        },
        function(error) {
            return done(null, false, {
                'message': 'Usuario revendedor desconhecido!'
            });
        }));
}