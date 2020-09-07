import React, {useEffect} from 'react';
import iconeCalendario from '../assets/images/iconeCalendario.png';

function DadosIniciaisDaReserva ({dados}) {
    var dadosIniciaisDaReserva = {
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    function converterFormatoDeData (data) {
        return data.substring(8, 10) + "/" + data.substring(5, 7) + "/" + data.substring(0, 4);
    }

    useEffect(() => {
        if (dados.history.location.state !== undefined) {
            dadosIniciaisDaReserva = dados.history.location.state;
            document.getElementById("paragrafoAdultos").innerHTML += dadosIniciaisDaReserva.adultos;
            document.getElementById("paragrafoCriancas").innerHTML += dadosIniciaisDaReserva.criancas;
            document.getElementById("paragrafoCheckIn").innerHTML += converterFormatoDeData(dadosIniciaisDaReserva.check_in);
            document.getElementById("paragrafoCheckOut").innerHTML += converterFormatoDeData(dadosIniciaisDaReserva.check_out);
        }
    },);

    return (
        <div>
            <p>Confirme sua reserva para:</p>
            <p id = "paragrafoAdultos">Adultos: </p>
            <p id = "paragrafoCriancas">Crianças: </p>
            <p id = "paragrafoCheckIn"><img src = {iconeCalendario} alt = "Período" />Data de check-in: </p>
            <p id = "paragrafoCheckOut"><img src = {iconeCalendario} alt = "Período" />Data de check-out: </p>
        </div>
    );
}

export default DadosIniciaisDaReserva;