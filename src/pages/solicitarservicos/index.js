import React, {useState, useEffect} from 'react'
import {useLoginHospede} from '../../contexts/loginHospede'
import {useHistory} from 'react-router-dom'
import Cabecalho from '../../components/cabecalho'
import BarraLogout from '../../components/barraLogout'
import requisicao from '../../functions/requisicao'
import '../../components/Carregando.css'
import "./styles.css"

const Servicos = () => {

    const {logged, token} = useLoginHospede()

    const history = useHistory()

    if(!logged)
        history.push('/loginHospede')

    const [total, setTotal] = useState("")
    const [servicos, setServico] = useState([])
    const [carrinho, setCarrinho] = useState([])
    const [atualizar, setAtualizar] = useState(false)

    useEffect(() => {
        requisicao.get('consultarServico').then(servicos => setServico(servicos.dados))
    }, [])

    useEffect(() => {
        let total = 0;
        let qtdd;
        carrinho.forEach(item => {
            qtdd = document.getElementById(item.id).value
            total += item.custo * qtdd
        });
        setTotal(total.toFixed(2))
    }, 
    [carrinho, atualizar])

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

    async function solicitarServicos(){

        carregando(true)

        let servicosSolicitados = []
        let qtdd;
        let continua = true

        carrinho.forEach(item => {
            qtdd = document.getElementById(item.id).value

            if(qtdd === "" || parseInt(qtdd) <= 0)
            {
                carregando(false)
                alert("Preencha as quantidades corretamente")
                continua = false
                return
            }
            servicosSolicitados.push({id: item.id, quantidade: qtdd})
        });

        if(!continua){
            carregando(false)
            return
        }
           

        const dados = {
            token, 
            servicos: servicosSolicitados 
        }

        const resposta = await requisicao.postJSON('solicitarServico', dados)
        
        carregando(false)
        if(resposta.status === "Sucesso"){
            carregando(false)
            alert("Serviços solicitados com sucesso. \n Em alguns minutos, uma camareira estará no seu quarto")
            setCarrinho([])
            setTotal("")
        }
        else{
            carregando(false)
            alert(resposta.dados)
        }
           
    }

    const carregando = async (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("btnSolicitarServicos").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("btnSolicitarServicos").className = "";
            document.getElementById("carregando").className = "nada";
        }
    }


    return (
        <div id="pageSolicitarServicos">
            <Cabecalho/>
            <BarraLogout/>
            <div className="container">
                <div className="servicos">
                    <h1>Serviços disponíveis</h1>
                    <div className = "content">
                        {servicos.map(servico => <div className = "servico" key = {servico.nome}>
                            <div><strong>Descrição: </strong>{servico.nome}</div>
                            <div><strong>Custo: </strong>R$ {servico.custo}</div>
                            <button onClick = {() => addToCart(servico)}>+</button>
                        </div>)}
                    </div>
                </div>

                <div className = "carrinho">
                    <h1>Carrinho</h1>
                    {carrinho.length === 0 && <p>O carrinho está vazio.</p>}
                    {
                       carrinho.length > 0 && <div className = "itens">
                            {carrinho.map(item => <div className = "item" key = {item.nome}>
                                <div>{item.nome}</div>
                                <div><strong>Custo: </strong>R$ {item.custo}</div>
                                <label htmlFor={item.id}>Quantidade: </label>
                                <input id = {item.id} type= "number" min = "1" defaultValue = "1" onChange = {() => setAtualizar(!atualizar)}/>
                                <button title = "Remover do carrinho" onClick = {() => removeToCart(item)}>X</button>
                            </div>)}
                            {carrinho.length > 0 && <div><strong>Total: </strong>R$ {total}</div>}
                            {carrinho.length > 0 && <button id = "btnSolicitarServicos" onClick = {solicitarServicos}>Solicitar Serviços</button>}
                            {carrinho.length > 0 && <div className="carregando nada" id = "carregando"></div>}
                           
                        </div>
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Servicos
