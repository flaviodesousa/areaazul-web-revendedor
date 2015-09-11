module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Ativacao = AreaAzul.models.Ativacao;
    var EstadoCollection = AreaAzul.collections.Estados;
    var CidadeCollection = AreaAzul.collections.Cidades;

    var ativacaoController = {
        atualizarCidades: function() {
            CidadeCollection.listar(function(result) {
                res.render('ativacao/ativacao_revenda', {
                    lista: result.models
                });
                console.log("passei aq atualizarCidades:" + result);
                return result;
            });
        },
        ativar: function(req, res) {
            EstadoCollection.listar(function(result) {
                res.render('ativacao/ativacaoRevenda', {
                    lista: result.models
                });
                return result;
            });
        },
        listarCidades: function(req, res) {
            CidadeCollection.listar(
                req.params.id,
                function(result) {
                    res.send(result.toJSON());
                });
        },
        salvarAtivacao: function(req, res) {
            console.dir("session" + req.session.user_id);
            var dadosAtivacao = {
                celular: req.body.telefone,
                cidade: req.body.cidade,
                tempo: req.body.tempo,
                marca: req.body.marca,
                modelo: req.body.modelo,
                cor: req.body.cor,
                cpf: req.body.cpf,
                placa: req.body.placa,
                tipo_veiculo: req.body.tipo_veiculo,
                usuario_pessoa_id: req.session.user_id,
            }
            Ativacao.ativarPelaRevenda(dadosAtivacao)
                .then(function(revenda) {
                    req.flash('info', 'Veiculo com a placa' + req.body.placa +'foi ativado.');
                    EstadoCollection.listar(function(result) {
                        res.render("ativacao/ativacaoRevenda", {lista: result.models,
                            message: req.flash('info')
                        });
                    });
                    return revenda;
                })
                .catch(function(err) {
                    req.flash('info', err.problem);
                    EstadoCollection.listar(function(result) {
                        res.render("ativacao/ativacaoRevenda", {lista: result.models,
                            message: req.flash('info')
                        });
                    });
                    return err;
                });
        }
    }
    return ativacaoController;
}




