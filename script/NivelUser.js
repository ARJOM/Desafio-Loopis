//Função para listar todos os usuários cadastrados inclusive o administrador;
function listaUser(){
    var main = document.getElementById("main");
    var resultado = "<div class='user-table'>";
    resultado+="<h2>usuários cadastrados</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Nome</th><th>Email</th><th>Moderador</th><th>Administrador</th></tr>"
    //Listando todos os Usuários
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
        resultado += "</div>";
        main.innerHTML = resultado;
    }, 1000);

}


//Função para editar cada usuário individualmente;
function editargerencia(key){
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
    resultado +="<option value='null'></option>";
    resultado +="<option>true</option>";
    resultado +="<option>false</option>";
    resultado += "</select>";
    resultado += "<p>Administrador</p>";
    resultado += "<select id='administrador' >";
    resultado +="<option value='null'></option>";
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


//Função enviar dados para o banco de dados realtime;
function editarNivel(key){
    
    var ModeradorNovo = document.getElementById("moderador").value;
    var AdministradorNovo = document.getElementById("administrador").value;
    //Não aceita ocupar duas funções
    if((AdministradorNovo==="true") && (ModeradorNovo==="true")){
        alert("O Usuário não pode ser Administrador e Moderador ao mesmo tempo.")

        document.getElementById("moderador").value=null;
        document.getElementById("administrador").value=null;

        //AdministradorNovo.innerHTML.value="null";
      //  AdministradorNovo.innerHTML.value="null";
        editarNivel(key);
    }
    //Igual a null, avisa!
    if((document.getElementById("moderador").value=="null") || (document.getElementById("administrador").value=="null")){
        alert("Aplique um valor para o(s) campo(s) em branco.");
    }
    //se tudo ok, entra!
    else{
        //Editando no banco
        firebase.database().ref('/Usuarios/' + key).update({
            Moderador: ModeradorNovo,
            Administrador: AdministradorNovo,
        });
        window.alert("Atualizado com sucesso!");
        editargerencia(key);
        abrir()
    }
} 

