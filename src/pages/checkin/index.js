import React, { useState, useEffect } from 'react'
import requisicao from '../../functions/requisicao'
import './styles.css'
import '../../components/Carregando.css'

import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape/Rodape'
import InputMask from "react-input-mask";
import validacao from '../../functions/validacao';

const Checkin = () => {

    const [cpf, setCPF] = useState("")
    const [numPassaporte, setNumPassaporte] = useState("")

    const carregando = async (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("btnConsultarReservas").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("btnConsultarReservas").className = "btnConsultarReservas";
            document.getElementById("carregando").className = "nada";
        }
    }

    const trocarParaCPF = () => {
        document.getElementById("cpf").disabled = false;
        document.getElementById("numPassaporte").disabled = true;
        setNumPassaporte("");
        document.getElementById("labelCPF").innerHTML = "CPF*:";
        document.getElementById("labelPassaporte").innerHTML = "Passaporte:";
    }

    const trocarParaPassaporte = () => {
        document.getElementById("cpf").disabled = true;
        document.getElementById("numPassaporte").disabled = false;
        setCPF("");
        document.getElementById("labelCPF").innerHTML = "CPF:";
        document.getElementById("labelPassaporte").innerHTML = "Passaporte*:";
    }

    async function consultarReservas() {
        await carregando(true)

        if (document.getElementById("botaoCPF").checked === true) {
            // let cpfSemFormatacao = 
            setCPF( validacao.limparFormatacao(cpf));
            setNumPassaporte(null);
            if (!validacao.validarCPF(cpf)) {
                carregando(false);
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }
        else {
            setCPF(null);
            if (!validacao.validarPassaporte(numPassaporte)) {
                carregando(false);
                alert("Digite um número de passaporte válido");
                return;
            }
        }

        try {
            const res = await requisicao.post("consultarReservas", 'cpf=' + cpf +
                "&numPassaporte=" + numPassaporte)

            if (res.status === "Sucesso") {
                await carregando(false);
                alert(`Consulta realizada com sucesso \n`);
            }
            else {
                alert("Não foi possível realizar a consulta!\nErro: " + res.dados);
                await carregando(false);
            }


        } catch (err) {
            await carregando(false);
            console.log(err);
        }

    }



return (
    <div>
        <Cabecalho />
        <form id="Checkin">

            <div className="divinterna">
                <label id="escolhaCPFNumPassaporte" className="grande">Selecione se deseja utilizar CPF ou número de passaporte*:</label>
            </div>

            <div className="divinterna">
                <input type="radio" id="botaoCPF" name="cpfNumPassaporte" onChange={(e) => { trocarParaCPF() }}></input>
                <label id="labelCPF" htmlFor="cpf" className="cpfNumPassaporte">CPF:</label>
                <InputMask id="cpf" type="text" className="inputdivisivel" mask="999.999.999-99" value={cpf} onChange={(evento) => setCPF(evento.target.value)}></InputMask>
            </div>

            <div className="divinterna">
                <input type="radio" id="botaoNumPassaporte" name="cpfNumPassaporte" className="cpfNumPassaporte" onChange={(e) => { trocarParaPassaporte() }}></input>
                <label id="labelPassaporte" htmlFor="numPassaporte" className="cpfNumPassaporte">Passaporte:</label>
                <InputMask id="numPassaporte" type="text" className="inputdivisivel" mask="aa999999" value={numPassaporte} onChange={(evento) => setNumPassaporte(evento.target.value)}></InputMask>
            </div>

            <div id="carregando" className="nada"></div>
            <button type="button" className="btnConsultarReservas" id="btnConsultarReservas" onClick={() => consultarReservas()}>Consultar Reservas</button>


        </form>
        <Rodape />
    </div>
)
}

export default Checkin
