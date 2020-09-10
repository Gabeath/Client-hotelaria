import React from 'react';
import DadosIniciaisDaReserva from './DadosIniciaisDaReserva';
import FormularioDeReserva from './FormularioDeReserva';
import '../pages/ConfirmarAlterarReserva.css'

function CaixaDeFormularioDeReserva ({dados, nome}) {
    return (
        <div className = "reserva">
            <p>
                {nome === "Cadastrar" ? "Confirmar Reserva" : "Alterar Reserva"}
            </p>
            <div className = "formulario-de-reserva">
                {nome === "Cadastrar" ? <DadosIniciaisDaReserva dados = {dados} /> : null}
                <FormularioDeReserva dados = {dados} nome = {nome} />
            </div>
        </div>
    );
}

export default CaixaDeFormularioDeReserva;