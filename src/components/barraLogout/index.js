import React from 'react'
import './style.css'

import {useLoginHospede} from '../../contexts/loginHospede'

const BarraLogout = () => {

    const {nome, signOut} = useLoginHospede()
    return (
        <div className = "barra">
            <div className = "nome">Bem vindo, {nome}!</div>
            <button onClick = {signOut}>Sair</button>
        </div>
    )
}

export default BarraLogout
