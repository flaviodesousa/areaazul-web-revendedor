module.exports = function(app) {
     var AreaAzul = require('areaazul'),
        Revendedor = AreaAzul.models.revendedor;
        Ativacao = AreaAzul.models.ativacao;
        Veiculo = AreaAzul.models.veiculo;
    
    var revendedorController = {
        index: function(req, res) {
            res.render("revendedor/index");
        },

        pessoafisica: function(req, res) {
            res.render("revendedor/indexpf");
        },

        pessoajuridica: function(req, res) {
            res.render("revendedor/indexpj");
        },
        inserir: function(req, res) {
            Revendedor.cadastrar({
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    cpf: req.body.cpf,
                    cnpj : req.body.cnpj,
                   // nome_fantasia : req.body.nome,
                    razao_social : req.body.razao_social,
                    contato : req.body.contato
                },
                function(result) {
                    console.log(result);
                    req.flash('info', 'Salvo com sucesso!');
                    res.render('revendedor', {message: req.flash('info')});
                },
                function(result) {
                    req.flash('info', 'Erro ao salvar!');
                    res.render('revendedor', {message: req.flash('info')});
                })

          },
        ativacao: function(req, res) {
            var usuario = {
                id_usuario: req.session.user_id
            };

            console.log("req.session.user_id"+req.session.user_id);
           
            Revendedor.mostrarSaldo(usuario, 
            function(result){
                var saldo = result.attributes.saldo;
                console.log("saldo"+saldo);
                if(saldo > 10){
                    req.flash('info', 'Saldo insuficente!');
                    res.render("revendedor/ativacao_revendedor", {value:result.attributes}, {message: req.flash('info')});
                }else{
                    res.render("revendedor/ativacao_revendedor", {value:result.attributes});
                }
            }, function(result){
                res.render("revendedor/ativacao_revendedor");
            });
        },
        ativar: function(req, res) {
            var vehicle = {
                placa: req.body.placa+req.body.number_placa,
                usuario_id: req.session.user_id
            };


            Veiculo.procurarVeiculoPorPlaca(vehicle,
                function(result){
                    console.log("model"+result.id);
                    var ativacao = {
                        tipoVeiculo: req.body.tipoVeiculo,
                        credito: req.body.credito,
                        usuario_id: req.session.user_id,
                        veiculo_id: result.id
                    };

                    Ativacao.ativarPelaRevenda(ativacao, 
                        function(results){
                            res.render("revendedor/ativacao_revendedor"); 
                    }, function(results){
                            res.render("revendedor/ativacao_revendedor");
                    });
                }, function(result){
                    Veiculo.cadastrar(vehicle, 
                        function(results){
                            var ativacao = {
                                tipoVeiculo: req.body.tipoVeiculo,
                                credito: req.body.credito,
                                usuario_id: req.session.user_id,
                                veiculo_id: results.id
                            };
                            Ativacao.ativarPelaRevenda(ativacao, 
                                function(results){
                                    res.render("revendedor/ativacao_revendedor");
                                }, function(results){
                                    res.render("revendedor/ativacao_revendedor");
                                });

                    }, function(results){
                            console.log("err"+results);
                    });
                });
            console.log("req---" + req.body);
        },

    }
    return revendedorController;
}