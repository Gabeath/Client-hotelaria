import React from 'react';
import Cabecalho from '../components/cabecalho/index';
import Rodape from '../components/Rodape';
import CaixaDeFormularioDeReserva from '../components/CaixaDeFormularioDeReserva';

function ConfirmarReserva () {
    return (
        <div>
            <Cabecalho />
            <CaixaDeFormularioDeReserva />
            <Rodape />
        </div>
    );
}
export default ConfirmarReserva;