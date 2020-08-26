import React from 'react';
import CaixaDeFormularioDeReserva from '../components/CaixaDeFormularioDeReserva';


function ConfirmarReserva (props) {
    let {adultos, criancas, check_in, check_out} = props.history.location.state
    console.log(adultos, criancas, check_in, check_out)
    return (
        <div id = "teste">
            <p>Testando Página de ConfirmarReserva</p>
            <CaixaDeFormularioDeReserva />
        </div>
    );
}
export default ConfirmarReserva;