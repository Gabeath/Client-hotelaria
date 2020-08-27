import React from 'react';
import DadosIniciaisDaReserva from './DadosIniciaisDaReserva';
import FormularioDeReserva from './FormularioDeReserva';
import '../pages/ConfirmarReserva.css'

function CaixaDeFormularioDeReserva (props) {
    return (
        <div className = "reserva">
            <p>
                Confirmar Reserva
            </p>
            <div className = "formulario-de-reserva">
                <DadosIniciaisDaReserva props = {props} />
                <FormularioDeReserva props = {props} />
            </div>
        </div>
    );
}

export default CaixaDeFormularioDeReserva;