module.exports = function() {
  const AreaAzul = require('areaazul');

  function renderAtivacao(req, res) {
    let configuracao;
    let ativacao = req.body;
    AreaAzul.facade.Configuracao
      .buscar()
      .then(c => {
        configuracao = c;
        if (!ativacao.tipo_veiculo) {
          ativacao.tipo_veiculo = 'carro';
        }
        if (ativacao.cidade_id) {
          return AreaAzul.facade.Cidade
            .buscarPorId(ativacao.cidade_id)
            .then(cidade => {
              ativacao.cidade_id = cidade.id;
              ativacao.cidade = cidade;
            });
        }
        ativacao.cidade_id = configuracao.cidade_id;
        ativacao.cidade = configuracao.cidade;
      })
      .then(() => {
        let view = null;
        if (req.user.autorizacao === 'administrador') {
          view = 'ativacao/ativacao-por-administrador';
        } else {
          view = 'ativacao/ativacao-por-usuario';
        }
        res.render(view, {
          ativacao: ativacao,
          configuracao: configuracao,
          messages: {
            info: req.flash('info'),
            danger: req.flash('danger'),
            warning: req.flash('warning'),
            success: req.flash('success')
          }
        });
      });
  }

  return {
    ativar: function(req, res) {
      renderAtivacao(req, res);
    },
    salvarAtivacao: function(req, res) {
      const dadosAtivacao = {
        telefone: req.body.celular,
        cidade_id: req.body.cidade_id,
        tempo_minutos: req.body.tempo_minutos,
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
        .catch(AreaAzul.BusinessException, function(ex) {
          req.flash('warning', 'Dados inválidos');
          if (ex.details) {
            ex.details.forEach(p => req.flash('warning', p.problem));
          }
          renderAtivacao(req, res);
        })
        .catch(() => {
          req.flash('danger', 'Falha no sistema durante ativação');
          renderAtivacao(req, res);
        });
    }
  };
};
