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
    const [reservas, setReservas] = useState("")
    const [listaDeReservas, setListaDeReservas] = useState([])

    useEffect(() => {
        setListaDeReservas( Object.keys(reservas).map(reserva => {
            return <div id={reservas[reserva].id} key={reserva} className="dadosReserva">
                <input type="radio" id={reserva} name="radio"></input>
                <label htmlFor={reserva} className="listaDeReservas">
                    <div className="reservas">
                        <p><span>ID: </span>{reservas[reserva].id}</p>
                        <section>
                            <p><span>Data inicío: </span>{reservas[reserva].data_inicio.substring(8, 10) + "/" + reservas[reserva].data_inicio.substring(5, 7) + "/" + reservas[reserva].data_inicio.substring(0, 4)}</p>
                            <p><span>Data fim: </span>{reservas[reserva].data_fim.substring(8, 10) + "/" + reservas[reserva].data_fim.substring(5, 7) + "/" + reservas[reserva].data_fim.substring(0, 4)}</p>
                        </section>
                        <section>
                            <p><span>Adultos: </span>{reservas[reserva].quant_adultos}</p>
                            <p><span>Crianças: </span>{reservas[reserva].quant_criancas}</p>
                        </section>
                        <section id="dados_quartos">
                            <p><span>Número do quarto: </span>{reservas[reserva].quarto.num_quarto}</p>
                            <p><span>Tipo de quarto: </span>{reservas[reserva].quarto.tipo_de_quarto.nome}</p>
                        </section>
                    </div>
                </label>
            </div>

        }));
    }, [reservas]);
    

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

    const consultarReservas = () => {
        carregando(true)

        if (document.getElementById("botaoCPF").checked === false && document.getElementById("botaoNumPassaporte").checked === false) {
            carregando(false)
            alert("Selecione se deseja utilizar o CPF ou o número de passaporte");
            return;
        }

        if ((cpf === "" && numPassaporte === "")) {
            carregando(false)
            alert("Preencha o CPF ou número de passaporte para consultar as reservas");
            return;
        }

        let novoCPF = null;
        if (document.getElementById("botaoCPF").checked === true) {

            novoCPF = validacao.limparFormatacao(cpf.toString())

            if (!validacao.validarCPF(novoCPF)) {
                carregando(false)
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }
        else {
            if (!validacao.validarPassaporte(numPassaporte)) {
                carregando(false)
                alert("Digite um número de passaporte válido");
                return;
            }
        }

        requisicao.get("consultarReservas?cpf=" + novoCPF +
            "&numPassaporte=" + numPassaporte
        ).then(res => {
            carregando(false);
            if (res.status === "Sucesso") {
                setReservas(res.dados)
                document.getElementById("btnRealizarCheckIn").className = "btnRealizarCheckIn"
            }
            else
                alert("Não foi possível realizar a consulta!\n\nErro: " + res.dados);

        }).catch(erro => {
            carregando(false);
            console.log(erro);
        });

        carregando(false)
    }

    const realizarCheckIn = () => {
        var radios = document.getElementsByName("radio");

        let indice = null;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                indice = i
                break;
            }
        }

        if (indice !== null){
            requisicao.post("realizarCheckInReserva", 'id_reserva=' + reservas[indice].id
            ).then(res => {
                carregando(false);
                if (res.status === "Sucesso") {
                    alert("Check-In realizado com sucesso!");
                    document.getElementById(reservas[indice].id).remove()
                    reservas.splice(indice,1);

                    if (reservas.length === 0){
                        document.getElementById("btnRealizarCheckIn").className = "btnRealizarCheckIn nada"
                    }
                }
                else
                    alert("O check-In não pode ser realizado!\nErro: " + res.dados);
            }).catch(erro => {
                carregando(false);
                console.log(erro);
            });
        }
        else{
            alert("Selecione a reserva que deseja realizar o Check-in!");
        }
    }

    return (
        <div id="page">
            <Cabecalho />
            <form id="consultarReservas">

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

                
                
            </form>
            <div id="carregando" className="nada"></div>
            <div className="botoes">
                    <button type="button" className="btnConsultarReservas" id="btnConsultarReservas" onClick={() => consultarReservas()}>Consultar Reservas</button>
                </div>
                <section id="reservas">
                <ul>
                    {listaDeReservas}
                </ul>
            </section>
                <div className="botoes">
                    <button type="button" className="btnRealizarCheckIn nada" id="btnRealizarCheckIn" onClick={() => realizarCheckIn()} > Realizar Check-In</button>
                </div>
          
            

            <Rodape />
        </div>
    )
}

export default Checkin
