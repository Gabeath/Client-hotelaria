import React, { useState, useEffect } from 'react';
import requisicao from '../../functions/requisicao';
import validacao from '../../functions/validacao';
import Cabecalho from '../../components/cabecalho';

import "./styles.css"

const Servicos = () => {

    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState(false);

    useEffect(() => {
        requisicao.get('consultarServicosPendentes').then(servicosPendentes => setServicos(servicosPendentes.dados));
    }, [atualizar]);

    const concluirServico = (id) => {
       
        var concluir = document.getElementById(`botao${id}`);
        var carregando = document.getElementById(`load${id}`);

        
        concluir.classList.add("hidden");
        carregando.classList.remove("hidden");
        
        requisicao.post('concluirServico', 'id=' + id).then((resposta) => {
            setAtualizar(!atualizar);
            carregando.classList.add("hidden");
            concluir.classList.remove("hidden");
            if (resposta.status === "Sucesso")
                alert("Serviço concluído com sucesso!");
            else
                alert("O serviço não pôde ser concluído!\nErro: " + resposta.dados);
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
                        <p id = {`nome${servico.id}`} name = {`nome${servico.id}`} >Descrição: {servico.nome}</p>
                        <p id = {`data${servico.id}`} name = {`data${servico.id}`} >Data: {validacao.inverterData(servico.dia)}</p>
                    </section>
                    
                    <section className = "descricao">
                        <div className="divOpcoes"></div>
                        <div className="divCarregando">
                            <button id = {`botao${servico.id}`} className={'false'}  name = {`botao${servico.id}`} onClick = {() => concluirServico(servico.id)}>Concluir Serviço</button>
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