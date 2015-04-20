module.exports = function(app) {

    var AreaAzul = require('areaazul'),
        Usuario_Revendedor = AreaAzul.models.usuario_revendedor,
        PessoaFisica = AreaAzul.models.pessoafisica,
        Pessoa = AreaAzul.models.pessoa;
        app.locals.moment = require('moment');

    var usuarioController = {        
        index: function(req, res) {
            res.render('usuario/index');
        },
        alterarSenha: function(req, res){
            var usuario = {
                id_usuario_revendedor: req.body.id_usuario_revendedor,
                login: req.body.login,
                senha: req.body.senha,
                nova_senha: req.body.nova_senha,
                conf_senha: req.body.conf_senha
            }

            var arr = Usuario_Revendedor.validarSenha(usuario);
            if(arr.length == 0){
                Usuario_Revendedor.alterarSenha(usuario,
                function(result) {
                    req.flash('info','Alterado com sucesso!!!');
                    console.log("Alterado com sucesso!!!");
                    res.redirect('/');
                },
                function(result) {
                    req.flash('info','Erro ao alterar!!!');
                    console.log("Erro ao alterar!!!"+result);
                    res.render('usuario/home', {value:result.attributes, message: req.flash('info')});
                });
             }else{
                for(var i = 0; i<arr.length;i++)
                req.flash('info',arr[i].problem);
                res.render('usuario/home', {value:req.body, message: req.flash('info')});
            }
    }
}
return usuarioController;
}