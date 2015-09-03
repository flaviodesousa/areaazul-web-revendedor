module.exports = function(app) {
    var AreaAzul = require('areaazul');
    var Ativacao = AreaAzul.models.Ativacao;
    var EstadoCollection = AreaAzul.collections.Estados;
<<<<<<< HEAD
    var CidadesCollection = AreaAzul.collections.Cidades;

    var ativacaoController = {
        ativar: function(req, res) {
            EstadoCollection.listar(function(result) {
                res.render('ativacao/ativacao_revenda', {
                    lista: result.models
                });
=======
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
>>>>>>> 69fb26c8bd8dd684f0729bb92cef2f2e20bce121
                console.log(result);
                return result;
            });
        },
<<<<<<< HEAD
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
            console.dir("session" + req.session);
            var dadosAtivacao = {
                cpf: req.body.cpf,
                placa: req.body.placa,
=======
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
>>>>>>> 69fb26c8bd8dd684f0729bb92cef2f2e20bce121
            }


            Ativacao.ativarPelaRevenda(dadosAtivacao)
                .then(function(revenda) {
                    console.log("revenda" + revenda);
                    //  res.render("revendedor/cadastro", {message: req.flash('info')});
                    req.flash('info', 'Salvo com sucesso!');
<<<<<<< HEAD
                    res.render("revendedor/cadastro", {
                        message: req.flash('info')
                    });
=======
                    res.render("revendedor/cadastro", {message: req.flash('info')});
>>>>>>> 69fb26c8bd8dd684f0729bb92cef2f2e20bce121
                })
                .catch(function(err) {
                    req.flash('info', err);
                    EstadoCollection.listar(function(result) {
<<<<<<< HEAD
                        res.render("ativacao/ativacao_revenda", {
                            message: req.flash('info')
                        });
=======
                        res.render("ativacao/ativacao_revenda", {message: req.flash('info')});
>>>>>>> 69fb26c8bd8dd684f0729bb92cef2f2e20bce121
                        console.log(result);
                        return result;
                    });

                });
        }
    }
    return ativacaoController;
}