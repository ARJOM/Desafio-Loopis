// //Pagina para registar reservar
// function reservarEspaco() {
//
//     var main = document.getElementById("main");
//
//     var resultado="";
//     resultado+="<h2 class=\"text\">Reservar de Espaço</h2>";
//     resultado+="<p class=\"text\">Data da reserva: </p>";
//     resultado+="<input id='data' type=\"date\">";
//     resultado+="<div class=\"content\">";
//     resultado+="<p class=\"text\">Horário de início: </p>";
//     resultado+="<input type=\"time\" id=\"hora-inicio\" min=\"07:00\" max=\"22:00\" required>";
//     resultado+="<p class=\"text\">Horário de entrega: </p>";
//     resultado+="<input type=\"time\" id=\"hora-entrega\" min=\"07:00\" max=\"22:00\" required>";
//     resultado+="<p class=\"text\">Espaços:</p>";
//     resultado +="<select id=\"Espaco\">";
//     resultado +="<option value='null'></option>"
//     //Listando espaços
//     firebase.database().ref('Espaco').on('value', function (snapshot) {
//         snapshot.forEach(function (item) {
//             resultado += "<option value='"+item.val().Chave+"'>"+item.val().NomedoEspaco+"</option>";
//         });
//     });
//     resultado +="</select><br/>";
//     resultado+="<input type=\"submit\" onclick=\"registrarReserva()\" value=\"Reservar\" id=\"btn\">";
//     setTimeout(function() {
//         main.innerHTML = resultado;
//     }, 1000);
//
// }


//Criar uma reserva de Espaço
function registrarReserva(espacoKey) {
    console.log()
    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
        email = user.email;
    }

    // Obtém a data/hora atual
    var dataAtual = new Date();

    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();

    var hoje = ano + '-' + mes + '-' + dia;

    var data = document.getElementById("data").value;
    var horadeinicio = document.getElementById("hora-inicio").value;
    var horadeentrega = document.getElementById("hora-entrega").value;

    if ((data >= hoje) && ((horadeinicio >= "07:00") && (horadeinicio <= "22:00")) && ((horadeentrega >= "07:00")
        && (horadeentrega <= "22:35")) && (horadeinicio < horadeentrega)) {
        firebase.database().ref('Usuarios').on('value', function (snapshot) {
            snapshot.forEach(function (item) {
                if ((email === item.val().Email)) {
                    var usuario = item.val().Chave;
                    var espaco = espacoKey;
                    var chave = firebase.database().ref().child("Reserva").push().key;
                    var Reserva = {
                        Usuario: usuario,
                        Data: data,
                        HoradeInicio: horadeinicio,
                        HoradeEntrega: horadeentrega,
                        Espaco: espaco,
                        Chave: chave,
                    };

                    firebase.database().ref().child('Reserva/' + chave).set(Reserva);
                    alert("Reserva Feita");
                    console.log(espaco);
                }
            });
        });

        data = document.getElementById('data').value = "";
        horadeinicio = document.getElementById('hora-inicio').value = "";
        horadeentrega = document.getElementById('hora-entrega').value = "";
        // espaco = document.getElementById('Espaco').value=null;
        abrir();
    } else{
        window.alert("Horário inválido");
    }
}

//Ver todas as Reservas
function MinhasReservas(){
    var user = firebase.auth().currentUser;
    var email;
    if(user != null){
        email = user.email;
    }
    var main = document.getElementById("main");
    var resultado = "";
    resultado+="<h2>Reservas</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Espaco</th><th>Data</th><th>Hora de Inicio</th><th>Hora de Entrega</th></tr>"
    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            console.log("Percorrendo email: "+item.val().Email);
            console.log("Email Logado: "+email);
            if((email===item.val().Email)){
                var key = item.val().Chave;
                console.log("Chave: "+key);
                firebase.database().ref('Reserva').on('value', function (snapshot) {
                    snapshot.forEach(function (item) {
                        if (key === item.val().Usuario) {
                            resultado += "<tr>"
                            resultado += "<td>" + item.val().Espaco + "</td>";
                            resultado += "<td>" + item.val().Data + "</td>";
                            resultado += "<td>" + item.val().HoradeInicio + "</td>";
                            resultado += "<td>" + item.val().HoradeEntrega + "</td>";
                            resultado += "<td><a onclick=\"editarreserva('" + item.val().Chave + "')\" href='#'>Editar</a></td>";
                            resultado += "<td><a onclick=\"deletarreserva('" + item.val().Chave + "')\" href='#'>Deletar</a></td>";
                            resultado += "</tr>";
                        }
                    });
                });
                
            }

        });
    });
    setTimeout(function() {
        resultado += "</table>";
        main.innerHTML = resultado;
    }, 1000);

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
firebase.database().ref('/Reserva/'+key).remove();
alert("Reserva deletada!");
MinhasReservas();
}