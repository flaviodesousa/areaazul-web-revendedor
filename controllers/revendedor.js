module.exports = function(app) {
     var AreaAzul = require('areaazul'),
        Revendedor = AreaAzul.models.revendedor;
    
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

          }

    }
    return revendedorController;
}