const AreaAzul = require('areaazul');
const Veiculo = AreaAzul.db.model('Veiculo');

module.exports = function() {
  return {
    procurarVeiculo: function(req, res) {
      Veiculo.procurarVeiculo(
        req.query.placa)
        .then(function(result) {
          if (result) {
            res.send(result.toJSON())
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
