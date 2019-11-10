//Função para listar todos os usuários cadastrados ativo ou não para cadastro inclusive o moderador;
function listaUserReserva(){
    var user = firebase.auth().currentUser;
    var email = user.email;
    var main = document.getElementById("main");
    var resultado = "<div class='user-table'>";
    resultado+="<h2>Status de Usuários Para Reserva</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Nome</th><th>Email</th><th>Ativo</th></tr>"
    //Listando todos os Usuários menos o atual moderador logado.
    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            if(email!=item.val().Email){
            resultado += "<tr>"
            resultado += "<td><a onclick=\"editargerenciaReserva('"+item.val().Chave+"')\" href='#'>"+ item.val().Nome +"</a></td>";
            resultado += "<td>"+ item.val().Email +"</td>";
            resultado += "<td>"+ item.val().Ativo +"</td>";
            resultado += "</tr>";
            }
        });
    });
    setTimeout(function() {
        resultado += "</table>";
        resultado += "</div>";
        main.innerHTML = resultado;
    }, 1000);
}

//Função para editar cada usuário individualmente;
function editargerenciaReserva(key){

    var main = document.getElementById("main");
    var resultado = "<div class='user-status-box'>";
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
    resultado += "<div class='botoes'>";
    resultado += "<a class='btn' name='Editar Nivel' onclick=\"editarNiveldeReserva('"+key+"')\">Editar Status</a>";
    resultado += "<a class='btn' name='Gerenciar Níveis' onclick='listaUserReserva()'>Voltar para Status de Usuários</a>";
    resultado += "</div></div>";
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
        abrir();
} 

