import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import ConfirmarReserva from './pages/ConfirmarReserva';
import AlterarReserva from './pages/AlterarReserva';
import CadastrarFuncionarios from './pages/cadastrarfuncionarios';
import CadastrarProdutos from './pages/cadastrarproduto';
import CadastrarServicos from './pages/cadastrarservico';
import CheckIn from './pages/checkin';
import CheckOut from './pages/checkout';
import LoginHospede from './pages/loginHospede';
import SolicitarServico from './pages/solicitarservicos';
import Servicos from './pages/servicos';

import Quartos from './pages/quartos';

import './App.css';


function Routes() {
    return (
        <BrowserRouter>
            <Route path="/"  component={HomePage} exact/>
            <Route path = '/confirmarreserva' component = {ConfirmarReserva} exact/>
            <Route path = '/alterarreserva' component = {AlterarReserva} exact/>
            <Route path = '/cadastrarfuncionarios' component = {CadastrarFuncionarios} exact/>
            <Route path = '/cadastrarproduto' component = {CadastrarProdutos} exact/>
            <Route path = '/cadastrarservico' component = {CadastrarServicos} exact/>
            <Route path = '/checkin' component = {CheckIn} exact/>
            <Route path = '/checkout' component = {CheckOut} exact/>
            <Route path = '/loginHospede' component = {LoginHospede} exact/>
            <Route path = '/solicitarservico' component = {SolicitarServico} exact/>
            <Route path = '/quartos' component = {Quartos} exact/>
            <Route path = '/servicos' component = {Servicos} exact/>
        </BrowserRouter>
    )
}

export default  Routes;