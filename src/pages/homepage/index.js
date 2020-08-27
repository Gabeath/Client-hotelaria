import React, {useState} from 'react';

import Cabecalho from '../../components/cabecalho';
import './styles.css';

import standardCasal from '../../assets/images/room_example.jpg';
import standardDuplo from '../../assets/images/room_example.jpg';
import luxoCasal from '../../assets/images/room_example.jpg';
import luxoDuplo from '../../assets/images/room_example.jpg';
import mapa from '../../assets/images/map_example.jpg';
import logoImg from '../../assets/images/Logo.png'

import {useHistory} from 'react-router-dom';

function HomePage() {
    const [adultos, setAdultos] = useState(1)
    const [criancas, setCriancas] = useState(0)
    const [check_in, setCheckIn] = useState('')
    const [check_out, setCheckOut] = useState('')

    const history = useHistory()
    const enviarReserva = () => {

        history.push({pathname:'/confirmarreserva',
        state: {adultos, criancas, check_in, check_out}})
    }

    return (
        <div id="page-home">
            <Cabecalho />

            <main id="conteudo">
                
                <section>
                    <div className="reserva">
                        <h1 id="reserva">Efetuar reserva</h1>

                        <form id="reserva-form">
                            <div className="input-bloco">
                                <label htmlFor="adulto">Adultos</label>
                                <input type="number" id="adulto" name="adulto" min="1" max="3" value={adultos} onChange={(e) => {setAdultos(e.target.value)} }/>
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="crianca">Crianças</label>
                                <input type="number" id="crianca" name="crianca" min="0" max="2" value={criancas} onChange={(e) => {setCriancas(e.target.value)} }/>
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="date-in">Check-in</label>
                                <input type="date" id="date-in"  value={check_in} onChange={(e) => {setCheckIn(e.target.value)} }/>
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="date-out">Check-out</label>
                                <input type="date" id="date-out"  value={check_out} onChange={(e) => {setCheckOut(e.target.value)} }/>
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
                <section>
                    <div class="vertical-menu">
                        <a href="#reserva">Reserva</a>
                        <a href="#quartos">Quartos</a>
                        <a href="#localizacao">Localização</a>
                    </div>
                </section>

            </main>
            <footer >

                <div className="conteudo">

                    <section className="contato">
                        <div id="slogan"><h2>Somos um hotel focados em proporcionar a melhor experiência para os nossos clientes</h2></div>
                        <section>
                            <h3>Rua XYZ, 684, Jardim America</h3>
                            <span class="material-icons">phone</span>
                            <h3>(19) 7070 - 7070</h3>
                            <span class="material-icons">email</span>
                            <h3>xyz_hotel.com</h3>
                        </section>

                    </section>


                    <div className="logo">
                        <img src={logoImg} alt="Logo Hotel XYZ" />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage;