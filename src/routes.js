import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import ConfirmarReserva from './pages/ConfirmarReserva';
import AlterarReserva from './pages/AlterarReserva';
import CadastrarFuncionarios from './pages/cadastrarfuncionarios';
import CadastrarProdutos from './pages/cadastrarproduto';
import CadastrarServicos from './pages/cadastrarservico';
import CheckIn from './pages/checkin';
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
            <Route path = '/quartos' component = {Quartos} exact/>
        </BrowserRouter>
    )
}

export default  Routes;