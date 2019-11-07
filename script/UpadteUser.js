// Preenche tela de update
function preencheUpdate() {
    var user = firebase.auth().currentUser;
    var email;

    // Definindo o email do usuário logado
    if (user != null) {
        email = user.email;
    }

    var main = document.getElementById("main");
    
    var resultado = "<div class='update'>";
    resultado+="<h2>alterar cadastro</h2>";
    resultado+= "<form>";
    resultado+="<div class='update-content' id='email'><h3>Email</h3><input id='novoEmail' type='email' value='"+email+"'></div>";
    resultado+="<div class='update-content' id='nome'><h3>Nome</h3><input id='novoNome' type='text'></div>";
    resultado+="<div class='update-content' id='newSenha'><h3>Nova Senha</h3><input id='novaSenha' type='password'></div>";
    resultado+="<div class='update-content' id='confirm'><h3>Confirmar Nova Senha</h3><input id='confirmaSenha' type='password'></div>";
    resultado+="<div class='update-content' id='SenhaAtual'><h3>Senha Atual</h3><input id='atualSenha' type='password'></div>";

    resultado+="<div class='submit'><a id='update'>salvar alterações</a></div>";
    resultado+="<div class='delete'><a id='delete'>excluir conta</a></div>";

    resultado+="</form>";
    resultado+="</div>";

    main.innerHTML = resultado;

    // Adicionando o nome do usuário logado ao valor do campo correspondente ao novo nome
    firebase.database().ref('Usuarios').on('value', function (snapshot){
        snapshot.forEach(function (item) {
            if (email === item.val().Email){
                document.getElementById("novoNome").value = item.val().Nome;
            }
        });
    });

    insereEventoUpdate();
    //insereEventoDelete();
}

// Update usuário
async function insereEventoUpdate(){

    var Update = document.getElementById("update");
    var novaSenha = document.getElementById("novaSenha");
    var confirmaSenha = document.getElementById("confirmaSenha");


    Update.addEventListener('click', function () {
        if (novaSenha.value===confirmaSenha.value) {

            var user = firebase.auth().currentUser;
            var email;
            // Definindo o email do usuário logado
            if (user != null) {
                email = user.email;
            }

            firebase.database().ref('Usuarios').on('value', function (snapshot){
                 snapshot.forEach(function (item) {
                    if (email === item.val().Email) {

                        //Definição das variáveis a serem utilizadas
                        var key = Object.keys(snapshot.val())[0];
                        var novoNome = document.getElementById("novoNome").value;

                        if ( novoEmail !== item.val().Email){
                            //Atualizando email na autenticação
                            atualizaEmail(key);
                        }
                        //Atualizando nome no banco de dados
                        if (item.val().Nome !== novoNome && novoNome !== "") {
                            firebase.database().ref('/Usuarios/'+key).update({
                                Nome: novoNome
                            });
                            alert("Nome atualizado")
                        }

                        //Atualiza senha
                        if (novaSenha !== "") {
                            atualizaSenha();
                        }
                    }
                });
            });

            user.Email = document.getElementById("novoEmail").value;
            user.Nome = document.getElementById("novoNome").value;

        } else{
            alert("Senhas imcompativeis!");
        }
    });
}

function updateUser() {
    var nome, email, emailVerificado;
    if (user != null) {
        user.providerData.forEach(function (profile) {
            email = profile.email;
        });
    }

    var main = document.getElementById("main");

    // user.updateProfile({
    //     Nome: nome,
    // }).then(function() {
    //     // Update successful.
    // }).catch(function(error) {
    //     window.alert("Nome não pôde ser atualizado")
    // });



    // preencheUpdate();
}

function deleteUser() {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
        window.alert("Usuário removido com sucesso!")
        window.location.href = 'login.html'
    }).catch(function(error) {
        window.alert("Não foi possível remover a sua conta!")
    });

}

// Funções auxiliares

function atualizaEmail(key) {

    alert("entrou na função");
    var novoEmail = document.getElementById("novoEmail").value;
    console.log(novoEmail);
    var user = firebase.auth().currentUser;
    console.log("Email logado: "+user.email);
    user.updateEmail(novoEmail).then(function () {
        //Atualizando email no banco de dados
        alert("atualizou")
        firebase.database().ref('/Usuarios/'+key).update({
            Email: novoEmail
        });
        console.log("Email atualizado");
    }).catch(function (error) {
        console.log("Email não pôde ser autualizado"+error);
    });

}

function atualizaSenha() {
    var novaSenha = document.getElementById("novaSenha").value;
    var user = firebase.auth().currentUser;
    user.updatePassword(novaSenha).then(function () {
        alert("Deu certo!")
    }).catch(function (error) {
        window.alert("Não foi possível atualizar a sua senha!")
    });

}