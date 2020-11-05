import React from 'react';
import Routes from './routes';
import LoginHospedeProvider from './contexts/loginHospede'
import './assets/styles/global.css';
import './App.css';

function App() {
  return (
    <LoginHospedeProvider>
        <Routes />
    </LoginHospedeProvider>
  );
}

export default App;
