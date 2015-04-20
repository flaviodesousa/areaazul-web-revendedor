var bcrypt = require('bcrypt');
var passport = require('passport');
var areaazul = require('areaazul');

module.exports = function(app) {
    var loginController = {
        index: function(req, res) {
            res.render('login/index');
        },
        home: function(req, res){
            res.render('login/home', {value:user.attributes});
        },
        autenticar: function(req, res, next) {
            // console.log("Cheguei até aqui!");
          passport.authenticate('local', function(err, user, info) {
                //console.log('Req session:'+req.session);
               if (err || !user) {
                  //  console.log("Login1");
                  //  console.log("Err"+err);
                   // console.log("Err"+user);
                   return res.render('login', {
                        error: 'true'
                    });
                }
                req.logIn(user, function(err) {
                    if (err) {
                    //    console.log("Login2");
                       // console.log(err);
                    return res.render('login', {
                            error: 'true'
                        });
                    }
                    if(user.primeiro_acesso == true){
          
                       // console.log("user.id_usuario: "+user.id_usuario);
                       // req.session.user_id = user.id_usuario;
                      //  console.log("req.session.user_id: "+req.session.user_id);
                   // console.log("user"+user);
                      return res.render('usuario/home', {value:user});
                      } 
                      //  console.log("user.id_usuario: "+user.id_usuario);
                       // req.session.user_id = user.id_usuario;
                       // console.log("req.session.user_id: "+req.session.user_id);
                        return res.redirect('/');
                });
            })(req, res, next);
        }
    } 
    return loginController;
}