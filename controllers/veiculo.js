const AreaAzul = require('areaazul');
const Veiculo = AreaAzul.facade.Veiculo;

module.exports = function() {
  return {
    procurarVeiculo: function(req, res) {
      Veiculo.buscarPorPlaca(req.query.placa)
        .then(function(result) {
          if (result) {
            res.send(result);
          } else {
            res.status(404)
              .end();
          }
        })
        .catch(function() {
          res.status(500)
            .end();
        });
    }
  };
};
