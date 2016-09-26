'use strict';

const AREAAZUL_API_HOST = Cookies.get('api-endpoint');

function verPorRadio(elemento) {
  document.getElementById('radioButtonCarro').checked = elemento === '1';
  document.getElementById('radioButtonMoto').checked = elemento === '2';
  document.getElementById('radioButtonCamionete').checked = elemento === '3';
}

$(document).ready(function() {
  const $campoPlaca = $('#campoPlaca');
  const $campoCelular = $('#campoCelular');
  const $codEstados = $('#cod_estados');

  // ------------MASCARAS------------------
  $campoPlaca.mask('AAA-9999');
  $campoCelular.mask('(99) 99999-9999');

  // ------------CONDICIONAL PARA MOSTRAR MOSTRAR/ESCONDER DIV
  if ($campoPlaca.val().length === 8) {
    $('#camposInvisiveis2').show();
  } else {
    $('#camposInvisiveis2').hide();
  }

  $codEstados.change(function() {
    const estadoId = $(this).val();
    if (estadoId) {
      $('.carregando').show();
      $.getJSON(`${AREAAZUL_API_HOST}/estado/{estadoId}/cidade`, null,
        function(j) {
        var options = '<option value=""></option>';
        for (var i = 0; i < j.length; i++) {
          options += '<option value="' + j[i].id_cidade + '">' + j[i].nome + '</option>';
        }
        $('#cod_cidades').html(options).show();
        $('.carregando').hide();
      });
    } else {
      $('#cod_cidades').html('<option value="">-- Escolha um estado --</option>');
    }
  })

  // ------------QUANDO OCORRER MUDANÇA NO CAMPO PLACA----------------
  $campoPlaca.change(function() {
    var placa = $campoPlaca.val();
    var tamanhoValorPlaca = $campoPlaca.val().length;

    if (tamanhoValorPlaca === 8) {
      $('#camposInvisiveis2').show();
    } else {
      $('#camposInvisiveis2').hide();
    }

    if (tamanhoValorPlaca === 8) {

      if ($(this).val()) {


        $.getJSON(`${AREAAZUL_API_HOST}/veiculo?placa=${placa}`, null,
          function(veiculo) {
            $('#placa').val(veiculo.placa)
            $('#marca').val(veiculo.marca).prop('readonly', true);
            $('#modelo').val(veiculo.modelo).prop('readonly', true);
            $('#cor').val(veiculo.cor).prop('readonly', true);
          })
          .done(function() {
            $('#camposInvisiveis2').show();
          })
          .fail(function() {
            estados();
            $('#marca').val(null);
            $('#modelo').val(null);
            $('#cor').val(null);
            $('#camposInvisiveis2').show();

            $('#cod_cidades').html('<option value=""> </option>').show();
          });

      } else {
        //  $('#camposInvisiveis').hide();
        $('#camposInvisiveis2').hide();
      }
    }
  })
});

function estados() {
  $.ajax({
    url: `${AREAAZUL_API_HOST}/estado`,
    type: 'GET',
    dataType: 'json',
    success: function(json) {
      var options = '<option value=""></option>';
      for (var i = 0; i < json.length; i++) {
        options += '<option value="' + json[ i ].id_estado + '">' + json[ i ].nome + '</option>';
      }
      $('#cod_estados').html(options).show();
    },
    error: function(xhr, status, errorThrown) {
    }
  });
}
