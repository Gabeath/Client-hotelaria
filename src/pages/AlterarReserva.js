import React, {useEffect} from 'react';
import Cabecalho from '../components/cabecalho/index';
import Rodape from '../components/rodape/Rodape';
import CaixaDeFormularioDeReserva from '../components/CaixaDeFormularioDeReserva';
import { useHistory } from 'react-router-dom';

function AlterarReserva (dados) {
    
    const history = useHistory();

    useEffect(() => {
        if (dados.history.location.state === undefined) 
            history.push('/alterarreserva');
    }, []);

    return (
        <div class="confirmarAlterarReserva">
            <Cabecalho />
            <CaixaDeFormularioDeReserva dados = {dados} nome = {"Alterar"} />
            <Rodape />
        </div>
    );
}

export default AlterarReserva;