function criaReserva(key) {
    var data = document.getElementById("data").value;
    var horaInicio = document.getElementById("hora-inicio").value;
    var horaFim = document.getElementById("hora-entrega").value;
    console.log(horaInicio);
    if ((data !== "") && (horaInicio!=="") && (horaFim !== "")){
        if((horaInicio<horaFim) || ((horaInicio >= "07:00") && (horaInicio <= "23:00")) ){
        } else {
            window.alert("Horário Inválido");
        }
    } else{
        window.alert("Preencha todos os campos");
    }
}