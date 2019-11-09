// Update de Tipo de Espaço
function preencheUpdateTipoEspaco() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado+="<h2>alterando tipos</h2>";
    //Listando tipos de espaço
    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            console.log(item.val().TipoEspaco);
            resultado += "<a onclick=\"insereTipo('"+item.val().Chave+"')\" href='#'>";
            resultado += item.val().TipoEspaco;
            resultado +="</a>";
            resultado += "</br>";
        });
    });
    setTimeout(function() {
        main.innerHTML = resultado;
    }, 1000);

}

function insereTipo(key) {

    var main = document.getElementById("main");

    var resultado = "";

    resultado+="<h2>alterando tipo</h2>";
    resultado+="<p class='text'>Tipo de Espaço</p>";
    resultado += "<input type='text' id='tipoespaco'></br>";
    resultado += "<button value='' id='btn' onclick=\"editaTipo('"+key+"')\">Atualizar Tipo de Espaço</button>";
    resultado += "<button value='' id='btn' onclick=\"deleteTipo('"+key+"')\">Excluir Tipo de Espaço</button>";
    main.innerHTML = resultado;

    // Adicionando o nome atual do tipo de espaço
    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot){
        snapshot.forEach(function (item) {
            if (key === item.val().Chave){
                document.getElementById("tipoespaco").value = item.val().TipoEspaco;
            }
        });
    });


}

function editaTipo(key) {

    var altera = document.getElementById("tipoespaco").value;
    var existe = false;
    getTipos(tipos);

    if(altera !== "") {
        for (var i = 0; i < tipos.length; i++) {
            if (tipos[i] === altera) {
                existe = true;
            }
        }
        if (!existe) {
            //Editando no banco
            firebase.database().ref('/TiposdeEspaco/' + key).update({
                TipoEspaco: altera,
            });
            getTipos(tipos);

            window.alert("Atualizado com sucesso!");
        } else {
            window.alert("Já existe um espaço cadastrado com esse nome!");
        }
    }else{
        window.alert("Tipo de Espaço não pode ser um valor nulo!")
    }
}

function deleteTipo(key) {
    firebase.database().ref('/TiposdeEspaco/'+key).remove();
    window.alert("Tipo de espaço excluído!");
    //atualizando página para recarregar lista de tipos cdastrados
    window.location.reload();
    //TODO redirecionar o usuário para a página de update de espaço
    preencheUpdateTipoEspaco();
}

//Update de Espaço
function preencheUpdateEspaco() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado+="<h2>alterando espaços</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Nome</th><th>Local</th><th>Capacidade</th></tr>"
    //Listando Espaços na Tabela
    firebase.database().ref('Espaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            resultado += "<tr>"
            resultado += "<td><a onclick=\"insereEspaco('"+item.val().Chave+"')\" href='#'>"+ item.val().NomedoEspaco +"</a></td>";
            resultado += "<td>"+ item.val().Local +"</td>";
            resultado += "<td>"+ item.val().Capacidade +"</td>";
            resultado += "</tr>";
        });
    });
    setTimeout(function() {
        resultado += "</table>";
        main.innerHTML = resultado;
    }, 1000);
}

function insereEspaco(key) {

    var main = document.getElementById("main");

    var resultado = "";

    resultado += "<h2>Edição de Espaço</h2>";

    resultado += "<form>";
    resultado += "<p class='text'>Tipos de Espaço</p>";
    resultado += "<select id='ListadeTipodeEspaco' >";
    resultado += "</select>";
    resultado += "<p>Nome do Espaço</p>";
    resultado += "<input id='nomeespaco'>";
    resultado += "<p>Local</p>";
    resultado += "<input id='local'>";
    resultado += "<p>Capacidade</p>";
    resultado += "<input id='capacidade'>";

    resultado += "</form><br/>";
    resultado += "<button id='btn' name='editarEspaco' onclick=\"editaEspaco('"+key+"')\">Editar Espaço</button>";
    resultado += "<button id='btn' name='deletarEspaco' onclick=\"deleteEspaco('"+key+"')\">Deletar Espaço</button>";

    main.innerHTML = resultado;

    selcionarOption();

    firebase.database().ref('Espaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            if (key === item.val().Chave){
                document.getElementById("nomeespaco").value = item.val().NomedoEspaco;
                document.getElementById("local").value = item.val().Local;
                document.getElementById("capacidade").value = item.val().Capacidade;
            }
        });
    });

}

function selcionarOption(){
    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot){
        snapshot.forEach(function (item){
            var Option = document.createElement("option");
            Option.innerHTML = item.val().TipoEspaco;
            Option.setAttribute("value", item.val().Chave);
            document.getElementById("ListadeTipodeEspaco").appendChild(Option);
        })
    })
}

function editaEspaco(key) {

    var novoTipo = document.getElementById("ListadeTipodeEspaco").value;
    var novoNome = document.getElementById("nomeespaco").value;
    var novoLocal = document.getElementById("local").value;
    var novaCapacidade = document.getElementById("capacidade").value;
    if (novoNome !== "") {
        //Editando no banco
        firebase.database().ref('/Espaco/' + key).update({
            TipoEspaco: novoTipo,
            NomedoEspaco: novoNome,
            Local: novoLocal,
            Capacidade: novaCapacidade,
        });
        window.alert("Atualizado com sucesso!");
    } else {
        window.alert("Nome não pode ser nulo");
    }
}

function deleteEspaco(key) {
    firebase.database().ref('/Espaco/'+key).remove();
    window.alert("Espaço excluído!");
    preencheUpdateEspaco();
}