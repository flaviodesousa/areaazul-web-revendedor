function verificaPlaca() {
    var pf = document.getElementById("campoPlaca").value.length;
    if (document.getElementById("campoPlaca").value == "___-____"){
        document.getElementById("camposVisiveis").style.display = "none";
        document.getElementById("camposInvisiveis").style.display = "none";

    } else {
        document.getElementById("camposVisiveis").style.display = "block";
        document.getElementById("camposInvisiveis").style.display = "block";
    }
}

function escondeCampos() {
    document.getElementById("camposVisiveis").style.display = "none";
    document.getElementById("camposInvisiveis").style.display = "none";
}

function verPorRadio(elemento) {
    switch (elemento) {
        case "1":
            document.getElementById('radioButtonCarro').checked = true;
            document.getElementById('radioButtonMoto').checked = false;
            document.getElementById('radioButtonCamionete').checked = false;
            break;
        case "2":
            document.getElementById('radioButtonCarro').checked = false;
            document.getElementById('radioButtonMoto').checked = true;
            document.getElementById('radioButtonCamionete').checked = false;
            break;
        case "3":
            document.getElementById('radioButtonCarro').checked = false;
            document.getElementById('radioButtonMoto').checked = false;
            document.getElementById('radioButtonCamionete').checked = true;
            break;
    }
}


$(document).ready(function(){
       $('#campoPlaca').change(function() {
        if ($(this).val()) {
            $.getJSON('http://localhost:18360/veiculo?placa=' + $(this).val(), null, function(veiculo) {
               $("#placa").val(veiculo.placa)
               $("#marca").val(veiculo.marca)
               $("#modelo").val(veiculo.modelo)
               $("#cor").val(veiculo.cor)
               $('#cod_estados').html('<option value="' + veiculo.estado_id+ '">' + veiculo.uf+ '</option>').show();
               $('#cod_cidades').html('<option value="' + veiculo.cidade_id+ '">' + veiculo.nome+ '</option>').show();
           
              
            });
        } else {
          
        }
    })
});
