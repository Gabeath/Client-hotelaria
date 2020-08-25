import React from 'react';
import iconeCalendario from '../assets/images/iconeCalendario.png';

function DadosIniciaisDaReserva () {
    return (
        <div>
            <p>Confirme sua reserva para:</p>
            <img src = {iconeCalendario} alt = "Período"></img>
            {/* Verificar captação dos dados de outra tela depois */}
        </div>
    );
}

export default DadosIniciaisDaReserva;