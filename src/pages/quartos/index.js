import React, { useState, useEffect } from 'react';
import requisicao from '../../functions/requisicao';
import Cabecalho from '../../components/cabecalho';

import "./styles.css"

const Quartos = () => {

    const [quartos, setQuartos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [comboboxProdutos, setComboboxProdutos] = useState([]);
    const [atualizar, setAtualizar] = useState(false);

    useEffect(() => {
        requisicao.get('consultarQuartos').then(quartosRetornados => setQuartos(quartosRetornados.dados));
        requisicao.get('consultarProduto').then(produtosRetornados => setProdutos(produtosRetornados.dados));
    }, [atualizar]);

    useEffect(() => {
        setComboboxProdutos(
            produtos.map(produto => <option key = {produto.id} value = {produto.id}>{produto.nome}</option>)
        );
    }, [produtos]);

    const contabilizarProduto = (idQuarto, quantProduto, idProduto) => {
       
        var adicionar = document.getElementById(`botao${idQuarto}`);
        var carregando = document.getElementById(`load${idQuarto}`);

        
        adicionar.classList.add("hidden");
        carregando.classList.remove("hidden");

        if (idProduto === "") {
            alert("Selecione o produto para adicionar à conta do quarto.");
            carregando.classList.add("hidden");
            adicionar.classList.remove("hidden");
            return;
        }
        
        requisicao.post('contabilizarProduto', 'idQuarto=' + idQuarto + '&quantProduto=' + quantProduto + '&idProduto=' + idProduto).then((resposta) => {
            setAtualizar(!atualizar);
            carregando.classList.add("hidden");
            adicionar.classList.remove("hidden");
            if (resposta.status === "Sucesso")
                alert("Produto adicionado com sucesso!");
            else
                alert("O produto não pôde ser adicionado!\nErro: " + resposta.dados);
        });
    }

    return (
        <div id="page-quartos">
            <Cabecalho />
            <div className="quartos">
            {quartos.map(quarto =>
                <div key = {quarto.id} className = "quarto">
                    <section className = "descricao">
                        <p id = {`nome${quarto.id}`} name = {`nome${quarto.id}`} >Quarto: {quarto.num_quarto}</p>
                        <p id = {`livre${quarto.id}`} name = {`livre${quarto.id}`} >Situação: {quarto.livre === true ? "Livre" : "Ocupado"}</p>
                    </section>
                    
                    <section className = "descricao">
                        <div className="divOpcoes">
                            <select id = {`combobox${quarto.id}`} name = {`combobox${quarto.id}`} className = "comboboxProdutos" required disabled = {quarto.livre}>
                                <option value = "">Selecione o produto</option>
                                {comboboxProdutos}
                            </select>
                            <label htmlFor={`quant${quarto.id}`} className = "quantidade">Quantidade:</label>
                            <select  id = {`quant${quarto.id}`} name = {`quant${quarto.id}`} className = "comboboxQuant" required disabled = {quarto.livre}>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                                <option value = "4">4</option>
                                <option value = "5">5</option>
                                <option value = "6">6</option>
                                <option value = "7">7</option>
                                <option value = "8">8</option>
                                <option value = "9">9</option>
                                <option value = "10">10</option>
                                <option value = "11">11</option>
                                <option value = "12">12</option>
                                <option value = "13">13</option>
                                <option value = "14">14</option>
                                <option value = "15">15</option>
                                <option value = "16">16</option>
                                <option value = "17">17</option>
                                <option value = "18">18</option>
                                <option value = "19">19</option>
                                <option value = "20">20</option>
                            </select>
                        </div>
                        <div className="divCarregando">
                            <button id = {`botao${quarto.id}`} className={quarto.livre.toString()}  name = {`botao${quarto.id}`} disabled = {quarto.livre} onClick = {() => contabilizarProduto(quarto.id, document.getElementById(`quant${quarto.id}`).value, document.getElementById(`combobox${quarto.id}`).value)}>Adicionar à conta</button>
                            <div className="carregando hidden" id={`load${quarto.id}`}></div>
                        </div>
                    </section>
                </div>)
            }
            </div>
        </div>
    );
}

export default Quartos;