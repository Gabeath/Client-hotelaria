import React, {useState} from 'react'
import Cabecalho from '../../components/cabecalho'
import InputMask from "react-input-mask";

import "./styles.css"

const CadastrarProdutos = () => {

    const [nome, setNome] = useState("")
    const [custo, setCusto] = useState("")

    function cadastrarProduto(){
        
        if(nome.length === 0){
            alert("Preencha o nome corretamente")
            return
        }

        if(custo.length === 0 || custo.includes("_")){
            alert("Preencha o custo corretamente, com os 4 digitos")
            return
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
                    <InputMask name = "custo" id = "custo" mask = "99.99" value = {custo} onChange = {e => setCusto(e.target.value)}/>
                </div>
                <button type = "button" onClick = {cadastrarProduto}>Cadastrar Produto</button>
            </form>
        </div>
    )
}

export default CadastrarProdutos
