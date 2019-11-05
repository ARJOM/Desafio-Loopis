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
    resultado+="<h3>Confirmar Nova Senha</h3><input id='confirmaSenha' type='password'>";
    resultado+="<h3>Senha Atual</h3><input id='atualSenha' type='password'>";

    resultado+="<div class='submit'><a id='update'>Atualizar</a></div>";
    resultado+="<div class='delete'><a id='delete'>Remover</a></div>";

    resultado+="</form>";

    main.innerHTML = resultado;

    insereEnventoUpdate();
    insereEnventoDelete();
}
//
// // Update usuário
// function insereEventoUpdate(){
//     var Update = document.getElementById("update");
//     var novaSenha = document.getElementById("novaSenha");
//     var confirmaSenha = document.getElementById("confirmaSenha");
//     Update.addEventListener('click', function () {
//         if (novaSenha.value===confirmaSenha.value) {
//             email = emailLogado();
//             if ()
//         } else{
//             alert("Senhas imcompativeis!");
//         }
//     });
// }
// function updateUser() {
//     var user = firebase.auth().currentUser;
//     var nome, email, emailVerificado;
//     if (user != null) {
//         user.providerData.forEach(function (profile) {
//             nome = profile.displayName;
//             email = profile.email;
//             console.log(profile.emailVerified);
//         });
//     }
//
//     var main = document.getElementById("main");
//
//     // user.updateProfile({
//     //     Nome: nome,
//     // }).then(function() {
//     //     // Update successful.
//     // }).catch(function(error) {
//     //     window.alert("Nome não pôde ser atualizado")
//     // });
//
//     user.updateEmail(email).then(function() {
//         // Update successful.
//         window.alert("Email atualizado")
//     }).catch(function(error) {
//         window.alert("Email não pôde ser autualizado")
//     });
//
//     // preencheUpdate();
// }
//
// function deleteUser() {
//     var user = firebase.auth().currentUser;
//
//     user.delete().then(function() {
//         window.alert("Usuário removido com sucesso!")
//         window.location.href = 'login.html'
//     }).catch(function(error) {
//         window.alert("Não foi possível remover a sua conta!")
//     });
//
// }
//
// // Funções auxiliares
// function emailLogado() {
//     var user = firebase.auth().currentUser;
//     var email;
//     if (user != null) {
//         user.providerData.forEach(function (profile) {
//             email = profile.email;
//         });
//         return email;
//     }
//     return null;
// }