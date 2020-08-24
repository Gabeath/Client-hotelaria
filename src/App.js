import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ConfirmarReserva from './pages/ConfirmarReserva.js';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path = '/confirmarreserva' component = {ConfirmarReserva} exact/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
