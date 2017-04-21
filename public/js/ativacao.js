'use strict';

$(document).ready(function() {
  const AREAAZUL_API_HOST = Cookies.get('api-endpoint');
  const $campoPlaca = $('#campoPlaca');
  const $campoCelular = $('#campoCelular');
  const $campoCidade = $('#campoCidade');
  const detalhesDoVeiculo = function detalhesDoVeiculoHandler() {
    let placa = $campoPlaca.inputmask('unmaskedvalue');

    if (placa.length !== 7) {
      $('#detalhesDoVeiculo').hide();
      return;
    }

    $.getJSON(`${AREAAZUL_API_HOST}/veiculo?placa=${placa}`, null)
      .then(function(veiculo) {
        $('#placa').val(veiculo.placa);
        $('#marca').val(veiculo.marca).prop('readonly', true);
        $('#modelo').val(veiculo.modelo).prop('readonly', true);
        $('#cor').val(veiculo.cor).prop('readonly', true);
      })
      .catch(function() {
        $('#marca').val(null);
        $('#modelo').val(null);
        $('#cor').val(null);
        $('#detalhesDoVeiculo').show();
        $campoCidade.select2('open');
      });
  };
  detalhesDoVeiculo();

  // ------------MASCARAS------------------
  $campoPlaca.inputmask({
    mask: 'AAAAAAA',
    greedy: false,
    definitions: {
      A: {
        validator: '[A-Za-z0-9]',
        cardinality: 1,
        casing: 'upper'
      }
    }
  });
  $campoCelular.inputmask('99999999999');
  $campoCidade.select2({
    theme: 'bootstrap',
    placeHolder: 'Selecione a cidade do veículo',
    width: '100%',
    ajax: {
      url: `${AREAAZUL_API_HOST}/cidade`,
      dataType: 'json',
      delay: 250,
      data: function(params) {
        return {
          termos: params.term
        };
      },
      processResults: function(data/*, params*/) {
        // Parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        if (!data) {
          return { results: [] };
        }
        return {
          results: data.map(cidade => ({
            id: cidade.id,
            text: cidade.nome + '/' + cidade.estado.uf
          }))
        };
      },
      cache: true
    }
  });

  // ------------QUANDO OCORRER MUDANÇA NO CAMPO PLACA----------------
  $campoPlaca.change(detalhesDoVeiculo);
  $campoPlaca.focus();
});
