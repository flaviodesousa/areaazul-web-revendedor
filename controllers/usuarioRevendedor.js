module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Usuario_Revendedor = AreaAzul.models.UsuarioRevendedor;
    var UsuarioRevendedorCollection = AreaAzul.collections.UsuarioRevendedor;

    var usuarioRevendedorController = {
        index: function(req, res) {
            res.render("usuario_revendedor/cadastro");
        },

        cadastrar: function(req, res) {
            var parametros = null;

            var parametros = {
                cpf: req.body.cpf,
                login: req.body.nome_usuario_pf,
                email: req.body.email_pf,
                senha: req.body.senha_pf,
                confirmar_senha: req.body.confirmar_senha_pf,
                nome: req.body.nome_pf,
                autorizacao: 'funcionario',
            }
            if (req.body.termo_servico) {
                Usuario_Revendedor.cadastrar(
                    parametros)
                    .then(function(revenda) {
                        req.flash('info', 'Salvo com sucesso!');
                        res.render("usuario_revendedor/cadastro", {
                            message: req.flash('info')
                        });
                    })
                    .catch(function(err) {
                        if (err.details) {
                            for (var i = 0; i < err.details.length; i++) {
                                req.flash('info', err.details[i].problem);
                                res.render("usuario_revendedor/cadastro", {
                                    message: req.flash('info')
                                });
                            }
                        } else {
                            req.flash('info', err);
                            res.render("usuario_revendedor/cadastro", {
                                message: req.flash('info')
                            });
                        }
                    });
            } else {
                req.flash('info', 'Para realizar precisa aceitar nossos termos de serviço!');
                res.render("usuario_revendedor/cadastro", {
                    message: req.flash('info')
                });
            }
        }, 
        listar: function(req, res) {
            console.dir(req.session);
            UsuarioRevendedorCollection.listarUsuarioRevenda(req.session.passport.user,
                function(result) {
                res.render('usuario_revendedor/lista',{lista: result.models});
                return result;
            });
        },

        alterar: function(req, res) {
            console.log(req);
            Usuario_Revendedor.procurar(req.params.pessoa_fisica_pessoa_id
                ,
                function(result) {
                    res.render("usuario_revendedor/alterar", {
                        value: result.attributes

                    });
                    return result;
                })
        },

    }
    return usuarioRevendedorController;
}