function ver(elemento) {
    if (elemento.checked) {
        document.getElementById("formularioPessoaFisica").style.display = "";
    } else {
        document.getElementById("formularioPessoaFisica").style.display = "none";
    }
}

function verCampo(elemento) {
    if (elemento.checked) {
        document.getElementById("formularioPessoaJuridica").style.display = "";
    } else {
        document.getElementById("formularioPessoaJuridica").style.display = "none";
    }
}

function verPorRadio(elemento) {
    switch (elemento) {
        case "1":
            document.getElementById('formularioPessoaFisica').style.display = "";
            document.getElementById('formularioPessoaJuridica').style.display = "none";
            document.getElementById('radioButtonPessoaFisica').checked = true;
            document.getElementById('radioButtonPessoaJuridica').checked = false;
            break;
        case "2":
            document.getElementById('formularioPessoaFisica').style.display = "none";
            document.getElementById('formularioPessoaJuridica').style.display = "";
            document.getElementById('radioButtonPessoaFisica').checked = false;
            document.getElementById('radioButtonPessoaJuridica').checked = true;
            break;
    }
}

function valorInicial() {
    if (radioButtonPessoaFisica.checked) {
        document.getElementById('formularioPessoaFisica').style.display = "";
        document.getElementById('formularioPessoaJuridica').style.display = "none";
    }
    if (radioButtonPessoaJuridica.checked) {
        document.getElementById('formularioPessoaFisica').style.display = "none";
        document.getElementById('formularioPessoaJuridica').style.display = "";
    }
}


$(document).ready(function(){
    $("#cpf_PessoaFisica").mask("999.999.999.-99");
    $("#celular_PessoaFisica").mask("(99) 9999-9999");
    $("#cnpj_PessoaJuridica").mask("99.999.999/9999-99");
    $("#telefone_PessoaJuridica").mask("(99) 9999-9999");
    $("#cpf_PessoaJuridica").mask("999.999.999.-99");
});


