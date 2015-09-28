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
        var tamanhoValorPlaca = $("#campoPlaca").val().length;
        var valorPlaca = $("#campoPlaca").val();
        var campoVerificado = 1;

         if (tamanhoValorPlaca > 7  && campoVerificado == 1) {

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
                    }).done(function() {
                        $('#camposInvisiveis').show();
                      })
                      .fail(function() {
                        $('#camposInvisiveis').show();
                        $("#placa").val(null)
                        $("#marca").val(null).prop('readonly', false);
                        $("#modelo").val(null).prop('readonly', false);
                        $("#cor").val(null).prop('readonly', false);
                        $('#cod_cidades').html('<option value=""> </option>').show();
                      });
            } 
        }
    })
});