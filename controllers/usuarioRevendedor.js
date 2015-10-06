module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Usuario_Revendedor = AreaAzul.models.UsuarioRevendedor;
   /* var Ativacao = AreaAzul.models.Ativacao;
    var Veiculo = AreaAzul.models.Veiculo;*/



    var usuarioRevendedorController = {
        index: function(req, res) {
            res.render("usuario_revendedor/cadastro");
            console.log("INDEXX.");
        },

        cadastrar: function(req, res) {
        	console.log("DEUU.");
            var parametros = null;

            var parametros = {
                cpf: req.body.cpf,
                login: req.body.nome_usuario_pf,
                email: req.body.email_pf,
                senha: req.body.senha_pf,
                confirmar_senha: req.body.confirmar_senha_pf,
                nome: req.body.nome_pf,
                autorizacao: 'administrador',
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

                        /*var tamanho = err.details.length;

                        for (var i = 0; i < tamanho; i++)
                            */
                        req.flash('info', err.details[i].problem);
                        res.render("usuario_revendedor/cadastro", {
                        message: req.flash('info')
                        });
                    });
            } else {
                req.flash('info', 'Para realizar precisa aceitar nossos termos de serviço!');
                res.render("usuario_revendedor/cadastro", {
                    message: req.flash('info')
                });
            }
        },

        ativacao: function(req, res) {
            var usuario = {
                id_usuario: req.session.user_id
            };

            console.log("req.session.user_id" + req.session.user_id);

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
            console.log("req---" + req.body);
        },

    }
    return usuarioRevendedorController;
}