module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Ativacao = AreaAzul.models.Ativacao;
    var EstadoCollection = AreaAzul.collections.Estados;
    var CidadeCollection = AreaAzul.collections.Cidades;
    var Configuracao = AreaAzul.models.Configuracao;

    var ativacaoController = {
        atualizarCidades: function() {
            CidadeCollection.listar(function(result) {
                res.render('ativacao/ativacao_revenda', {
                    lista: result.models
                });
                return result;
            });
        },
        listarEstados: function(req, res) {
            EstadoCollection.listar(
                function(result) {
                    res.send(result.toJSON());
                });
        },
        ativar: function(req, res) {

            var link = null;
            if (req.user.attributes.autorizacao === 'administrador') {
                link = 'ativacao/ativacaoRevendedor';
            } else {
                link = 'ativacao/ativacaoUsuarioRevendedor';
            }
            EstadoCollection.listar(function(result) {
                console.log("TROUXE ESTADOS E DEU RENDER");
                res.render(link, {
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
            var valor = 0;
            var link = null;
            var listaVazia = [];
            if (req.user.attributes.autorizacao === 'administrador') {
                link = "ativacao/ativacaoRevendedor";
            } else {
                link = "ativacao/ativacaoUsuarioRevendedor";
            }

            if (req.body.tempo !== null) {
                var tamanhoArray = Configuracao.getConfiguracaoTempo().length;
                var configuracoes = Configuracao.getConfiguracaoTempo();
                for (var i = 0; i < tamanhoArray; i++) {
                    if (req.body.tempo === configuracoes[i].quantidade_tempo) {
                        valor = configuracoes[i].preco;
                    }
                }
            }

            var dadosAtivacao = {
                valor: valor,
                celular: req.body.celular,
                cidade: req.body.cod_cidades,
                tempo: req.body.tempo,
                marca: req.body.marca,
                modelo: req.body.modelo,
                cor: req.body.cor,
                placa: req.body.placa,
                tipo_veiculo: req.body.tipo_veiculo,
                usuario_pessoa_id: req.session.passport.user,
            };

            Ativacao.ativarPelaRevenda(dadosAtivacao)
                .then(function(revenda) {
                    if (revenda != null) {
                        req.flash('info', 'Veiculo com a placa ' + req.body.placa + ' ativado.');
                        res.render(link, {
                            message: req.flash('info'),
                            lista: listaVazia
                        });
                    } else {
                        req.flash('info', 'Veiculo ' + req.body.placa + ' ativo.');
                        res.render(link, {
                            message: req.flash('info'),
                            lista: listaVazia
                        });
                    }

                    return revenda;
                })
                .catch(function(err) {
                    console.log("ERRO NO CONTROLLER -------------------------");
                    console.dir(err);
                    if (err.details) {
                        for (var i = 0; i < err.details.length; i++) {
                            req.flash('info', err.details[i].problem);
                            res.render('ativacao/ativacaoRevenda', {
                                message: req.flash('info'),
                                lista: listaVazia
                            });
                        }
                    } else {
                        req.flash('info', err);
                        res.render('ativacao/ativacaoRevenda', {
                            message: req.flash('info'),
                            lista: listaVazia
                        });
                    }
                    return err;
                });
        }
    };
    return ativacaoController;
};