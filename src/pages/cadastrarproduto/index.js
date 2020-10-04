import React, {useState} from 'react'
import Cabecalho from '../../components/cabecalho'
import InputMask from "react-input-mask";
import requisicao from '../../functions/requisicao'
import '../../components/Carregando.css'

import "./styles.css"

const CadastrarProdutos = () => {

    const [nome, setNome] = useState("")
    const [custo, setCusto] = useState("")

    const carregando = async (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("btnCadastrarProduto").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("btnCadastrarProduto").className = "";
            document.getElementById("carregando").className = "nada";
        }
    }

    async function cadastrarProduto(){
        
        if(nome.length === 0){
            alert("Preencha o nome corretamente")
            return
        }

        if(custo.length === 0 || custo.includes("_")){
            alert("Preencha o custo corretamente, com os 4 dígitos")
            return
        }

        try {
            await carregando(true);
            
            const res = await requisicao.post("cadastroDeProduto", 'nome=' + nome +
            '&custo=' + custo.replace(",", "."))

            if (res.status === "Sucesso") {
                await carregando(false);
                alert("Produto cadastrado com sucesso!");
                setNome("");
                setCusto("");
            }
            else{
                alert("Erro ao cadastrar produto!\nErro: " + res.dados);
                await carregando(false);
            }

        } catch (err) {
            await carregando(false);
            console.log(err);
        }
        
    }


    


    return (
        <div id = "pageCadastrarProduto">
            <Cabecalho/>
            <form>
                <div>
                    <p>Nome: </p>
                    <input name = "nome" id = "nome" value = {nome} onChange = {e => setNome(e.target.value)}/>
                </div>
                <div>
                    <p>Custo: R$</p>
                    <InputMask name = "custo" id = "custo" mask = "99,99" value = {custo} onChange = {e => setCusto(e.target.value)}/>
                </div>
                <div id="carregando" className="nada"></div>
                <button id="btnCadastrarProduto" type = "button" onClick = {cadastrarProduto}>Cadastrar Produto</button>
            </form>
        </div>
    )
}

export default CadastrarProdutos
