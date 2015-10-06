'use script'

exports.formata = function(valor, mask, evt) {
    var valorComMascara = valor;

		valorComMascara = valorComMascara.replace(".", "");
	    valorComMascara = valorComMascara.replace("-", "");
	    valorComMascara = valorComMascara.replace("/", "");
    	valorComMascara = valorComMascara.replace("_", "");
    	valorComMascara = valorComMascara.replace("*", "");

    return valorComMascara;
}