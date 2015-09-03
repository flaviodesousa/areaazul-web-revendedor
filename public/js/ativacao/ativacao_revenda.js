function verificaPlaca() {
    var pf = document.getElementById("placa").value.length;
    if (document.getElementById("placa").value.length < 1) {
        document.getElementById("campos1").style.display = "none";
        document.getElementById("campos2").style.display = "none";
    } else {
        document.getElementById("campos1").style.display = "block";
        document.getElementById("campos2").style.display = "block";
    }
}

function escondeCampos() {
    document.getElementById("campos1").style.display = "none";
    document.getElementById("campos2").style.display = "none";
}


jquery().ready(function(){
    $.areaazul = {};
    $.areaazul.estado = $('select[name=estado]'); 

    $.areaazul.updateForm = function(){
        var id_estado = Number($.areaazul.estado.val());
        if(id_estado){return;}

        $.ajax({
         url:'http://http://localhost:18360/ativacao/cidades='+id_estado,
         type: 'GET',
         success: function(cidades){
            if(cidades.length > 0){
                console.log(cidades);
            }

         },
        error: function(xhr, status, errorThrown) {
            console.log('Error: ' + errorThrown);
            console.log('Status: ' + status);
            console.dir(xhr);
      },
    });
  };