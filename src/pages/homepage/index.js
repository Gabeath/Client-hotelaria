import React, { useState } from 'react';
import InputMask from "react-input-mask";

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape/Rodape';
import Menu from '../../components/Menu'
import './styles.css';

import standardCasal from '../../assets/images/room_example.jpg';
import standardDuplo from '../../assets/images/room_example.jpg';
import luxoCasal from '../../assets/images/room_example.jpg';
import luxoDuplo from '../../assets/images/room_example.jpg';
import mapa from '../../assets/images/map_example.jpg';

import { useHistory } from 'react-router-dom';
import validacao from '../../functions/validacao';
import requisicao from '../../functions/requisicao';

import logo from '../../assets/images/menu-24px.svg';


function HomePage() {
    const [adultos, setAdultos] = useState(1)
    const [criancas, setCriancas] = useState(0)
    const [check_in, setCheckIn] = useState('')
    const [check_out, setCheckOut] = useState('')
    const [cpf, setCPF] = useState('')
    const [numPassaporte, setNumPassaporte] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory()
    const enviarReserva = () => {

        if (validacao.validarDadosIniciaisDaReserva(check_in, check_out, adultos, criancas)) {
            history.push({
                pathname: '/confirmarreserva',
                state: { adultos, criancas, check_in, check_out }
            })
        }
    }

    const consultarReserva = () => {
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
        
        requisicao.get('consultarReserva?cpf=' + novoCPF
            + '&numPassaporte=' + numPassaporte
            + '&senha=' + senha
        ).then(res => {
            if (res.status === "Sucesso") {
                console.log(res.dados);
                history.push({
                    pathname: '/alterarreserva',
                    state: { id: res.dados.id, senha, tipoDeQuarto: res.dados.quarto.tipo_de_quarto.nome, quantAdultos: res.dados.quant_adultos, quantCriancas: res.dados.quant_criancas, checkIn: res.dados.data_inicio, checkOut: res.dados.data_fim }
                });
            }
            else
                alert("A reserva não pôde ser consultada!\nErro: " + res.dados);
        }).catch(erro => {
            console.log(erro);
        });
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

    const navLinks = [
		{
			text: 'Reservar',
			path: '#reserva',
			icon: 'login'
		},
		{
			text: 'Consultar Reserva',
			path: '#consultarreserva',
			icon: 'settings'
		},
		{
			text: 'Quartos',
			path: '#quartos',
			icon: 'hotel'
		},
		{
			text: 'Localização',
			path: '#localizacao',
			icon: 'location_on'
		},
		{
			text: 'Contato',
			path: '#rodape',
			icon: 'contacts'
		}
	]

    return (
        <div id="page-home">
            <Cabecalho />
            <Menu
				navLinks={ navLinks }
				logo={ logo }
				background="#fff"
				hoverBackground="#ddd"
				linkColor="#777"
			/>
            <main id="conteudo">

                <section>
                    <div className="reserva">
                        <h1 id="reserva">Efetuar reserva</h1>

                        <form id="reserva-form">
                            <div className="input-bloco">
                                <label htmlFor="adulto">Adultos</label>
                                <input type="number" id="adulto" name="adulto" min="1" max="3" value={adultos} onChange={(e) => { setAdultos(parseInt(e.target.value)) }} />
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="crianca">Crianças</label>
                                <input type="number" id="crianca" name="crianca" min="0" max="2" value={criancas} onChange={(e) => { setCriancas(parseInt(e.target.value)) }} />
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="date-in">Check-in</label>
                                <input type="date"  placeholder="Date" id="date-in" value={check_in} onChange={(e) => { setCheckIn(e.target.value) }} min={validacao.diaAtual()} />
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="date-out">Check-out</label>
                                <input type="date" placeholder="Date" id="date-out" value={check_out} onChange={(e) => { setCheckOut(e.target.value) }} min={validacao.diaAtual()} />
                            </div>
                            <button id="submit" type="button" onClick={enviarReserva}>RESERVAR</button>
                        </form>
                    </div>

                    <div className="reserva">
                        <h1 id="consultarreserva">Consultar reserva</h1>
                        <div className="input-bloco">
                            <label id="escolhaCPFNumPassaporte" className="">Selecione se deseja utilizar CPF ou número de passaporte*:</label>
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

                            <button id="consultar" type="button" onClick={consultarReserva}>CONSULTAR</button>
                        </form>
                    </div>


                    <div className="quartos">
                        <h1 id="quartos">Quartos</h1>

                        <section className="quartos-board">
                            <figure id="standardCasal">
                                <img src={standardCasal} alt="Quarto tipo Standard Casal" />
                                <figcaption>Standard Casal</figcaption>
                            </figure>
                            <figure id="standardDuplo">
                                <img src={standardDuplo} alt="Quarto tipo Standard Duplo" />
                                <figcaption>Standard Duplo</figcaption>
                            </figure>
                            <figure id="luxoCasal">
                                <img src={luxoCasal} alt="Quarto tipo luxo Casal" />
                                <figcaption>Luxo Casal</figcaption>
                            </figure>
                            <figure id="luxoDuplo">
                                <img src={luxoDuplo} alt="Quarto tipo Luxo Duplo" />
                                <figcaption>Luxo Duplo</figcaption>
                            </figure>
                        </section>
                    </div>

                    <div className="localizacao">
                        <h1 id="localizacao">Localização</h1>

                        <h2>Rua XYZ, 684, Jardim America</h2>
                        <section className="mapa">

                            <img src={mapa} alt="Quarto tipo Standard Casal" />


                        </section>
                    </div>
                </section>
              
            </main>
            <footer id="rodape"><Rodape /></footer>
        </div>

    )
}

export default HomePage;