//Função para reiniciar o menu a cada modificação no banco.
function abrir(){
//Verificar se a conta está logada no autenticado do firebase.
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    console.log( user );
    var user = firebase.auth().currentUser;
    var email = user.email;
    var menu = document.getElementById("menu");
    var opcaomenu = "<div class='menu-left' ><ul>";

    firebase.database().ref('Usuarios').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            //Função para menu Administrador
            if(email===item.val().Email){
                opcaomenu+="<li><a href='index.html' class='link-left'>Página Inicial</a></li>"
                opcaomenu+="<li><a onclick='preencheUpdate();closeMenu();' href='#' class='link-left'>Minha Conta</a></li>";
                opcaomenu+="<li><a onclick='MinhasReservas();closeMenu();' href='#' class='link-left' >Minhas Reservas</a></li>";


                if(item.val().Administrador==="true"){
                    opcaomenu+="<li><a onclick='listaUser();closeMenu();' href='#' class='link-left'>Gerenciamento de Níveis de Usuários</a></li>";
                    opcaomenu+="<li><a onclick='preencheCadastroTipo();closeMenu();' href='#' class='link-left'>Cadastrar Tipos de Espaços</a></li>";
                    opcaomenu+="<li><a onclick='preencheUpdateTipoEspaco();closeMenu();' href='#'>Editar Tipos de Espaço</a> </li>";
                    opcaomenu+="<li><a onclick='preencheCadastroEspaco();closeMenu();' href='#' class='link-left'>Cadastrar Espaços</a></li>";
                    opcaomenu+="<li><a onclick='preencheUpdateEspaco();closeMenu();' href='#'>Editar Espaço</a> </li>";
                }
                //Função para menu Moderador
                if (item.val().Moderador==="true"){
                    opcaomenu+="<li><a onclick='listaUserReserva();closeMenu();' href='#' class='link-left'>Gerenciamento Status de Usuários</a></li>";
                    }

                //Função para menu de ativo a reserva
                if (item.val().Ativo==="true"){
                    opcaomenu+="<li class='dropdown-left'><a href='#'> Novas Reservas</a>";
                    opcaomenu+= "<ul class='dropdown1'>";
                    firebase.database().ref('TiposdeEspaco').on('value', function (snapshot) {
                        snapshot.forEach(function (item) {
                            console.log(item.val().TipoEspaco);
                            opcaomenu += "<li><a onclick=\"preencheEspacos('"+item.val().Chave+"');closeMenu();\" href='#' class='link-left'>"+item.val().TipoEspaco+"</a></li>";
                        });
                    });
                    opcaomenu += "</ul>";
                    opcaomenu += "</li>";
                }
            }
            /*
            opcaomenu+="<li><a href='index.html' class='link-left'>Página Inicial</a></li>"
            opcaomenu+="<li><a onclick='preencheUpdate()' href='#' class='link-left'>Minha Conta</a></li>";
            opcaomenu+="<li><a onclick='preencheCadastroTipo()' href='#' class='link-left'>Cadastrar Tipos de Espaços</a></li>";
            opcaomenu+="<li><a onclick='preencheCadastroEspaco()' href='#' class='link-left'>Cadastrar Espaços</a></li>";
            opcaomenu+="<li><a onclick='listaUser()' href='#' class='link-left'>Gerenciamento de Níveis de Usuários</a></li>";
            opcaomenu+="<li><a onclick='listaUserReserva()' href='#' class='link-left'>Gerenciamento Status de Usuários</a></li>";
            opcaomenu+="<li><a href='#' class='link-left'>Minhas Reservas</a></li>";
            opcaomenu+="<li><a onclick='preencheUpdateTipoEspaco()' href='#'>Editar Tipos de Espaço</a> </li>";
            opcaomenu+="<li><a onclick='preencheUpdateEspaco()' href='#'>Editar Espaço</a> </li>";

            firebase.database().ref('TiposdeEspaco').on('value', function (snapshot) {
                snapshot.forEach(function (item) {
                  console.log(item.val().TipoEspaco);
                    opcaomenu += "<li><a onclick=\"preencheEspacos('"+item.val().Chave+"')\" href='#' class='link-left'>"+item.val().TipoEspaco+"</a></li>";
            });
        });

        */
        setTimeout(function() {
        menu.innerHTML = opcaomenu;
        }, 1250);

    

    var h1 = document.getElementById("h1");
    
    var cabecalho= "<div class='responsive-button' onclick='responsiveMenu()'>";
    cabecalho+= "<a><span></span><span></span><span></span></a>";
    cabecalho+= "</div>";
    cabecalho += "<img src='images/logo.png' alt='logo' class='logo'>";
    cabecalho+= "<a href='' class='link-header' onclick='sair()'><img src='images/logout.png' class='logout'>Sair</a>";

    h1.innerHTML = cabecalho; 
        
        
        
        });
    }); 
        

    } else {
      alert("Você não está autenticado, precisa fazer o login para entrar!");
        window.location.href = "html/login.html";
        
    }
  });
}
