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


$(document).ready(function() {

    $("#campoPlaca").mask("aaa-9999");
    $("#campoCelular").mask("(99) 9999-9999");
    var campoVerificado = false;
    $('#camposInvisiveis').hide();
    

    $('#campoPlaca').change(function() {

    //     var tamanhoValorPlaca = $("#campoPlaca").val().length;
    //     var valorPlaca = $("#campoPlaca").val();

    // alert(valorPlaca);
         if (tamanhoValorPlaca > 6 && !valorPlaca.equals("___-____") && campoVerificado == false) {

            if ($(this).val()) {
                $.getJSON('http://localhost:18360/veiculo?placa=' + $(this).val(), null, function(veiculo) {

                

                    $("#placa").val(veiculo.placa)
                    $("#marca").val(veiculo.marca).prop('readonly', true);
                    $("#modelo").val(veiculo.modelo).prop('readonly', true);
                    $("#cor").val(veiculo.cor).prop('readonly', true);

                    $('#cod_estados').html('<option value="' +
                        veiculo.estado_id + '">' + veiculo.uf + '</option>').show();

                    $('#cod_cidades').html('<option value="' +
                        veiculo.cidade_id + '">' + veiculo.nome + '</option>').show();

                    $('#camposInvisiveis').show();
                    campoVerificado = true;

                });
            } 
        }else {
        campoVerificado = false;
            $('#camposInvisiveis').hide();
        }
    })
});