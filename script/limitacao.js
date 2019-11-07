//Verificar se a conta está logada no autenticado do firebase
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log( user );

      
    var menu = document.getElementById("menu");
    
    var opcaomenu = "<div class='menu-left' ><ul>";
    opcaomenu+="<li><a href='index.html'>Página Inicial</a></li>"
    opcaomenu+="<li><a onclick='preencheUpdate()' href='#'>Minha Conta</a></li>";
    opcaomenu+="<li><a href=''>Minhas Reservas</a></li>"
    opcaomenu+="<li><a href=''>História das Reservas</a></li>";
    opcaomenu+="<li ><a  onclick='sair()' href='' >Sair</a></li>";

    opcaomenu+="</ul>";
    opcaomenu+="</div>";

    menu.innerHTML = opcaomenu;

    var sair = document.getElementById("sair");
    
    var funcaosair = "<a href='' class='link-header' onclick='sair()'><img src='../images/logout.png' class='logout'>Sair</a>";
    
    sair.innerHTML = funcaosair;

    

    
    /*
        
        
        
        
        
          
*/

    } else {
      alert("Você não está autenticado, precisa fazer o login para entrar!");
        window.location.href = "../html/login.html";
        
    }
  });
  