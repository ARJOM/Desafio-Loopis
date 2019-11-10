//Verificar se a conta está logada no autenticado do firebase
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log( user );

    
    var menu = document.getElementById("menu");
   
    var opcaomenu = "<div class='menu-left' ><ul>";
    opcaomenu+="<li><a href='index.html' class='link-left' onclick='closeMenu()' >Página Inicial</a></li>"
    opcaomenu+="<li><a onclick='closeMenu();preencheUpdate();' href='#' class='link-left'>Minha Conta</a></li>";
    opcaomenu+="<li><a onclick='closeMenu();preencheCadastroTipo();' href='#' class='link-left'>Cadastrar Tipos de Espaços</a></li>";
    opcaomenu+="<li><a onclick='closeMenu();preencheCadastroEspaco();' href='#' class='link-left'>Cadastrar Espaços</a></li>";
    
    opcaomenu+="<li><a onclick='closeMenu();listaUser();' href='#' class='link-left'>Gerenciamento de Níveis de Usuários</a></li>";
    opcaomenu+="<li><a onclick='closeMenu();listaUserReserva();' href='#' class='link-left'>Gerenciamento Status de Usuários</a></li>";
    opcaomenu+="<li><a onclick='closeMenu();' href='#' class='link-left'>Minhas Reservas</a></li>";
    opcaomenu+="<li><a onclick='closeMenu();preencheUpdateTipoEspaco();' href='#'>Editar Tipos de Espaço</a> </li>";
    opcaomenu+="<li><a onclick='closeMenu();preencheUpdateEspaco();' href='#'>Editar Espaço</a> </li>";

    // <li><a href="#" class="link-left">Salas</a></li>
    // <li><a href="#" class="link-left">Laboratórios</a></li>
    // <li><a href="#" class="link-left">Ginásios</a></li>
    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            console.log(item.val().TipoEspaco);
            opcaomenu += "<li><a onclick=\"preencheEspacos('"+item.val().Chave+"')\" href='#' class='link-left'>"+item.val().TipoEspaco+"</a></li>";
        });
    });
    setTimeout(function() {
        menu.innerHTML = opcaomenu;
    }, 1250);



var h1 = document.getElementById("h1");
    
    var cabecalho= "<div class='responsive-button' onclick='responsiveMenu()'>";
    cabecalho+= "<a><span></span><span></span><span></span></a>";
    cabecalho+= "</div>";
    cabecalho += "<img src='../images/logo.png' alt='logo' class='logo'>";
    cabecalho+= "<a href='' class='link-header' onclick='sair()'><img src='../images/logout.png' class='logout'>Sair</a>";

    h1.innerHTML = cabecalho; 
        
        
        
        
        

    } else {
      alert("Você não está autenticado, precisa fazer o login para entrar!");
        window.location.href = "../html/login.html";
        
    }
  });
  