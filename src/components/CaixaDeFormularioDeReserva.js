import React from 'react';
import DadosIniciaisDaReserva from './DadosIniciaisDaReserva';
import FormularioDeReserva from './FormularioDeReserva';
import '../pages/ConfirmarReserva.css'

function CaixaDeFormularioDeReserva () {
    return (
        <div className = "reserva">
            <p>
                Confirmar Reserva
            </p>
            <div className = "formulario-de-reserva">
                <DadosIniciaisDaReserva />
                <FormularioDeReserva />
            </div>
        </div>
    );
}

export default CaixaDeFormularioDeReserva;