function listaUser(){
    var main = document.getElementById("main");
    var resultado = "";
    resultado+="<h2>Usuários</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Nome</th><th>Email</th><th>Moderador</th><th>Administrador</th></tr>"
    //Listando Espaços na Tabela
    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            resultado += "<tr>"
            resultado += "<td><a onclick=\"editargerencia('"+item.val().Chave+"')\" href='#'>"+ item.val().Nome +"</a></td>";
            resultado += "<td>"+ item.val().Email +"</td>";
            resultado += "<td>"+ item.val().Moderador +"</td>";
            resultado += "<td>"+ item.val().Administrador +"</td>";
            resultado += "</tr>";
        });
    });
    setTimeout(function() {
        resultado += "</table>";
        main.innerHTML = resultado;
    }, 1000);

}




function editargerencia(key) {

    var main = document.getElementById("main");

    var resultado = "";

    resultado += "<h2>Edição de nivel de Usuário</h2>";

    resultado += "<form>";

    resultado += "<p>Nome</p>";
    resultado += "<input id='nome' disabled>";
    resultado += "<p>Email</p>";
    resultado += "<input id='email' disabled>";
    
    resultado += "<p>Moderador</p>";
    resultado += "<select id='moderador' >";
    resultado +="<option>true</option>";
    resultado +="<option>false</option>";
    resultado += "</select>";
    resultado += "<p>Administrador</p>";
    resultado += "<select id='administrador' >";
    resultado +="<option>true</option>";
    resultado +="<option>false</option>";
    resultado += "</select>";

    resultado += "</form><br/>";
    resultado += "<button id='btn' name='Editar Nivel' onclick=\"editarNivel('"+key+"')\">Editar Nivel</button><br/>";
    resultado += "<button id='btn' name='Gerenciar Níveis' onclick='listaUser()'>Voltar para Gerenciador de Níveis </button>"
    main.innerHTML = resultado;


    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            if (key === item.val().Chave){
                document.getElementById("nome").value = item.val().Nome;
                document.getElementById("email").value = item.val().Email;
                document.getElementById("moderador").value = item.val().Moderador;
                document.getElementById("administrador").value = item.val().Administrador;
            }
        });
    });

}



function editarNivel(key) {
    
    var moderador = document.getElementById("moderador").value;
    var administrador = document.getElementById("administrador").value;
    console.log(administrador);
    console.log(moderador);
    
        //Editando no banco
        firebase.database().ref('/Usuarios/' + key).update({
            Moderador: moderador,
            Administrador: administrador,
        });
   
        window.alert("Atualizado com sucesso!");
        editargerencia(key)
    } 

