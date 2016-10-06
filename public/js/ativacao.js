'use strict';

const AREAAZUL_API_HOST = Cookies.get('api-endpoint');

$(document).ready(function() {
  const $campoPlaca = $('#campoPlaca');
  const $campoCelular = $('#campoCelular');

  // ------------MASCARAS------------------
  $campoPlaca.inputmask({
    mask: 'AAA-9999',
    greedy: false,
    definitions: {
      A: {
        validator: '[A-Za-z]',
        cardinality: 1,
        casing: 'upper'
      }
    }
  });
  $campoCelular.inputmask('(99) 99999-9999');

  // ------------QUANDO OCORRER MUDANÇA NO CAMPO PLACA----------------
  $campoPlaca.change(function() {
    var placa = $campoPlaca.inputmask('unmaskedvalue');

    if (placa.length < 7) {
      $('#detalhesDoVeiculo').hide();
      return;
    }
    $.getJSON(`${AREAAZUL_API_HOST}/veiculo?placa=${placa}`, null)
      .done(function(veiculo) {
        $('#placa').val(veiculo.placa);
        $('#marca').val(veiculo.marca).prop('readonly', true);
        $('#modelo').val(veiculo.modelo).prop('readonly', true);
        $('#cor').val(veiculo.cor).prop('readonly', true);
      })
      .fail(function(err) {
        $('#marca').val(null);
        $('#modelo').val(null);
        $('#cor').val(null);
        $('#detalhesDoVeiculo').show();
      });
  })
});
