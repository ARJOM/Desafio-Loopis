// Preenche tela de update
function preencheUpdate() {
    var user = firebase.auth().currentUser;
    var nome, email;
    if (user != null) {
        user.providerData.forEach(function (profile) {
            nome = profile.displayName;
            email = profile.email;
        });
    }

    var main = document.getElementById("main");

    var resultado = "<form>";
    resultado+="<h3>Email</h3><input id='novoEmail' type='email' value='"+email+"'>";
    resultado+="<h3>Nome</h3><input id='novoNome' type='text' value='"+nome+"'>";
    resultado+="<h3>Nova Senha</h3><input id='novaSenha' type='password'>";
    resultado+="<h3>Senha Atual</h3><input id='confirmaSenha' type='password'>";
    resultado+="<h3>Senha Atual</h3><input id='atualSenha' type='password'>";

    resultado+="<div class='submit'><a id='update'>Atualizar</a></div>";
    resultado+="<div class='delete'><a id='delete'>Remover</a></div>";

    resultado+="</form>";

    main.innerHTML = resultado;

    insereEnventoUpdate(document.getElementById("update"));
    insereEnventoDelete(document.getElementById("delete"));
}

// Update usuário
function insereEventoUpdate(Update){
    Update.addEventListener('click', function () {
        if (document.getElementById('novaSenha').value===document.getElementById('confirmaSenha').value) {
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
function updateUser() {
    var user = firebase.auth().currentUser;
    var nome, email, emailVerificado;
    if (user != null) {
        user.providerData.forEach(function (profile) {
            nome = profile.displayName;
            email = profile.email;
            console.log(profile.emailVerified);
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

    user.updateEmail(email).then(function() {
        // Update successful.
        window.alert("Email atualizado")
    }).catch(function(error) {
        window.alert("Email não pôde ser autualizado")
    });

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
