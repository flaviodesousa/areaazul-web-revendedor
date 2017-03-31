module.exports = function() {
  const AreaAzul = require('areaazul');

  function renderAtivacao(req, res) {
    AreaAzul.facade.Configuracao
      .buscar()
      .then(configuracao => {
        let view = null;
        if (req.user.autorizacao === 'administrador') {
          view = 'ativacao/ativacao-por-administrador';
        } else {
          view = 'ativacao/ativacao-por-usuario';
        }
        let values = req.body;
        values.cidade_id = configuracao.cidade_id;
        res.render(view, {
          values: req.body,
          configuracao: configuracao
        });
      });
  }

  return {
    ativar: function(req, res) {
      renderAtivacao(req, res);
    },
    salvarAtivacao: function(req, res) {
      const dadosAtivacao = {
        celular: req.body.celular,
        cidade_id: req.body.cidade_id,
        tempo: req.body.tempo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        cor: req.body.cor,
        placa: req.body.placa,
        tipo: req.body.tipo_veiculo,
        usuario_revendedor_id: req.session.passport.user
      };

      AreaAzul.facade.Ativacao
        .ativarPorRevenda(dadosAtivacao)
        .then(function() {
          req.body = [];

          req.flash('success', 'Ativação realizada com sucesso!');
          renderAtivacao(req, res);
        })
        .catch(AreaAzul.BusinessException, function() {
          req.flash('warning', 'Dados inválidos');
          renderAtivacao(req, res);
        })
        .catch(() => {
          req.flash('danger', 'Falha no sistema durante ativação');
          renderAtivacao(req, res);
        });
    }
  };
};
