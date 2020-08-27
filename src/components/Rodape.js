import React from 'react';
import logoImg from '../assets/images/Logo.png';

function Rodape () {
    return (
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
    );
}

export default Rodape;