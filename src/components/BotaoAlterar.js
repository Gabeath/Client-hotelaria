import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import requisicao from '../functions/requisicao';
import validacao from '../functions/validacao';

function BotaoAlterar ({dados, tipoDeQuarto}) {
    var dadosIniciaisDaReserva = {
        id: null,
        senha: null,
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    const history = useHistory();
    
    useEffect(() => {
        if (dados.history.location.state !== undefined) {
            dadosIniciaisDaReserva = dados.history.location.state;
        }
    });

    const carregando = (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("botaoalterar").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("botaoalterar").className = "botaoReserva";
            document.getElementById("carregando").className = "nada";
        }
    }

    const alterarReserva = () => {
        carregando(true);

        let checkIn = document.getElementById("checkIn").value;
        let checkOut = document.getElementById("checkOut").value;
        let quantAdultos = document.getElementById("quantAdultos").value;
        let quantCriancas = document.getElementById("quantCriancas").value;

        if (!validacao.validarDadosIniciaisDaReserva(checkIn, checkOut, quantAdultos, quantCriancas)) {
            carregando(false);
            return;
        }

        requisicao.post("alterarReserva", 'id=' + dadosIniciaisDaReserva.id +
            '&senha=' + dadosIniciaisDaReserva.senha +
            '&quantAdultos=' + quantAdultos +
            '&quantCriancas=' + quantCriancas +
            '&dataInicio=' + checkIn +
            '&dataFim=' + checkOut +
            '&tipoDeQuarto=' + tipoDeQuarto
        ).then(res => {
            carregando(false);
            if (res.status === "Sucesso") {
                alert("Reserva alterada com sucesso!");
                history.push('/');
            }
            else
                alert("A reserva não pôde ser alterada!\nErro: " + res.dados);
        }).catch(erro => {
            carregando(false);
            console.log(erro);
        });
    }

    return (
        <div>
            <div id="carregando" className="nada"></div>
            <button id="botaoalterar" className="botaoReserva" type="button" onClick={() => alterarReserva()}>Alterar reserva</button>
        </div>
    );
}

export default BotaoAlterar;

            