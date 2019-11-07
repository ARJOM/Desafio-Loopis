function preencheEspacos() {

    var main = document.getElementById("main");

    var resultado = "<div class=\"buscar\">";
    resultado+="<form class='reserva'>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Data da reserva: </p>";
    resultado+="<input type=\"date\">";
    resultado+="</div>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Horário de início: </p>";
    resultado+="<input type=\"time\" id=\"hora-inicio\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="</div>";
    resultado+="<div class=\"content\">";
    resultado+="<p class=\"text\">Horário de entrega: </p>";
    resultado+="<input type=\"time\" id=\"hora-entrega\" min=\"07:00\" max=\"22:00\" required>";
    resultado+="</div>";
    resultado+="</form>\n";
    resultado+="<input type=\"submit\" value=\"filtrar\" id=\"btn\">";
    resultado+="</div>";

    main.innerHTML = resultado;
}


//Variaveis 
var TipoEspaco = document.getElementById("tipoespaco");

var NomedoEspaco = document.getElementById("nomeespaco");
var Local = document.getElementById("local");
var Capacidade = document.getElementById("capacidade");
var valorTipo = document.getElementById("ListadeTipodeEspaco");

let tipos = [];
getTipos(tipos);


//botões
//var RegistrarEspacos = document.getElementsByName("RegistrarEspaco");
 

function RegistrarTiposdeEspacos(){

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

    var Espaco = {
        NomedoEspaco : NomedoEspaco.value,
        TipoEspaco: document.getElementById("ListadeTipodeEspaco").value,
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