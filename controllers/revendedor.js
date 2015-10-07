module.exports = function(app) {
     var AreaAzul = require('areaazul');
     var Revendedor = AreaAzul.models.Revendedor;
     var Ativacao = AreaAzul.models.Ativacao;
     var Veiculo = AreaAzul.models.Veiculo;

    
    var revendedorController = {
        index: function(req, res) {
            res.render("revendedor/cadastro");
        },

        pessoafisica: function(req, res) {
            res.render("revendedor/indexpf");
        },

        pessoajuridica: function(req, res) {
            res.render("revendedor/indexpj");
        },
        cadastrar: function(req, res) {
            var parametros = null;
            if(req.body.hiddenFormPJ === '1'){
                var parametros = {
                    cnpj : req.body.cnpj,
                    login: req.body.nome_usuario_pj,
                    email: req.body.email_responsavel_pj,
                    senha: req.body.senha_pj,
                    confirmar_senha: req.body.confirmar_senha_pj,
                    celular: req.body.celular_pj,
                    nome_fantasia : req.body.nome_fantasia_pj,
                    razao_social : req.body.razao_social_pj,
                    telefone: req.body.telefone_pj,
                    cpf: req.body.cpf_responsavel_pj,
                    nome: req.body.responsavel_nome_pj,
                    autorizacao: 'administrador',
                }
            }else{
                var parametros = {
                    cpf: req.body.cpf,
                    login: req.body.nome_usuario_pf,
                    email: req.body.email_pf,
                    senha: req.body.senha_pf,
                    confirmar_senha: req.body.confirmar_senha_pf,
                    telefone: req.body.celular_pf,
                    nome: req.body.nome_pf,
                    autorizacao: 'administrador',
                }
            }

         if(req.body.termo_servico){
             Revendedor.cadastrar(
                parametros)
              .then(function(revenda) {
                console.dir(revenda);
                req.flash('info', 'Salvo com sucesso!');
                res.redirect("revendedor/cadastro");

              })
              .catch(function(err) {
            if(err.details){
                console.dir(err.details);
                    for(var i = 0;i<err.details.length;i++){
                        req.flash('info', err.details[i].problem);
                        res.render("revendedor/cadastro", {message: req.flash('info')});
                    }
               }else{
                req.flash('info', err);
                res.render("revendedor/cadastro", {message: req.flash('info')});
               }
              });
      }else{
            req.flash('info', 'Para realizar precisa aceitar nossos termos de serviço!');
            res.render("revendedor/cadastro", {message: req.flash('info')});
      }
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

                    });
                });

        },

    }
    return revendedorController;
}