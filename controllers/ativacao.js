module.exports = function() {
  var AreaAzul = require('areaazul');
  var Ativacao = AreaAzul.facade.Ativacao;
  var Configuracao = AreaAzul.facade.Configuracao;

  return {
    ativar: function(req, res) {

      var link = null;
      if (req.user.get('autorizacao') === 'administrador') {
        link = 'ativacao/ativacao-por-administrador';
      } else {
        link = 'ativacao/ativacao-por-usuario';
      }
      res.render(link, { values: req.body });
    },
    salvarAtivacao: function(req, res) {
      var valor = 0;
      var link = null;
      if (req.user.get('autorizacao') === 'administrador') {
        link = 'ativacao/ativacao-por-administrador';
      } else {
        link = 'ativacao/ativacao-por-usuario';
      }

      if (req.body.tempo !== null) {
        var tamanhoArray = Configuracao.getConfiguracaoTempo().length;
        var configuracoes = Configuracao.getConfiguracaoTempo();
        for (var i = 0; i < tamanhoArray; i++) {
          if (req.body.tempo === configuracoes[ i ].quantidade_tempo) {
            valor = configuracoes[ i ].preco;
          }
        }
      }
      var dadosAtivacao = {
        valor: valor,
        celular: req.body.celular,
        cidade: 1,
        tempo: req.body.tempo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        cor: req.body.cor,
        placa: req.body.placa,
        tipo_veiculo: req.body.tipo_veiculo,
        usuario_pessoa_id: req.session.passport.user
      };

      Ativacao.ativarPelaRevenda(dadosAtivacao)
        .then(function(revenda) {
          req.body = [];

          req.flash('info', 'Ativação realizada com sucesso!');
          res.render(link, {
            message: req.flash('info'),
            values: req.body
          });
          return revenda;
        })
        .catch(AreaAzul.BusinessException, function(err) {

          if (err.details) {
            for (var i = 0; i < err.details.length; i++) {
              req.flash('info', err.details[ i ].problem);
              res.render(link, {
                message: req.flash('info'),
                values: req.body
              });
            }
          } else {
            req.flash('info', err);
            res.render(link, {
              message: req.flash('info'),
              values: req.body
            });
          }
          return err;
        });
    }
  };
};
