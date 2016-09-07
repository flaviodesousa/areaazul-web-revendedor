module.exports = function (app) {
  var AreaAzul = require('areaazul');
  var Ativacao = AreaAzul.db.model('Ativacao');
  var EstadoCollection = AreaAzul.db.collection('Estados');
  var CidadeCollection = AreaAzul.db.collection('Cidades');
  var Configuracao = AreaAzul.db.model('Configuracao');

  var ativacaoController = {
    atualizarCidades: function () {
      CidadeCollection.listar(function (result) {
        res.render('ativacao/ativacao_revenda', {
          lista: result.models, values: req.body
        });
        return result;
      });
    },
    listarEstados: function (req, res) {
      EstadoCollection.listar(
        function (result) {
          res.send(result.toJSON());
        });
    },
    ativar: function (req, res) {

      var link = null;
      if (req.user.attributes.autorizacao === 'administrador') {
        link = 'ativacao/ativacaoRevendedor';
      } else {
        link = 'ativacao/ativacaoUsuarioRevendedor';
      }
      EstadoCollection.listar(function (result) {
        res.render(link, {
          lista: result.models, values: req.body
        });
        return result;
      });
    },
    listarCidades: function (req, res) {
      CidadeCollection.listar(
        req.params.id,
        function (result) {
          res.send(result.toJSON());
        });
    },
    salvarAtivacao: function (req, res) {
      var valor = 0;
      var link = null;
      var listaVazia = [];
      if (req.user.attributes.autorizacao === 'administrador') {
        link = 'ativacao/ativacaoRevendedor';
      } else {
        link = 'ativacao/ativacaoUsuarioRevendedor';
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
        cidade: 1,
        tempo: req.body.tempo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        cor: req.body.cor,
        placa: req.body.placa,
        tipo_veiculo: req.body.tipo_veiculo,
        usuario_pessoa_id: req.session.passport.user,
      };

      Ativacao.ativarPelaRevenda(dadosAtivacao)
        .then(function (revenda) {
          req.body = [];

          req.flash('info', 'Ativação realizada com sucesso!');
          res.render(link, {
            message: req.flash('info'),
            values: req.body
          });
          return revenda;
        })
        .catch(function (err) {

          if (err.details) {
            for (var i = 0; i < err.details.length; i++) {
              req.flash('info', err.details[i].problem);
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
  return ativacaoController;
};
