import React, {useEffect} from 'react';
import Cabecalho from '../components/cabecalho/index';
import Rodape from '../components/rodape/Rodape';
import CaixaDeFormularioDeReserva from '../components/CaixaDeFormularioDeReserva';
import { useHistory } from 'react-router-dom';

function ConfirmarReserva (dados) {
    
    const history = useHistory();

    useEffect(() => {
        if (dados.history.location.state === undefined) 
            history.push('/');
    }, []);

    return (
        <div>
            <Cabecalho />
            <CaixaDeFormularioDeReserva dados = {dados} nome = {"Cadastrar"} />
            <Rodape />
        </div>
    );
}

export default ConfirmarReserva;