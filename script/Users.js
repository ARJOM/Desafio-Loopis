var Nome = document.getElementById("nome");
var Email = document.getElementById("email");
var Senha = document.getElementById("senha");
var ConfirmacaodeSenha = document.getElementById("senhaconfirmar");
var x = true;
var y = false;



//butões
var Cadastrar = document.getElementById("cadastrar");


//Criar conta de Email e Senha
if(Cadastrar!=null){
    
Cadastrar.addEventListener('click', function () {
    if (Senha.value==ConfirmacaodeSenha.value) {
        var Users = {
            Nome : Nome.value,
            Email : Email.value,
            Moderador: y,
            Ativo: y,
        
          };
          
                
          
          let db = firebase.database().ref().child('Usuários').push(Users);
          db.set(Users);
    firebase
    .auth()
    .createUserWithEmailAndPassword(Email.value, Senha.value)
    .then(function() {
        alert(Email.value + " - Conta cadastrada com sucesso!");
        Nome.value="";
        Email.value="";
        Senha.value="";
        ConfirmacaodeSenha.value="";
        window.location.href = "../index.html";
    
    })
    .catch(function (error) {
        // Handle Errors here.
        console.error(error.code);
        console.error(error.message);
        alert("Falha ao cadastrar, falta dados a serem preenchidos!");
        // ...
      });
    }
    else{
        alert("Senhas imcompativeis!");
    }
});

}



