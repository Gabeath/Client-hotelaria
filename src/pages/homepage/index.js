import React, { useState } from 'react';

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

import logo from '../../assets/images/menu-24px.svg';


function HomePage() {
    const [adultos, setAdultos] = useState(1)
    const [criancas, setCriancas] = useState(0)
    const [check_in, setCheckIn] = useState('')
    const [check_out, setCheckOut] = useState('')

    const history = useHistory()
    const enviarReserva = () => {

        if (validacao.validarDadosIniciaisDaReserva(check_in, check_out, adultos, criancas)) {
            history.push({
                pathname: '/confirmarreserva',
                state: { adultos, criancas, check_in, check_out }
            })
        }
    }

    const navLinks = [
		{
			text: 'Reservar',
			path: '#reserva',
			icon: 'login'
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
			text: 'Alterar Reserva',
			path: 'alterarreserva',
			icon: 'settings'
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