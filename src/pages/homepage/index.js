import React from 'react';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/Rodape';
import './styles.css';

import standardCasal from '../../assets/images/room_example.jpg';
import standardDuplo from '../../assets/images/room_example.jpg';
import luxoCasal from '../../assets/images/room_example.jpg';
import luxoDuplo from '../../assets/images/room_example.jpg';
import mapa from '../../assets/images/map_example.jpg';


function HomePage() {
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
                                <input type="number" id="adulto" name="adulto" min="1" max="3" />
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="crianca">Crianças</label>
                                <input type="number" id="crianca" name="crianca" min="1" max="3" />
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="date-in">Check-in</label>
                                <input type="date" id="date-in" />
                            </div>

                            <div className="input-bloco">
                                <label htmlFor="date-out">Check-out</label>
                                <input type="date" id="date-out" />
                            </div>
                            <button id="submit" type="submit">RESERVAR</button>
                        </form>
                    </div>

                    <div className="quartos">
                        <h1 id="quartos">Quartos</h1>

                        <sectioin className="quartos-board">
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
                        </sectioin>
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
            <Rodape />
        </div>
    )
}

export default HomePage;