// Preenche tela de update
function preencheUpdateEspaco() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado+="<h2>alterando tipo</h2>";

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
    console.log(altera);

    firebase.database().ref('/TiposdeEspaco/'+key).update({
        TipoEspaco: altera,
    });

    window.alert("Atualizado com sucesso");
}

function deleteTipo(key) {
    firebase.database().ref('/TiposdeEspaco/'+key).remove();
    window.alert("Tipo de espaço excluído!");
    preencheUpdateEspaco();
}