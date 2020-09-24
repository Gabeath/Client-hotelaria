import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import ConfirmarReserva from './pages/ConfirmarReserva';
import AlterarReserva from './pages/AlterarReserva';
import CadastrarFuncionarios from './pages/cadastrarfuncionarios';
import CheckIn from './pages/checkin';

import './App.css';


function Routes() {
    return (
        <BrowserRouter>
            <Route path="/"  component={HomePage} exact/>
            <Route path = '/confirmarreserva' component = {ConfirmarReserva} exact/>
            <Route path = '/alterarreserva' component = {AlterarReserva} exact/>
            <Route path = '/cadastrarfuncionarios' component = {CadastrarFuncionarios} exact/>
            <Route path = '/checkin' component = {CheckIn} exact/>
        </BrowserRouter>
    )
}

export default  Routes;