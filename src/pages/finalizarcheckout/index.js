import React, { useEffect, useState } from 'react';
import Cabecalho from '../../components/cabecalho/index';
import { useHistory } from 'react-router-dom';
import requisicao from '../../functions/requisicao';
import "./styles.css"


function FinalizarCheckout(dados) {
    const [consumo, setConsumo] = useState([])
    console.log(consumo)

    const history = useHistory();

    useEffect(() => {
        if (dados.history.location.state === undefined)
            history.push('/checkout');

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

    return (
        <div class="">
            <Cabecalho />
            <table>
                <h2>Produtos consumidos: </h2>
                <tr>
                    <th>Nome: </th>
                    <th>Custo: </th>
                    <th>Data: </th>
                    <th>Hora: </th>
                </tr>
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
                <h2>Serviços consumidos: </h2>
                <tr>
                    <th>Nome: </th>
                    <th>Custo: </th>
                    <th>Data: </th>
                    <th>Hora: </th>
                </tr>
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
            <div>Total: {consumo.total}</div>
        </div>
    );
}

export default FinalizarCheckout;