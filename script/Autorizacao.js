//Função para listar todos os usuários cadastrados inclusive o administrador;
function listaUserReserva(){
    var main = document.getElementById("main");
    var resultado = "";
    resultado+="<h2>Usuários</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Nome</th><th>Email</th><th>Ativo</th></tr>"
    //Listando todos os Usuários
    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            resultado += "<tr>"
            resultado += "<td><a onclick=\"editargerenciaReserva('"+item.val().Chave+"')\" href='#'>"+ item.val().Nome +"</a></td>";
            resultado += "<td>"+ item.val().Email +"</td>";
            resultado += "<td>"+ item.val().Ativo +"</td>";
            resultado += "</tr>";
        });
    });
    setTimeout(function() {
        resultado += "</table>";
        main.innerHTML = resultado;
    }, 1000);
}

//Função para editar cada usuário individualmente;
function editargerenciaReserva(key){

    var main = document.getElementById("main");
    var resultado = "";
    resultado += "<h2>Edição de Status de Usuário</h2>";
    resultado += "<form>";
    resultado += "<p>Nome</p>";
    resultado += "<input id='nome' disabled>";
    resultado += "<p>Email</p>";
    resultado += "<input id='email' disabled>";
    resultado += "<p>Ativo</p>";
    resultado += "<select id='ativo' >";
    resultado +="<option>true</option>";
    resultado +="<option>false</option>";
    resultado += "</select>";
    resultado += "</select>";
    resultado += "</form><br/>";
    resultado += "<button id='btn' name='Editar Nivel' onclick=\"editarNiveldeReserva('"+key+"')\">Editar Nivel</button><br/>";
    resultado += "<button id='btn' name='Gerenciar Níveis' onclick='listaUserReserva()'>Voltar para Status de Usuários</button>"
    main.innerHTML = resultado;


    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            if (key === item.val().Chave){
                document.getElementById("nome").value = item.val().Nome;
                document.getElementById("email").value = item.val().Email;
                document.getElementById("ativo").value = item.val().Ativo;
            }
        });
    });

}


//Função enviar dados para o banco de dados realtime;
function editarNiveldeReserva(key){
    var AtivoNovo = document.getElementById("ativo").value;
    
        //Editando no banco
        firebase.database().ref('/Usuarios/' + key).update({
            Ativo: AtivoNovo,
        });
        window.alert("Atualizado com sucesso!");
        editargerenciaReserva(key)
} 

