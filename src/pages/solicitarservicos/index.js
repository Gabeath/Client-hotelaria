import React from 'react'
import {useLoginHospede} from '../../contexts/loginHospede'
import {useHistory} from 'react-router-dom'
import Cabecalho from '../../components/cabecalho'
import BarraLogout from '../../components/barraLogout'

const Servicos = () => {

    const {logged} = useLoginHospede()

    const history = useHistory()

    if(!logged)
        history.push('/loginHospede')

    return (
        <div>
            <Cabecalho/>
            <BarraLogout/>
        </div>
    )
}

export default Servicos
