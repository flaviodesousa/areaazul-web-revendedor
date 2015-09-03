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

function atualizarCidades(){



}