function preencheEspacos(key) {

    var main = document.getElementById("main");

    var resultado = "<div class=\"buscar\">";
    resultado+="<form class='reserva'>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Data da reserva: </p>";
    resultado+="<input id='data' type=\"date\">";
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

    resultado += filtraEspacos(key);

    setTimeout(function() {
        main.innerHTML = resultado;
    }, 1250);

}

function filtraEspacos(key) {
    blocos = "";
    firebase.database().ref('Espaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            console.log(item.val().TipoEspaco);
            if (item.val().TipoEspaco === key){
                console.log("Entrou")
                blocos += "<div onclick=\"registrarReserva('"+item.val().Chave+"')\" id='"+item.val().Chave+"'><p>"+item.val().NomedoEspaco+"</p><p>"+item.val().Local+"</p></div></br>"
            }
        });
    });
    setTimeout(function() {
    }, 2000);
    if (blocos === "") {
        blocos = "<h2>Não há nenhum espaço cadastrado desse tipo</h2>"
    }
    return blocos;
}