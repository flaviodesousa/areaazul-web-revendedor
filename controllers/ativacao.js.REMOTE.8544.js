module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Ativacao = AreaAzul.models.Ativacao;
    var EstadoCollection = AreaAzul.collections.Estados;
    var CidadeCollection = AreaAzul.collections.Cidades;

    var ativacaoController = {
        atualizarCidades: function(){
            CidadeCollection.listar(function(result) {
                res.render('ativacao/ativacao_revenda', {lista: result.models});
                console.log(result);
                return result;
            });
        },
        ativar: function(req, res) {
            EstadoCollection.listar(function(result) {
                res.render('ativacao/ativacao_revenda', {lista: result.models});
                console.log(result);
                return result;
            });
        },
        listarCidades: function(req, res) {
            CidadesCollection.listar({
                    estado_id: req.params.id_estado
                },
                function(result) {
                    res.render('ativacao/ativacao_revenda', {
                        lista: result.models
                    });
                    return result;
                });
        },
        salvarAtivacao: function(req, res) {
            console.dir("Usuario da sessão: " + req.session.pessoa_fisica_pessoa_id);
            var dadosAtivacao = {
                celular: req.body.telefone,
                cidade: req.body.cidade,
                tempo: req.body.tempo,
                marca: req.body.marca,
                modelo: req.body.modelo,
                cor: req.body.cor,
                cpf: req.body.cpf,
                placa: req.body.placa,
                tipo_veiculo: req.body.tipo_veiculo
            }


            Ativacao.ativarPelaRevenda(dadosAtivacao)
                .then(function(revenda) {
                    console.log("revenda" + revenda);
                    //  res.render("revendedor/cadastro", {message: req.flash('info')});
                    req.flash('info', 'Salvo com sucesso!');
                    res.render("revendedor/cadastro", {message: req.flash('info')});
                })
                .catch(function(err) {
                    req.flash('info', err);
                    EstadoCollection.listar(function(result) {
                        res.render("ativacao/ativacao_revenda", {message: req.flash('info')});
                        console.log(result);
                        return result;
                    });

                });
        }
    }
    return ativacaoController;
}