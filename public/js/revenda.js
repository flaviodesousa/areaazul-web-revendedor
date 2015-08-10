 function ver(elemento) {
     if (elemento.checked) {
         document.getElementById("formulario1").style.display = "";
     } else {
         document.getElementById("formulario1").style.display = "none";
     }
 };

 function verCampo(elemento) {
     if (elemento.checked) {
         document.getElementById("formulario2").style.display = "";
     } else {
         document.getElementById("formulario2").style.display = "none";
     }
 };

 function verPorRadio(elemento) 
 {
     switch (elemento) 
     {
         case "1":
             document.getElementById("formulario1").style.display = "";
             document.getElementById("formulario2").style.display = "none";
             document.getElementById("radio1").checked = true;
             document.getElementById("radio2").checked = false;
             break;
         case "2":
             document.getElementById("formulario1").style.display = "none";
             document.getElementById("formulario2").style.display = "";
             document.getElementById("radio1").checked = false;
             document.getElementById("radio2").checked = true;
             break;
     }
 }

 function valorInicial() {
     if (radio1.checked) {
         document.getElementById("formulario1").style.display = "";
         document.getElementById("formulario2").style.display = "none";
     }
     if (radio2.checked) {
         document.getElementById("formulario1").style.display = "none";
         document.getElementById("formulario2").style.display = "";
     }
 }

 $(".alert").delay(2000).slideUp(200, function() {
     $(this).alert('close');
 });