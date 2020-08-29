import React from 'react';
import { Link } from 'react-router-dom';

import PhoneIcon from '@material-ui/icons/Phone';
import logoImg from '../../assets/images/Logo.png'

import './styles.css';

function Cabecalho() {
    return (
        <header className="cabecalho">
            <div className="conteudo">
                <div className="logo">
                    <Link to = "/"><img src={logoImg} alt="Logo Hotel XYZ" /></Link>
                </div>
                <section className="contato">
                    <PhoneIcon  fontSize="large"/>
                    <h1>(19) 7070 - 7070</h1>
                </section>
            </div>
        </header>
    )
}

export default Cabecalho;