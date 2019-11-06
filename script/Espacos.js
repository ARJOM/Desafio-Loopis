

//Variaveis 
var TipoEspaco = document.getElementById("tipoespaco");

var NomedoEspaco = document.getElementById("nomeespaco");
var Local = document.getElementById("local");
var Capacidade = document.getElementById("capacidade");
var valorTipo = document.getElementById("ListadeTipodeEspaco");

//botões
//var RegistrarEspacos = document.getElementsByName("RegistrarEspaco");
var valordoespaço = 1;


function RegistrarTiposdeEspacos(){

  alert(TipoEspaco.value);
    var TiposdeEspaco = {
        valor : valordoespaço,
        TipoEspaco: TipoEspaco.value,
    };


let db = firebase.database().ref().child("Tipos de Espaco").push(TiposdeEspaco);
db.set(TiposdeEspaco);
alert("Tipo de Espaço Adcionado com sucesso")
   
abrir();
  
}

function abrir(){
    firebase.database().ref('Tipos de Espaco').on('value', function (snapshot){
        snapshot.forEach(function (item){ 
        var Option = document.createElement("option");
        Option.innerHTML = item.val().TipoEspaco;
        document.getElementById("ListadeTipodeEspaco").appendChild(Option);
        })})          
    }
    

  
function RegistrarEspacos(){

    var Espaco = {
        NomedoEspaco : NomedoEspaco.value,
        TipoEspaco: document.getElementById("ListadeTipodeEspaco").value,
        Local: Local.value,
        Capacidade: Capacidade.value,
    };

let db = firebase.database().ref().child("Espaco").push(Espaco);
db.set(Espaco);
alert("Tipo de Espaço Adcionado com sucesso")
}
