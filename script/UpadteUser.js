// Preenche tela de update
function preencheUpdate() {
    var user = firebase.auth().currentUser;
    let nome;
    var email;

    // Definindo o email do usuário logado
    if (user != null) {
        user.providerData.forEach(function (profile) {
            email = profile.email;
        });
    }

    var main = document.getElementById("main");

    var resultado = "<form>";
    resultado+="<h3>Email</h3><input id='novoEmail' type='email' value='"+email+"'>";
    resultado+="<h3>Nome</h3><input id='novoNome' type='text'>";
    resultado+="<h3>Nova Senha</h3><input id='novaSenha' type='password'>";
    resultado+="<h3>Confirmar Nova Senha</h3><input id='confirmaSenha' type='password'>";
    resultado+="<h3>Senha Atual</h3><input id='atualSenha' type='password'>";

    resultado+="<div class='submit'><a id='update'>Atualizar</a></div>";
    resultado+="<div class='delete'><a id='delete'>Remover</a></div>";

    resultado+="</form>";

    main.innerHTML = resultado;

    // Adicionando o nome do usuário logado ao valor do campo correspondente ao novo nome
    firebase.database().ref('Usuários').on('value', function (snapshot){
        snapshot.forEach(function (item) {
            if (email === item.val().Email){
                nome = item.val().Nome;
                document.getElementById("novoNome").value = nome;
            }
        });
    });

    insereEventoUpdate();
    insereEventoDelete();
}

// Update usuário
function insereEventoUpdate(){

    var user = firebase.auth().currentUser;

    var Update = document.getElementById("update");
    var novaSenha = document.getElementById("novaSenha");
    var confirmaSenha = document.getElementById("confirmaSenha");
    var novoEmail = document.getElementById("novoEmail");
    var novoNome = document.getElementById("novoNome");

    Update.addEventListener('click', function () {
        if (novaSenha.value===confirmaSenha.value) {

            var user = firebase.auth().currentUser;
            var email;
            // Definindo o email do usuário logado
            if (user != null) {
                email = user.email;
            }
            console.log(email);
            firebase.database().ref('Usuários').on('value', function (snapshot){
                snapshot.forEach(function (item) {
                    var key = Object.keys(snapshot.val())[0];
                    if (email === item.val().Email) {
                        console.log(key);
                        // if (novoEmail !== item.val().Email){
                        //     user.updateEmail(novoEmail).then(function () {
                        //
                        //     }).catch(function (error) {
                        //         window.alert("Email não pôde ser autualizado")
                        //     });
                        // }
                        if (item.val().Nome !== novoNome) {
                            firebase.database().ref('Usuários/'+key).update({
                                Nome: novoNome
                            });
                            console.log("funcionou")
                        }

                        // Atualiza senha
                        // if (novaSenha !== "") {
                        //     user.updatePassword(novaSenha).then(function () {
                        //         // Update successful.
                        //     }).catch(function (error) {
                        //         window.alert("Não foi possível atualizar a sua senha!")
                        //     });
                        // }
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

function emailLogado() {
    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
        user.providerData.forEach(function (profile) {
            email = profile.email;
            return email;
        });
    }
    return null;
}

function atualizaEmail(email) {
    var user = firebase.auth().currentUser;


}