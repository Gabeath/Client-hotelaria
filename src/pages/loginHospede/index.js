import React, { useState } from 'react';
import InputMask from "react-input-mask";
import Cabecalho from '../../components/cabecalho'
import validacao from '../../functions/validacao';
import requisicao from '../../functions/requisicao';
import '../../components/Carregando.css'
import {useHistory} from 'react-router-dom'

import {useLoginHospede} from '../../contexts/loginHospede'

const LoginHospede = () => {

    const {signIn, logged} = useLoginHospede()

    const [cpf, setCPF] = useState('')
    const [numPassaporte, setNumPassaporte] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory()

    if(logged)
        history.push('/solicitarservico')


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

    const carregando = (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("consultar").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("consultar").className = "";
            document.getElementById("carregando").className = "nada";
        }
    }


    const login = () =>{
        if ((cpf === "" && numPassaporte === "") || senha === "") {
            alert("Preencha o CPF ou número de passaporte e a senha para consultar a reserva");
            return;
        }

        if (document.getElementById("botaoCPF").checked === false && document.getElementById("botaoNumPassaporte").checked === false) {
            alert("Selecione se deseja utilizar o CPF ou o número de passaporte");
            return;
        }

        let novoCPF = null;
        if (document.getElementById("botaoCPF").checked === true) {
            novoCPF = validacao.limparFormatacao(cpf.toString())
            if (!validacao.validarCPF(novoCPF)) {
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }
        else {
            if (!validacao.validarPassaporte(numPassaporte)) {
                alert("Digite um número de passaporte válido");
                return;
            }
        }

        carregando(true);

        requisicao.post('loginHospede?cpf=' + novoCPF
            + '&numPassaporte=' + numPassaporte
            + '&senha=' + senha
        ).then(res => {
            carregando(false);
            if (res.status === "Sucesso") {
                signIn(res.dados.token, res.dados.nome);
            }
            else{
                carregando(false);
                alert("Falha ao efetuar login!\nErro: " + res.dados);
            }
        }).catch(erro => {
            carregando(false);
            console.log(erro);
        });
    }


    return (
        <div>
            <Cabecalho/>
            <div className="reserva">
                <h1 id="consultarreserva">Fazer Login</h1>
                <div className="input-bloco">
                    <label id="escolhaCPFNumPassaporte" className="">Selecione se deseja utilizar CPF ou número de passaporte e a senha gerada no momento da reserva*:</label>
                </div>

                <form id="consultar-reserva-form">

                    <div id="divCPF" className="input-bloco-consultar">
                        <input type="radio" id="botaoCPF" name="cpfNumPassaporte" onChange={(e) => {trocarParaCPF()}}></input>
                        <label id="labelCPF" htmlFor="cpf" className="cpfNumPassaporte">CPF:</label>
                        <InputMask id="cpf" type="text" className="inputdivisivel" mask="999.999.999-99" value={cpf} onChange={(evento) => setCPF(evento.target.value)}></InputMask>
                    </div>
                    <div id="divNumPassaporte" className="input-bloco-consultar">
                        <input type="radio" id="botaoNumPassaporte" name="cpfNumPassaporte" className="cpfNumPassaporte" onChange={(e) => {trocarParaPassaporte()}}></input>
                        <label id="labelPassaporte" htmlFor="numPassaporte" className="cpfNumPassaporte">Passaporte:</label>
                        <InputMask id="numPassaporte" type="text" className="inputdivisivel" mask="aa999999" value={numPassaporte} onChange={(evento) => setNumPassaporte(evento.target.value)}></InputMask>
                    </div>

                    <div className="input-bloco-consultar">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" name="senha" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                    </div>

                    <div id="carregando" className="nada"></div>
                    <button id="consultar" type="button" onClick = {login}>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default LoginHospede
