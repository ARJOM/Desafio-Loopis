// Update de Tipo de Espaço
function preencheUpdateTipoEspaco() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado+="<h2>alterando tipos</h2>";

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
    preencheUpdateEspaco();
}

//Update de Espaço
function preencheUpdateEspaco() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado+="<h2>alterando espaços</h2>";
    resultado += "<table>";
    resultado += "<tr><th>Nome</th><th>Local</th><th>Capacidade</th></tr>"

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

function insereTipo(key) {
    
}