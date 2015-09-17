var AreaAzul = require('areaazul');
var Veiculo = AreaAzul.models.Veiculo;

module.exports = function(app) {
    var veiculoController = {
        
        procurarVeiculo: function(req, res) {
             console.dir(req.params);
            Veiculo.procurarVeiculo(
                req.params.placa)
            .then(function(result) {
                    console.dir(result);
                    res.send(result.toJSON());
                }).catch(function(err) {

                    res.status(404).send('' + result);
                    console.dir(err);
                    return err;
                });
                
        },

    };
    return veiculoController;
};