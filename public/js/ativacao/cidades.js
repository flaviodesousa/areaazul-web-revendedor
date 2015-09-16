$(document).ready(function() {
    $('#cod_estados').change(function() {
        if ($(this).val()) {

            $.getJSON('http://localhost:18360/ativacao/cidades/' + $(this).val(), null, function(j) {
                var options = '<option value=""></option>';
                for (var i = 0; i < j.length; i++) {
                    options += '<option value="' + j[i].cod_cidades + '">' + j[i].nome + '</option>';
                }
                $('#cod_cidades').html(options).show();
                $('.carregando').hide();
            });
        } else {
          //  $('#cod_cidades').html('<option value="">-- Escolha um estado --</option>');
        }
    })
})