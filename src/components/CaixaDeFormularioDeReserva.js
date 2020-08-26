import React from 'react';
import DadosIniciaisDaReserva from './DadosIniciaisDaReserva';
import FormularioDeReserva from './FormularioDeReserva';

function CaixaDeFormularioDeReserva () {
    return (
        <div>
            <p>
                Confirmar Reserva
            </p>
            <DadosIniciaisDaReserva />
            <FormularioDeReserva />
        </div>
    );
}

export default CaixaDeFormularioDeReserva;