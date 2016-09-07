module.exports = function(app) {

    var AreaAzul = require('areaazul'),
        UsuarioRevendedor = AreaAzul.db.model('UsuarioRevendedor'),
        Recuperacao_Senha = AreaAzul.db.model('recuperacao_senha');
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

            var arr = UsuarioRevendedor.validarSenha(usuario);
            if(arr.length == 0){
                UsuarioRevendedor.alterarSenha(usuario,
                function(result) {
                    req.flash('info','Alterado com sucesso!!!');
                    res.redirect('/');
                },
                function(result) {
                    req.flash('info','Erro ao alterar!!!');
                    res.render('usuario/home', {value:result.attributes, message: req.flash('info')});
                });
             }else{
                for(var i = 0; i<arr.length;i++)
                req.flash('info',arr[i].problem);
                res.render('usuario/home', {value:req.body, message: req.flash('info')});
            }
    },
    alterarSenhas: function(req, res){

        var password_recovery = {
            id_recuperacao_senha : req.params.id_recuperacao_senha
        }

        Recuperacao_Senha.procurar(password_recovery,
            function(result){
                req.flash('info', 'Encontrado!');
                res.render('usuario/alterarSenha', {value:result.attributes, message: req.flash('info')});

            }, function(result){

                 req.flash('info', 'Erro não encontrado!');
                res.render('usuario/alterarSenha', {message: req.flash('info')});
            });
    },
    recuperar_senha: function(req, res){
         var usuario = {
                pessoa_id: req.params.id,
                nova_senha: req.body.nova_senha,
                conf_senha : req.body.conf_senha
            }

            var arr = UsuarioRevendedor.validarSenhaAlteracao(usuario);
            if(arr.length == 0){
                UsuarioRevendedor.alterarSenhaRecuperacao(usuario,
                function(result) {
                    req.flash('info','Alterado com sucesso!!!');
                    console.log("Alterado com sucesso!!!");
                     res.render('usuario/alterarSenha', {value:usuario.pessoa_id, message: req.flash('info')});
                },
                function(result) {
                    req.flash('info','Erro ao alterar!!!');
                    console.log("Erro ao alterar!!!"+result);
                    res.render('usuario/alterarSenha', {value:usuario.pessoa_id, message: req.flash('info')});
                });
             }else{
                for(var i = 0; i<arr.length;i++)
                req.flash('info',arr[i].problem);
                res.render('usuario/alterarSenha', {value:usuario.pessoa_id, message: req.flash('info')});
            }
    }

}
return usuarioController;
}
