import React, { useState, useEffect } from 'react';
import requisicao from '../../functions/requisicao';
import Cabecalho from '../../components/cabecalho';

import "./styles.css"

const Servicos = () => {

    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState(false);

    useEffect(() => {
        requisicao.get('consultarQuartos').then(servicosPendentes => setServicos(servicosPendentes.dados));
    }, [atualizar]);

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
        <div id="page-servicos">
            <Cabecalho />
            <div className="servicos">
            {servicos.map(servico =>
                <div key = {servico.id} className = "servico">
                    <section className = "descricao">
                        <p id = {`quarto${servico.id}`} name = {`quarto${servico.id}`} >Quarto: {servico.num_quarto}</p>
                        <p id = {`livre${servico.id}`} name = {`livre${servico.id}`} >Situação: {servico.livre === true ? "Livre" : "Ocupado"}</p>
                    </section>
                    
                    <section className = "descricao">
                        <div className="divOpcoes">
                            <select id = {`combobox${servico.id}`} name = {`combobox${servico.id}`} className = "comboboxProdutos" required disabled = {servico.livre}>
                                <option value = "">Selecione o produto</option>
                            </select>
                            <label htmlFor={`quant${servico.id}`} className = "quantidade">Quantidade:</label>
                            <select  id = {`quant${servico.id}`} name = {`quant${servico.id}`} className = "comboboxQuant" required disabled = {servico.livre}>
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
                            <button id = {`botao${servico.id}`} className={servico.livre.toString()}  name = {`botao${servico.id}`} disabled = {servico.livre} onClick = {() => contabilizarProduto(servico.id, document.getElementById(`quant${servico.id}`).value, document.getElementById(`combobox${servico.id}`).value)}>Adicionar à conta</button>
                            <div className="carregando hidden" id={`load${servico.id}`}></div>
                        </div>
                    </section>
                </div>)
            }
            </div>
        </div>
    );
}

export default Servicos;