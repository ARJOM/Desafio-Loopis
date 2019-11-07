
function preencheCadastroTipo() {

    var main = document.getElementById("main");

    var resultado = "";
    resultado += "<div class='buscar'>";
    resultado += "<div class='content'>";
    resultado += "<h2 id='textocentralizado'>Cadastro de Tipo de Espaço</h2>";
    resultado += "<p class='text'>Tipo de Espaço</p>";
    resultado += "<input id='tipoespaco'></br>";

    resultado += "<button value='' id='btn' onclick='RegistrarTiposdeEspacos()'>Registrar Tipo de Espaço</button>";
    resultado += "<a href='#' onclick='preencheCadastroEspaco()' id='btn' >Cadastro de Espaço</a>";
    resultado += "</div>";

    main.innerHTML = resultado;
}

function preencheCadastroEspaco(){
    var main = document.getElementById("main");

    var resultado = "";
    resultado += "<div class='buscar' >";
    resultado += "<div class='content'>";

    resultado += "<h2 id='textocentralizado'>Cadastro de Espaço</h2>";

    resultado += "<form class='espaco'>";
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
    resultado += "<button id='btn' name='RegistrarEspaco' onclick='RegistrarEspacos()'>Registrar Espaço</button>";
    resultado += "<a href='#' onclick='preencheCadastroTipo()' id='btn' >Cadastro de Tipo de Espaço</a>";
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
    var TiposdeEspaco = {
        
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
            let db = firebase.database().ref().child("TiposdeEspaco").push(TiposdeEspaco);
            db.set(TiposdeEspaco);
            alert("Tipo de Espaço Adcionado com sucesso");
            getTipos();
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
        Option.setAttribute("value", Object.keys(snapshot.val())[0]);
        document.getElementById("ListadeTipodeEspaco").appendChild(Option);
        })
    })
}
    

  
function RegistrarEspacos(){

    var NomedoEspaco = document.getElementById("nomeespaco");
    var Local = document.getElementById("local");
    var Capacidade = document.getElementById("capacidade");
    var valorTipo = document.getElementById("ListadeTipodeEspaco");

    var Espaco = {
        NomedoEspaco : NomedoEspaco.value,
        TipoEspaco: valorTipo.value,
        Local: Local.value,
        Capacidade: Capacidade.value,
    };
    if (NomedoEspaco.value !== "") {
        let db = firebase.database().ref().child("Espaco").push(Espaco);
        db.set(Espaco);
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