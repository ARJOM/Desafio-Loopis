//Pagina para registar reservar
function reservarEspaco() {

    var main = document.getElementById("main");

    var resultado="";
    resultado+="<h2 class=\"text\">Reservar de Espaço</h2>";
    resultado+="<p class=\"text\">Data da reserva: </p>";
    resultado+="<input id='data' type=\"date\">";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Horário de início: </p>";
    resultado+="<input type=\"time\" id=\"hora-inicio\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="<p class=\"text\">Horário de entrega: </p>";
    resultado+="<input type=\"time\" id=\"hora-entrega\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="<p class=\"text\">Espaços:</p>";
    resultado +="<select id=\"Espaco\">";
    resultado +="<option value='null'></option>"
    //Listando espaços
    firebase.database().ref('Espaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            resultado += "<option value='"+item.val().Chave+"'>"+item.val().NomedoEspaco+"</option>";
        });
    });
    resultado +="</select><br/>";
    resultado+="<input type=\"submit\" onclick=\"registrarReserva()\" value=\"Reservar\" id=\"btn\">";
    setTimeout(function() {
        main.innerHTML = resultado;
    }, 1000);

}
var user = firebase.auth().currentUser;
var email = user.email;

//Criar uma reserva de Espaço
function registrarReserva(){
    var user = firebase.auth().currentUser;
    var email = user.email;
    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
        if((email===item.val().Email)){
            var usuario = item.val().Chave;
            var data = document.getElementById("data").value;
            var horadeinicio = document.getElementById("hora-inicio").value;
            var horadeentrega = document.getElementById("hora-entrega").value;
            var espaco = document.getElementById("Espaco").value;
            var chave = firebase.database().ref().child("Reserva").push().key;
            var Reserva = {
                Usuario : usuario,
                Data : data,
                HoradeInicio: horadeinicio,
                HoradeEntrega: horadeentrega,
                Espaco: espaco,
                Chave: chave,
            };


            firebase.database().ref().child('Reserva/'+chave).set(Reserva);
            alert("Reserva Feita");
            console.log(espaco);

        }
    });
    });

        data = document.getElementById('data').value="";
        horadeinicio = document.getElementById('hora-inicio').value="";
        horadeentrega = document.getElementById('hora-entrega').value="";
        espaco = document.getElementById('Espaco').value=null;
        abrir();
}


//Ver todas as Reservas
function MinhasReservas(){

    var main = document.getElementById("main");
    var resultado = "";
    resultado+="<h2>Reservas</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Espaco</th><th>Data</th><th>Hora de Inicio</th><th>Hora de Entrega</th></tr>"
    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
        if((email===item.val().Usuario)){
            firebase.database().ref('Reserva').on('value', function (snapshot) {
                snapshot.forEach(function (item) {
                    resultado += "<tr>"
                    resultado += "<td>"+ item.val().Espaco +"</td>";  
                    resultado += "<td>"+ item.val().Data +"</td>";
                    resultado += "<td>"+ item.val().HoradeInicio +"</td>";
                    resultado += "<td>"+ item.val().HoradeEntrega +"</td>";
                    resultado += "<td><a onclick=\"editarreserva('"+item.val().Chave+"')\" href='#'>Editar</a></td>";
                    resultado += "<td><a onclick=\"deletarreserva('"+item.val().Chave+"')\" href='#'>Deletar</a></td>";
                    resultado += "</tr>";
                        });
                    });
                    setTimeout(function() {
                        resultado += "</table>";
                        main.innerHTML = resultado;
                    }, 1000);
                
                }

                });
        });

}




//Função para editar cada reserva individualmente;
function editarreserva(key){

    var main = document.getElementById("main");

    var resultado="";
    resultado+="<h2 class=\"text\">Editar Reservar de Espaço</h2>";
    resultado+="<p class=\"text\">Data da reserva: </p>";
    resultado+="<input id='data' type=\"date\">";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Horário de início: </p>";
    resultado+="<input type=\"time\" id=\"hora-inicio\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="<p class=\"text\">Horário de entrega: </p>";
    resultado+="<input type=\"time\" id=\"hora-entrega\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="<p class=\"text\">Espaços:</p>";
    resultado +="<select id=\"Espaco\">";
    resultado +="<option value='null'></option>"
    main.innerHTML = resultado;
    //Listando tipos de espaço
    firebase.database().ref('Espaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            resultado += "<option value='"+item.val().Chave+"'>"+item.val().NomedoEspaco+"</option>";
        });
    });
 


    firebase.database().ref('Reserva').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            if (key === item.val().Chave){
                document.getElementById("data").value = item.val().Data;
                document.getElementById("hora-inicio").value = item.val().HoradeInicio;
                document.getElementById("hora-entrega").value = item.val().HoradeEntrega;
            }
        });
    });

}

function deletarreserva(key){
firebase.database().ref('/Usuarios/'+key).remove();
alert("Reserva deletada!");
}