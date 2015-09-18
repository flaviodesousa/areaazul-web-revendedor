var AreaAzul = require('areaazul');
var Veiculo = AreaAzul.models.Veiculo;

module.exports = function(app) {
    var veiculoController = {
        
        procurarVeiculo: function(req, res) {
            Veiculo.procurarVeiculo(
                req.query.placa)
            .then(function(result) {
                    if(result){
                        res.send(result.toJSON())
                    }else{
                        res.status(404).end();
                    }
                }).catch(function(err) {
                        res.status(500).end();
                });   
        },

    };
    return veiculoController;
};