//Verificar se a conta está logada no autenticado do firebase
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log( user );

      
    var menu = document.getElementById("menu");
    
    var opcaomenu = "<div class='menu-left' ><ul>";
    opcaomenu+="<li><a href='index.html' class='link-left'>Página Inicial</a></li>"
    opcaomenu+="<li><a onclick='preencheUpdate()' href='#' class='link-left'>Minha Conta</a></li>";
    opcaomenu+="<li><a onclick='preencheCadastroTipo()' href='#' class='link-left'>Cadastrar Tipos de Espaços</a></li>";
    opcaomenu+="<li><a onclick='preencheCadastroEspaco()' href='#' class='link-left'>Cadastrar Espaços</a></li>";
    opcaomenu+="<li><a href='#' class='link-left'>Minhas Reservas</a></li>";
    opcaomenu+="<li><a onclick='preencheUpdateEspaco()' href='#'>Editar Tipos de Espaço</a> </li>"
    //opcaomenu+="<li><a onclick='preencheCadastroEspaco()' href='#' class='link-left'class='dropdown-left'>Nova Sala</a></li>";  
   // <ul class="dropdown1">
    //<li><a href="#" class="link-left">Salas</a></li>
    //<li><a href="#" class="link-left">Laboratórios</a></li>
    //<li><a href="#" class="link-left">Ginásios</a></li>
    //</ul>
    opcaomenu+="</ul>";
    opcaomenu+="</div>";

    menu.innerHTML = opcaomenu;

   
var h1 = document.getElementById("h1");
    
    var 
    cabecalho = "<img src='../images/logo.png' alt='logo' class='logo'>";
    cabecalho+= "<a href='' class='link-header' onclick='sair()'><img src='../images/logout.png' class='logout'>Sair</a>";

    h1.innerHTML = cabecalho; 
        
        
        
        
        

    } else {
      alert("Você não está autenticado, precisa fazer o login para entrar!");
        window.location.href = "../html/login.html";
        
    }
  });
  