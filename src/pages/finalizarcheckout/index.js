import React, { useEffect, useState } from 'react';
import Cabecalho from '../../components/cabecalho/index';
import { useHistory } from 'react-router-dom';
import requisicao from '../../functions/requisicao';
import '../../components/Carregando.css'
import "./styles.css"


function FinalizarCheckout(dados) {
    const [consumo, setConsumo] = useState([])
    console.log(consumo)

    const history = useHistory();

    useEffect(() => {
        if (dados.history.location.state === undefined){
            history.push('/checkout');
            return
        }

        requisicao.get('consultarConsumo?id=' + dados.history.location.state.idReserva
        ).then(res => {
            if (res.status === "Sucesso") {
                setConsumo(res.dados)
            }
            else
                alert("O consumo não pode ser consultado!\nErro: " + res.dados);
        }).catch(erro => {
            console.log(erro);
        });

    }, []);

    const carregando = async (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("btnFinalizarCheckOut").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("btnFinalizarCheckOut").className = "";
            document.getElementById("carregando").className = "nada";
        }
    }

    async function realizarCheckOut(){

        carregando(true)
        const response = await requisicao.postJSON('checkout', {
            id: dados.history.location.state.idReserva
        })
        carregando(false)
        if(response.status === "Sucesso"){
            alert(response.dados)
            history.push('/checkout')
        }
        else{
            alert("Erro: " + response.dados)
        }
    }    

    return (
        <div id = "finalizarCheckout">
            <Cabecalho />
            <h1>Consumo</h1>
            <div className="tabelas">
                <div className="content">
                    <table>
                    <caption>PRODUTOS</caption>
                        {consumo.produtosConsumidos && consumo.produtosConsumidos.length === 0 ? <div>
                            Nenhum produto foi registrado.
                        </div> :  <tr>
                            <th>Nome: </th>
                            <th>Custo: </th>
                            <th>Data: </th>
                            <th>Hora: </th>
                        </tr>}
                       
                        {consumo.produtosConsumidos && consumo.produtosConsumidos.map(produto => {
                            let dia = produto.data.substring(8,10)
                            let mes = produto.data.substring(5,7)
                            let ano = produto.data.substring(0,4)
                            let hora = produto.data.substring(11,19)
                            return <tr key={produto.nome}>
                                <td>{produto.nome}</td>
                                <td>R$ {produto.custo}</td>
                                <td>{`${dia}/${mes}/${ano}`}</td>
                                <td>{hora}</td>
                            </tr>
                        })}
                        
                    </table>
                    <table>
                    <caption>SERVIÇOS</caption>
                        {consumo.servicosConsumidos && consumo.servicosConsumidos.length === 0 ? <div>
                            Nenhum servico foi registrado.
                        </div> :  <tr>
                            <th>Nome: </th>
                            <th>Custo: </th>
                            <th>Data: </th>
                            <th>Hora: </th>
                        </tr>}
                        {consumo.servicosConsumidos && consumo.servicosConsumidos.map(servico => {
                            let dia = servico.data.substring(8,10)
                            let mes = servico.data.substring(5,7)
                            let ano = servico.data.substring(0,4)
                            let hora = servico.data.substring(11,19)
                            return <tr key={servico.nome}>
                                <td>{servico.nome}</td>
                                <td>R$ {servico.custo}</td>
                                <td>{`${dia}/${mes}/${ano}`}</td>
                                <td>{hora}</td>
                            </tr>
                        })}
                    </table>
                </div>
            </div>
            <div className = "total"><strong>Total:</strong> R${consumo.total}</div>
            <button id = "btnFinalizarCheckOut" onClick = {realizarCheckOut}>Finalizar Checkout</button>
            <div id ="carregando"  className = "carregando nada"></div>
        </div>
    );
}

export default FinalizarCheckout;