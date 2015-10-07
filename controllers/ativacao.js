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
            var valor = 0;
            
            if(req.body.tempo !== null){
                var tamanhoArray = Configuracao.getConfiguracaoTempo().length;
                var configuracoes = Configuracao.getConfiguracaoTempo();
                for(var i = 0; i < tamanhoArray; i++){
                    if(req.body.tempo === configuracoes[i].quantidade_tempo){
                        valor = configuracoes[i].preco;
                    }
                }
            }
            console.dir(req.body);
            var dadosAtivacao = {
                valor: valor,
                celular: req.body.telefone,
                cidade: req.body.cidade,
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
                    req.flash('info', 'Veiculo com a placa '+req.body.placa+'foi ativado');
                    res.redirect("/ativacao/ativacaoRevenda");
                    return revenda;
                })
                .catch(function(err) {
                    req.flash('info', "Erro! " + err);
                    res.redirect("/ativacao/ativacaoRevenda");
                    return err;
                });
        }
    };
    return ativacaoController;
};
