var AreaAzul = require('areaazul');
var Veiculo = AreaAzul.models.Veiculo;

module.exports = function(app) {
    var veiculoController = {
        
        procurarVeiculo: function(req, res) {
             console.dir(req.query);
            Veiculo.procurarVeiculo(
                req.query.placa)

            .then(function(result) {
                    console.dir(result)
                    if(result){
                        res.send(result.toJSON())
                    }else{
                        res.status(404);
                    }
                }).catch(function(err) {

                    res.status(404);
                    console.dir(err);
                    return err;
                });
                
        },

    };
    return veiculoController;
};