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
    resultado+="<div class='update-content' id='SenhaAtual' aria-required='true'><h3>Senha Atual</h3><input id='atualSenha' type='password'></div>";

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
    insereEventoDelete();
}

// Update usuário
async function insereEventoUpdate(){

    var Update = document.getElementById("update");
    var novaSenha = document.getElementById("novaSenha");
    var confirmaSenha = document.getElementById("confirmaSenha");
    var senhaAtual = document.getElementById("atualSenha");


    Update.addEventListener('click', function () {

        var user = firebase.auth().currentUser;
        var email;
        // Definindo o email do usuário logado
        if (user != null) {
            email = user.email;
        }
        console.log("Email logado: "+email);

        firebase.auth().signInWithEmailAndPassword(email, senhaAtual.value).then(function(result) {

            if (novaSenha.value === confirmaSenha.value) {
                console.log("Senhas iguias")

                firebase.database().ref('Usuarios').on('value', function (snapshot) {
                    snapshot.forEach(function (item) {
                        console.log("Email comparado: " + item.val().Email);
                        if (email === item.val().Email) {

                            //Definição das variáveis a serem utilizadas
                            var key = item.val().Chave;
                            console.log("Chave: " + key);
                            var novoNome = document.getElementById("novoNome").value;

                            var novoEmail = document.getElementById("novoEmail").value;


                            if (novoEmail !== item.val().Email) {
                                console.log("Emails diferentes");
                                //Atualizando email na autenticação
                                atualizaEmail(key, novoEmail);
                            }

                            //Atualizando nome no banco de dados
                            if (item.val().Nome !== novoNome && novoNome !== "") {
                                console.log("Nomes diferentes");
                                // console.log(novoNome)
                                firebase.database().ref('/Usuarios/' + key).update({
                                    Nome: novoNome
                                });
                                console.log("Nome atualizado")
                            }

                            //Atualiza senha
                            if (novaSenha.value !== "") {
                                atualizaSenha();
                            }
                        }
                    });
                });

                // user.Email = document.getElementById("novoEmail").value;
                // user.Nome = document.getElementById("novoNome").value;

            } else {
                console.log("Senhas imcompativeis!");
            }
        }).catch(function (error) {
            window.alert("Senha incorreta!");

        });
        senhaAtual.value = "";
    });
}

function insereEventoDelete() {
    var Delete = document.getElementById("delete");
    Delete.addEventListener('click', function () {

        var user = firebase.auth().currentUser;
        var email;
        // Definindo o email do usuário logado
        if (user != null) {
            email = user.email;
        }
        var sure = confirm("Tem certeza que deseja excluir sua conta?");
        if (sure) {
            firebase.database().ref('Usuarios').on('value', function (snapshot) {
                snapshot.forEach(function (item) {
                    if (email === item.val().Email) {
                        deleteUser(item.val().Chave);
                    }
                });
            });
        }
    });
}

// Funções auxiliares

function atualizaEmail(key, novoEmail) {

    console.log("entrou na função"+key);
    console.log("Email para atualizar: "+novoEmail);

    var user = firebase.auth().currentUser;

    //Atualizando email no Authentication
    user.updateEmail(novoEmail).then(function () {
        //Atualizando email no banco de dados
        firebase.database().ref('/Usuarios/'+key).update({
            Email: novoEmail
        });
        // console.log("Email atualizado");
    }).catch(function (error) {
        window.alert("Email não pôde ser autualizado");
    });

}

function atualizaSenha() {
    var novaSenha = document.getElementById("novaSenha").value;
    var user = firebase.auth().currentUser;
    user.updatePassword(novaSenha).then(function (){
        console.log("Senha atualizada!")
    }).catch(function (error) {
        window.alert("Não foi possível atualizar a sua senha!")
    });

}

function deleteUser(key) {
    var user = firebase.auth().currentUser;

    user.delete().then(function () {
        firebase.database().ref('/Usuarios/'+key).remove();
    }).catch(function (error) {
        window.alert("Não foi possível remover a sua conta!");
    });

}