import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import requisicao from '../functions/requisicao';
import validacao from '../functions/validacao';

function BotaoCancelar ({dados}) {
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
            document.getElementById("botaocancelar").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("botaocancelar").className = "botaoReserva";
            document.getElementById("carregando").className = "nada";
        }
    }

    const cancelarReserva = () => {
        carregando(true);

        requisicao.delete("excluirReserva", 'id=' + dadosIniciaisDaReserva.id +
            '&senha=' + dadosIniciaisDaReserva.senha
        ).then(res => {
            carregando(false);
            if (res.status === "Sucesso") {
                alert("Reserva cancelada com sucesso!");
                history.push('/');
            }
            else
                alert("A reserva não pôde ser cancelada!\nErro: " + res.dados);
        }).catch(erro => {
            carregando(false);
            console.log(erro);
        });
    }

    return (
        <div>
            <div id="carregando" className="nada"></div>
            <button id="botaocancelar" className="botaoReserva" type="button" onClick={() => cancelarReserva()}>Cancelar reserva</button>
        </div>
    );
}

export default BotaoCancelar;

            