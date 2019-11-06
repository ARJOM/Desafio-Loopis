var Nome = document.getElementById("nome");
var Email = document.getElementById("email");
var Senha = document.getElementById("senha");
var ConfirmacaodeSenha = document.getElementById("senhaconfirmar");
var x = true;
var y = false;



//butões
var Cadastrar = document.getElementById("cadastrar");
var Login = document.getElementById("logar");


//Criar conta de Email e Senha
if(Cadastrar!=null){
    
    Cadastrar.addEventListener('click', function () {
        if (Senha.value==ConfirmacaodeSenha.value) {
            var Users = {
                Nome : Nome.value,
                Email : Email.value,
                Moderador: y,
                Administrador: y,
                Ativo: x,
              };
        firebase
        .auth()
        .createUserWithEmailAndPassword(Email.value, Senha.value)
        .then(function() {
            let db = firebase.database().ref().child('Usuários').push(Users);
            db.set(Users);
        alert(Email.value + " - Conta cadastrada com sucesso!");
        Nome.value="";
        Email.value="";
        Senha.value="";
        ConfirmacaodeSenha.value="";


    })


    .catch(function (error) {
        // Handle Errors here.
        console.error(error.code);
        console.error(error.message);
        firebase.database().ref('Usuários').on('value', function (snapshot){
            snapshot.forEach(function (item){ 
        if(Email.value==item.val().Email){
            alert("Esse email já foi usado em uma conta cadastrada no Sr."); 
        }
        else{
            alert("Falha ao cadastrar, falta dados a serem preenchidos!");
        }
        // ...

            })
        }
        )})
}
    else{
        alert("Senhas imcompativeis!");
    }
})
}








//Autenticar com E-mail e Senha
if(Login!=null){

    Login.addEventListener('click', function () {
        
        firebase
        .auth()
        .signInWithEmailAndPassword(Email.value, Senha.value)
        .then(function(result) {
            console.log(result);
            alert("Logado na conta " + Email.value);
            Email.value='';
            Senha.value='';
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);
             
        
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert("Falha ao logar. O email não existe ou a senha foi digitada errada!");
    });
    
    
    });
    
    
}


function sair(){
    alert("Você está saindo da sua conta!");
  
    firebase.auth().signOut()
  .then(function() {
    console.log('Logout');
    
  }, function(error) {
    console.error( error );
  });

  }