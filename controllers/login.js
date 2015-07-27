//var bcrypt = require('bcrypt');
//var passport = require('passport');
var AreaAzul = require('areaazul');
//var Pessoa = areaazul.models.pessoa;
var UsuarioRevendedor = AreaAzul.models.UsuarioRevendedor;

module.exports = function(app) {
    var loginController = {
        index: function(req, res) {
            res.render('login/index');
        },
        home: function(req, res){
            res.render('login/home');
        },
        novaSenha: function(req, res){
            res.render('login/novaSenha');
        }, 
        verificaEmail: function(req, res){
            var person = {
                email : req.body.email,
            }
            console.log("req.body.email" + req.body.email);
            Pessoa.verificaEmail(person, 
                function(result){
                    req.flash('info', 'Foi enviado um email com a senha provisória!!!');
                    res.render('login/novaSenha', {message: req.flash('info')});
                }, 
                function(result){
                    req.flash('info', 'Email não existe!!!');
                    res.render('login/novaSenha',{message: req.flash('info')});
                });
        }, 
        autenticar: function(req, res) {

            console.log("req"+req.body.senha);
            console.log("req"+req.body.login);

            UsuarioRevendedor.autorizado(
                req.body.login,
                req.body.senha)
            .then(function(usuarioRevendedor){
                console.log("revenda -- "+usuarioRevendedor);
                res.render('login/home');
            })
            .catch(function(err){
                console.log("Err: "+err.message);
                req.flash('info', err.message);
                res.render('login', {message: req.flash('info')});
            });
        },


        /*  passport.authenticate('local', function(err, user, info) {
               if (err || !user) {
                    req.flash('info', 'Erro ao logar!!!');
                    res.render('login', {message: req.flash('info')});
                }
                req.logIn(user, function(err) {
                    if (err) {
                    return res.render('login', {
                            error: 'true'
                        });
                    }
                    if(user.primeiro_acesso === true){
                        console.log("req 1: "+user.pessoa_fisica_pessoa_id);
                        req.session.user_id = user.pessoa_fisica_pessoa_id;
                        return res.render('usuario/home', {value:user});
                      } 
                        console.log("req 2: "+user.pessoa_fisica_pessoa_id);
                        req.session.user_id = user.pessoa_fisica_pessoa_id;
                      return res.redirect('/');
                });
                console.log("err"+err);
            })(req, res, next);
        }*/
    };
    return loginController;
};