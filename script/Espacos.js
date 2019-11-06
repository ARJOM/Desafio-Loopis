function preencheEspacos() {

    var main = document.getElementById("main");

    var resultado = "<div class=\"buscar\">";
    resultado+="<form class='reserva'>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Data da reserva: </p>";
    resultado+="<input type=\"date\">";
    resultado+="</div>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Horário de início: </p>";
    resultado+="<input type=\"time\" id=\"hora-inicio\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="</div>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Horário de entrega: </p>";
    resultado+="<input type=\"time\" id=\"hora-entrega\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="</div>";
    resultado+="</form>\n";
    resultado+="<input type=\"submit\" value=\"filtrar\" id=\"btn\">";
    resultado+="</div>";

    main.innerHTML = resultado;
}