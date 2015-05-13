var bcrypt = require('bcrypt');
var passport = require('passport');
var areaazul = require('areaazul');
var Pessoa = areaazul.models.pessoa;


module.exports = function(app) {
    var loginController = {
        index: function(req, res) {
            res.render('login/index');
        },
        home: function(req, res){
            res.render('login/home', {value:user.attributes});
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
        autenticar: function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
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
                      return res.render('usuario/home', {value:user});
                      } 
                      return res.redirect('/');
                });
            })(req, res, next);
        }
    } ;
    return loginController;
};