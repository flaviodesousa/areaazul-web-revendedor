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

        ativacao: function(req, res) {
            var usuario = {
                id_usuario: req.session.user_id
            };

            Revendedor.mostrarSaldo(usuario,
                function(result) {
                    var saldo = result.attributes.saldo;
                    console.log("saldo" + saldo);
                    if (saldo > 10) {
                        req.flash('info', 'Saldo insuficente!');
                        res.render("revendedor/ativacao_revendedor", {
                            value: result.attributes
                        }, {
                            message: req.flash('info')
                        });
                    } else {
                        res.render("revendedor/ativacao_revendedor", {
                            value: result.attributes
                        });
                    }
                }, function(result) {
                    res.render("revendedor/ativacao_revendedor");
                });
        },
        ativar: function(req, res) {
            var vehicle = {
                placa: req.body.placa + req.body.number_placa,
                usuario_id: req.session.user_id
            };


            Veiculo.procurarVeiculoPorPlaca(vehicle,
                function(result) {
                    console.log("model" + result.id);
                    var ativacao = {
                        tipoVeiculo: req.body.tipoVeiculo,
                        credito: req.body.credito,
                        usuario_id: req.session.user_id,
                        veiculo_id: result.id
                    };

                    Ativacao.ativarPelaRevenda(ativacao,
                        function(results) {
                            res.render("revendedor/ativacao_revendedor");
                        }, function(results) {
                            res.render("revendedor/ativacao_revendedor");
                        });
                }, function(result) {
                    Veiculo.cadastrar(vehicle,
                        function(results) {
                            var ativacao = {
                                tipoVeiculo: req.body.tipoVeiculo,
                                credito: req.body.credito,
                                usuario_id: req.session.user_id,
                                veiculo_id: results.id
                            };
                            Ativacao.ativarPelaRevenda(ativacao,
                                function(results) {
                                    res.render("revendedor/ativacao_revendedor");
                                }, function(results) {
                                    res.render("revendedor/ativacao_revendedor");
                                });

                        }, function(results) {
                            console.log("err" + results);
                        });
                });
        },

    }
    return usuarioRevendedorController;
}