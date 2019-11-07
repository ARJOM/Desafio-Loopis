//Variaveis
var Nome = document.getElementById("nome");
var Email = document.getElementById("email");
var Senha = document.getElementById("senha");
var ConfirmacaodeSenha = document.getElementById("senhaconfirmar");
var x = true;
var y = false;



//Butões
var Cadastrar = document.getElementById("cadastrar");
var Login = document.getElementById("logar");

//Verificar se está na tela de Cadastro para não gerar conflitro.
if(Cadastrar!=null){

//Função para criar conta de Email e Senha no autenticador e para cadastrar dados no realtime
    Cadastrar.addEventListener('click', function () {
        if (Senha.value==ConfirmacaodeSenha.value) {
            var Users = {
                Nome : Nome.value,
                Email : Email.value,
                Moderador: y,
                Administrador: y,
                Ativo: y,
              };

        firebase
        .auth()
        .createUserWithEmailAndPassword(Email.value, Senha.value)
        .then(function() {
            let db = firebase.database().ref().child('Usuarios').push(Users);
            db.set(Users);
        alert(Email.value + " - Conta cadastrada com sucesso!");
        Nome.value="";
        Email.value="";
        Senha.value="";
        ConfirmacaodeSenha.value="";

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1000);

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


//Verificar se está na tela de Login para não gerar conflitro.
if(Login!=null){
//Função que serve para autenticar com E-mail e Senha.
    Login.addEventListener('click', function () {
        
        firebase
        .auth()
        .signInWithEmailAndPassword(Email.value, Senha.value)
        .then(function(result) {
            console.log(result);
            alert("Logado na conta " + Email.value);
            Email.value='';
            Senha.value='';
            //Com determinado tempo, o login feito com sucesso encaminha para o index.html.
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

//Função para Deslogar da conta 
function sair(){
    alert("Você está saindo da sua conta!");
  
    firebase.auth().signOut().then(function() {
    console.log('Logout');
    
  }, function(error) {
    console.error( error );
  });
}