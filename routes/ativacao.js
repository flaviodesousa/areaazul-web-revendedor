'use strict';

module.exports = function(app) {
  const routesUtil = require('../routes/utils');
  const AreaAzul = require('areaazul');


  app.get('/ativacao',
    routesUtil.ensureAuthenticated,
    function(req, res) {
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
          res.render('ativacao/ativacao-revenda-content', {
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
    });


  app.post('/ativacao',
    routesUtil.ensureAuthenticated,
    function(req, res) {
      const dadosAtivacao = {
        telefone: req.body.celular,
        cidade_id: req.body.cidade_id,
        tempo_minutos: req.body.tempo_minutos,
        marca: req.body.marca,
        modelo: req.body.modelo,
        cor: req.body.cor,
        placa: req.body.placa,
        tipo: req.body.tipo_veiculo,
        usuario_revendedor_id: JSON.parse(req.session.passport.user).id
      };

      AreaAzul.facade.Ativacao
        .ativarPorRevenda(dadosAtivacao)
        .then(function() {
          req.body = [];

          req.flash('success', 'Ativação realizada com sucesso!');
          res.redirect('/ativacao');
        })
        .catch(AreaAzul.BusinessException, function(ex) {
          req.flash('warning', 'Dados inválidos');
          if (ex.details) {
            ex.details.forEach(p => req.flash('warning', p.problem));
          }
          res.redirect('/ativacao');
        })
        .catch(() => {
          req.flash('danger', 'Falha no sistema durante ativação');
          res.redirect('/ativacao');
        });
    });


};
