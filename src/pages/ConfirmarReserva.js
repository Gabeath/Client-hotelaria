import React, {useEffect} from 'react';
import Cabecalho from '../components/cabecalho/index';
import Rodape from '../components/Rodape';
import CaixaDeFormularioDeReserva from '../components/CaixaDeFormularioDeReserva';
import { useHistory } from 'react-router-dom';


function ConfirmarReserva (props) {
    
    const history = useHistory();

    useEffect(() => {
        if (props.history.location.state === undefined) 
            history.push('/');
    }, []);

    return (
        <div>
            <Cabecalho />
            <CaixaDeFormularioDeReserva props = {props} />
            <Rodape />
        </div>
    );
}
export default ConfirmarReserva;