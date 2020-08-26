import React from 'react';
import Cabecalho from '../components/cabecalho/index';
import Rodape from '../components/Rodape';
import CaixaDeFormularioDeReserva from '../components/CaixaDeFormularioDeReserva';


function ConfirmarReserva (props) {
    let {adultos, criancas, check_in, check_out} = props.history.location.state
    console.log(adultos, criancas, check_in, check_out)
    return (
        <div>
            <Cabecalho />
            <CaixaDeFormularioDeReserva />
            <Rodape />
        </div>
    );
}
export default ConfirmarReserva;