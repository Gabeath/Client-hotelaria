import React, {useState, useEffect} from 'react'
import {useLoginHospede} from '../../contexts/loginHospede'
import {useHistory} from 'react-router-dom'
import Cabecalho from '../../components/cabecalho'
import BarraLogout from '../../components/barraLogout'
import requisicao from '../../functions/requisicao'
import "./styles.css"

const Servicos = () => {

    const {logged} = useLoginHospede()

    const history = useHistory()

    if(!logged)
        history.push('/loginHospede')

    const [servicos, setServico] = useState([])
    const [carrinho, setCarrinho] = useState([])

    useEffect(() => {
        requisicao.get('consultarServico').then(servicos => setServico(servicos.dados))
    }, [])

    function addToCart(servico){

        const jaEstaNoCarrinho = carrinho.find(item => item.id == servico.id);

        if(jaEstaNoCarrinho)
            return

        setCarrinho([...carrinho, servico])
    }

    function removeToCart(item){
        let novoArray = carrinho.filter(servico => item.id != servico.id)

        setCarrinho(novoArray)
    }

    function solicitarServicos(){
        let servicosSolicitados = []
        let qtdd;
        let continua = true

        carrinho.forEach(item => {
            qtdd = document.getElementById(item.id).value

            if(qtdd === "" || parseInt(qtdd) <= 0)
            {
                alert("Preencha as quantidades corretamente")
                continua = false
                return
            }
            servicosSolicitados.push({id: item.id, quantidade: qtdd})
        });

        if(!continua)
            return

        console.log("executou")
    }


    return (
        <div id="pageSolicitarServicos">
            <Cabecalho/>
            <BarraLogout/>
            <div className="container">
                <div className="servicos">
                    <h1>Serviços disponíveis</h1>
                    {servicos.map(servico => <div key = {servico.nome}>
                        <div>{servico.nome}</div>
                        <div>{servico.custo}</div>
                        <button onClick = {() => addToCart(servico)}>+</button>
                    </div>)}
                </div>

                <div className = "carrinho">
                    <h1>Carrinho</h1>
                    {carrinho.map(item => <div key = {item.nome}>
                        <div>{item.nome}</div>
                        <div>{item.custo}</div>
                        <label htmlFor={item.id}>Quantidade: </label>
                        <input id = {item.id} type= "number" min = "1" defaultValue = "1"/>
                        <button onClick = {() => removeToCart(item)}>X</button>
                    </div>)}
                    {carrinho.length > 0 && <button onClick = {solicitarServicos}>Solicitar Serviços</button>}
                </div>
            </div>
        </div>
    )
}

export default Servicos
