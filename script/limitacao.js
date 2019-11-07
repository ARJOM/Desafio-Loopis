//Verificar se a conta está logada no autenticado do firebase
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log( user );

      
    var menu = document.getElementById("menu");
    
    var resultado = "<div class='menu-left' ><ul>";
    resultado+="<li><a href='index.html'>Página Inicial</a></li>"
    resultado+="<li><a onclick='preencheUpdate()' href='#'>Minha Conta</a></li>";
    resultado+="<li><a href=''>Minhas Reservas</a></li>"
    resultado+="<li><a href=''>História das Reservas</a></li>";
    resultado+="<li ><a  onclick='sair()' href='' >Sair</a></li>";

    resultado+="</ul>";
    resultado+="</div>";

    menu.innerHTML = resultado;

    
    /*
        
        
        
        
        
          
*/

    } else {
      alert("Você não está autenticado, precisa fazer o login para entrar!");
        window.location.href = "../html/login.html";
        
    }
  });
  