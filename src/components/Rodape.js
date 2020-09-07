import React from 'react';
import logoImg from '../assets/images/Logo.png';
import './Rodape.css';

function Rodape() {
    return (
        <footer>
            <div className="conteudo">
                <section className="contato">
                    <div className="logo">
                        <img src={logoImg} alt="Logo Hotel XYZ" />
                    </div>
                    <div id="slogan"><h2>Somos um hotel focado em proporcionar a melhor experiência para os nossos clientes</h2></div>
                    <section>
                        <h3>Rua XYZ, 684, Jardim America</h3>
                        <span className="material-icons" id="phoneIcon">phone</span>
                        <h3>(19) 7070 - 7070</h3>
                        <span className="material-icons" id="emailIcon">email</span>
                        <h3>xyz_hotel.com</h3>
                    </section>
                </section>
            </div>
        </footer>
    );
}

export default Rodape;