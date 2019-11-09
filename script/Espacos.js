
function preencheCadastroTipo() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado += "<div class='buscar'>";
    resultado += "<h2 class='textocentralizado'>Cadastro de Tipo de Espaço</h2>";
    resultado += "<div class='buscar-box'>";
    resultado += "<div class='content'>";
    resultado += "<p class='text'>Tipo de Espaço</p>";
    resultado += "<input id='tipoespaco'>";
    resultado += "</div>";
    resultado += "<div class='botoes'>";
    resultado += "<a href='#' class='btn' onclick='RegistrarTiposdeEspacos()'>Registrar Tipo de Espaço</a>";
    resultado += "<a href='#' onclick='preencheCadastroEspaco()' class='btn' >Cadastro de Espaço</a>";
    resultado += "</div></div>";
    main.innerHTML = resultado;
}

function preencheCadastroEspaco(){
    var main = document.getElementById("main");

    var resultado = "";
    resultado += "<div class='buscar' >";
    resultado += "<h2 class='textocentralizado'>Cadastro de Espaço</h2>";
    resultado += "<form class='espaco'>";
    resultado += "<p class='text'>Tipos de Espaço</p>";
    resultado += "<select id='ListadeTipodeEspaco' >";
    resultado += "</select>";
    resultado += "<p class='text'>Nome do Espaço</p>";
    resultado += "<input id='nomeespaco'>";
    resultado += "<p class='text'>Local</p>";
    resultado += "<input id='local'>";
    resultado += "<p class='text'>Capacidade</p>";
    resultado += "<input id='capacidade'>";

    resultado += "</form>";
    resultado += "<div class='botoes'>"
    resultado += "<a href='#' class='btn' onclick='RegistrarEspacos()'>Registrar Espaço</a>";
    resultado += "<a href='#' onclick='preencheCadastroTipo()' class='btn' >Cadastro de Tipo de Espaço</a>";
    resultado += "</div>";
    resultado += "</div>";

    main.innerHTML = resultado;

    abrir();

}


//Controle de tipos cadastrados

let tipos = [];
getTipos(tipos);


//botões
//var RegistrarEspacos = document.getElementsByName("RegistrarEspaco");
 

function RegistrarTiposdeEspacos(){

    var TipoEspaco = document.getElementById("tipoespaco");
    console.log(TipoEspaco);
    var chave = firebase.database().ref().child('TiposdeEspaco').push().key;
    var TiposdeEspaco = {
        Chave: chave,
        TipoEspaco: TipoEspaco.value,
    };

    var existe = false;

    if(TipoEspaco.value !== "") {
        for (var i=0; i<tipos.length; i++){
            if (tipos[i]===TiposdeEspaco.TipoEspaco){
                existe = true;
            }
        }
        if (!existe) {
            firebase.database().ref().child("TiposdeEspaco/"+chave).set(TiposdeEspaco);
            alert("Tipo de Espaço Adcionado com sucesso");
            getTipos(tipos);
        }else {
            alert("Já existe um tipo de espaço cadastrado com esse nome");
        }
    } else{
        alert("Tipo de Espaço NÂO Adicionado!")
    }
}

function abrir(){
    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot){
        snapshot.forEach(function (item){ 
        var Option = document.createElement("option");
        Option.innerHTML = item.val().TipoEspaco;
        Option.setAttribute("value", item.val().Chave);
        document.getElementById("ListadeTipodeEspaco").appendChild(Option);
        })
    })
}
    

  
function RegistrarEspacos(){

    var NomedoEspaco = document.getElementById("nomeespaco");
    var Local = document.getElementById("local");
    var Capacidade = document.getElementById("capacidade");
    var valorTipo = document.getElementById("ListadeTipodeEspaco");
    var chave = firebase.database().ref().child('Espaco').push().key;
    var Espaco = {
        NomedoEspaco : NomedoEspaco.value,
        TipoEspaco: valorTipo.value,
        Local: Local.value,
        Capacidade: Capacidade.value,
        Chave: chave,
    };
    if (NomedoEspaco.value !== "") {
        let db = firebase.database().ref().child("Espaco/"+chave).set(Espaco);
        alert("Tipo de Espaço Adcionado com sucesso")
    } else{
        alert("Tipo de Espaço NÂO Adicionado")
    }
}

function getTipos(tipos) {
    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot){
        snapshot.forEach(function (item){
            tipos.push(item.val().TipoEspaco);
        });
    });
}