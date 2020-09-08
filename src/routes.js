import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import ConfirmarReserva from './pages/ConfirmarReserva';
import AlterarReserva from './pages/AlterarReserva';

import './App.css';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/"  component={HomePage} exact/>
            <Route path = '/confirmarreserva' component = {ConfirmarReserva} exact/>
            <Route path = '/alterarreserva' component = {AlterarReserva} exact/>
        </BrowserRouter>
    )
}

export default  Routes;