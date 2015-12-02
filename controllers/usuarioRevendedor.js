module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Usuario_Revendedor = AreaAzul.models.UsuarioRevendedor;
    var UsuarioRevendedorCollection = AreaAzul.collections.UsuarioRevendedor;
    var i = null;

    var usuarioRevendedorController = {
        index: function(req, res) {
            res.render('usuario_revendedor/cadastro', {
                values: req.body
            });
        },
        cadastrar: function(req, res) {
            var parametros = null;

            var parametros = {
                cpf: req.body.cpf,
                login: req.body.nome_usuario_pf,
                email: req.body.email_pf,
                senha: req.body.senha_pf,
                confirmar_senha: req.body.confirmar_senha_pf,
                telefone: req.body.celular_pf,
                nome: req.body.nome_pf,
                autorizacao: 'funcionario',
                revendedor_id: req.session.passport.user,
                termo_servico: req.body.termo_servico,
            }

                Usuario_Revendedor.inserir(parametros)
                    .then(function(revenda) {
                        req.body = [];
                        req.flash('info', 'Salvo com sucesso!');
                        res.render("usuario_revendedor/cadastro", {
                            message: req.flash('info'),
                            values: req.body
                        });
                    })
                    .catch(function(err) {
                        if (err.details) {
                            for (var i = 0; i < err.details.length; i++) {
                                req.flash('info', err.details[i].problem);
                                res.render("usuario_revendedor/cadastro", {
                                    message: req.flash('info'),
                                    values: req.body
                                });
                            }
                        } else {
                            console.dir(err);
                            req.flash('info', err);
                            res.render("usuario_revendedor/cadastro", {
                                message: req.flash('info'),
                                values: req.body
                            });
                        }
                    });
        },
        listar: function(req, res) {
            UsuarioRevendedorCollection.listarUsuarioRevenda(req.session.passport.user,
                function(result) {
                    res.render('usuario_revendedor/lista', {
                        lista: result.models
                    });
                    ///    return result;
                });


        },

        indexAlterar: function(req, res) {
            res.render('usuario_revendedor/alterar');
        },

        alterarProcura: function(req, res) {
            var autoriz = null;
            Usuario_Revendedor.procurar(req.params.pessoa_fisica_pessoa_id,
                function(result) {

                    res.render('usuario_revendedor/alterar', {
                        value: result.attributes
                    });
                    return result;
                })
        },


        alterarSalva: function(req, res) {
            var parametros = null;
            var autorizacao = null;
                console.dir(req.body);
                console.log("--------------------------------------");
            var parametros = {
                cpf: req.body.cpf,
                login: req.body.nome_usuario_pf,
                email: req.body.email_pf,
                senha: req.body.senha_pf,
                confirmar_senha: req.body.confirmar_senha_pf,
                nome: req.body.nome_pf,
                telefone: req.body.telefone,
                autorizacao: req.body.autorizacao,
                revendedor_id: req.session.passport.user,
            }
            Usuario_Revendedor.alterar(parametros)
                .then(
                    function(result) {
                        req.flash('info', 'Salvo com sucesso!');
                        res.redirect("/usuario_revendedor/lista");
                        message: req.flash('info')
                    })
                .catch(function(err) {
                    if (err.details) {
                        for (var i = 0; i < err.details.length; i++) {
                            req.flash('info', err.details[i].problem);
                            res.redirect('usuario_revendedor/alterar');
                        }
                    }
                });
        },

        deletar: function(req, res) {

            Usuario_Revendedor.desativar(req.params.pessoa_fisica_pessoa_id)
                .then(
                    function(result) {
                        res.redirect("/usuario_revendedor/lista");
                        return result;
                    }).catch(
                    function(result) {

                        res.redirect("/usuario_revendedor/lista");
                        return result;
                    })

        },

    }
    return usuarioRevendedorController;
}