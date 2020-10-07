import React, { useState, useEffect } from 'react'
import Cabecalho from '../../components/cabecalho'
import InputMask from "react-input-mask";
import requisicao from '../../functions/requisicao'
import '../../components/Carregando.css'
import { MdEdit, MdDelete, MdDone, MdCancel } from 'react-icons/md'

import "./styles.css"

const CadastrarProdutos = () => {

    const [nome, setNome] = useState("")
    const [custo, setCusto] = useState("")
    const [produtos, setProduto] = useState([])


    useEffect(() => {
        requisicao.get('consultarProduto').then(produtos => setProduto(produtos.dados))
    }, [])

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

    async function cadastrarProduto() {

        if (nome.length === 0) {
            alert("Preencha o nome corretamente")
            return
        }

        if (custo.length === 0 || custo.includes("_")) {
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
                console.log(res)
                setProduto(res.dados)
                setNome("");
                setCusto("");
            }
            else {
                alert("Erro ao cadastrar produto!\nErro: " + res.dados);
                await carregando(false);
            }

        } catch (err) {
            await carregando(false);
            console.log(err);
        }

    }

    function formataCusto(custo) {
        const arrays = custo.split('.')


        if (arrays[0].length === 1) {
            arrays[0] = `0${arrays[0]}`
        }

        if (!arrays[1])
            arrays.push("00")

        if (arrays[1].length === 1) {
            arrays[1] = `${arrays[1]}0`
        }

        return `${arrays[0]},${arrays[1]}`
    }

    function liberarCampo(id) {
        var custo = document.getElementById(`custo${id}`)
        var nome = document.getElementById(`nome${id}`)

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var confirmar = document.getElementById(`confirmar${id}`)
        var cancelar = document.getElementById(`cancelar${id}`)

        custo.disabled = false;
        nome.disabled = false;

        editar.classList.add("hidden")
        excluir.classList.add("hidden")
        confirmar.classList.remove("hidden")
        cancelar.classList.remove("hidden")
    }

    function cancelar(id, nome, custo) {
        var custoProduto = document.getElementById(`custo${id}`)
        var nomeProduto = document.getElementById(`nome${id}`)

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var confirmar = document.getElementById(`confirmar${id}`)
        var cancelar = document.getElementById(`cancelar${id}`)

        custoProduto.value = formataCusto(custo.toString())
        nomeProduto.value = nome

        confirmar.classList.add("hidden")
        cancelar.classList.add("hidden")

        editar.classList.remove("hidden")
        excluir.classList.remove("hidden")

        custoProduto.disabled = true
        nomeProduto.disabled = true


    }

    function preencherValores(id, nome, custo) {
        var custoProduto = document.getElementById(`custo${id}`)
        var nomeProduto = document.getElementById(`nome${id}`)

        nomeProduto.value = nome
        custoProduto.value = custo
    }

    if (produtos.length > 0)
        setTimeout(() => {
            produtos.forEach(produto => {
                preencherValores(produto.id, produto.nome, formataCusto(produto.custo.toString()))
            });
        }, 100);

    function alterarProduto(id) {

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var confirmar = document.getElementById(`confirmar${id}`)
        var cancelar = document.getElementById(`cancelar${id}`)
        var carregando = document.getElementById(`load${id}`)

        let regexCusto = /^\d{2},\d{2}$/

        var custoProduto = document.getElementById(`custo${id}`)
        var nomeProduto = document.getElementById(`nome${id}`)

        if (!regexCusto.test(custoProduto.value)) {
            alert("Preencha o custo corretamente. \n Exemplo: 10,50")
            return
        }

        if (nomeProduto.value.trim() === "") {
            alert("O nome não pode ser vazio")
            return
        }

        var custo = custoProduto.value.replace(",", ".")

        editar.classList.add("hidden")
        excluir.classList.add("hidden")
        confirmar.classList.add("hidden")
        cancelar.classList.add("hidden")
        carregando.classList.remove("hidden")

        requisicao.post('alterarProduto', 'id=' + id +
            '&nome=' + nomeProduto.value +
            '&custo=' + custo).then(res => {
                carregando.classList.add("hidden")
                if (res.status === "Sucesso") {
                    custoProduto.disabled = true
                    nomeProduto.disabled = true
                    editar.classList.remove("hidden")
                    excluir.classList.remove("hidden")
                    setProduto(res.dados)
                }
                else {
                    confirmar.classList.remove("hidden")
                    cancelar.classList.remove("hidden")
                    alert("Erro: " + res.dados)
                }
            }).catch(erro => {
                carregando.classList.add("hidden")
                console.log(erro);
            });


    }

    function excluirProduto(id, nome) {

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var carregando = document.getElementById(`load${id}`)


        var r = window.confirm(`Tem certeza que deseja excluir o produto ${nome}`);
        if (r == true) {

            editar.classList.add("hidden")
            excluir.classList.add("hidden")
            carregando.classList.remove("hidden")



           requisicao.delete(`excluirProduto/${id}`).then(res => {
            carregando.classList.add("hidden")
            if (res.status === "Sucesso") {
                setProduto(res.dados)
            }
            else {
                editar.classList.remove("hidden")
                excluir.classList.remove("hidden")
                alert("Erro: " + res.dados)
            }
        }).catch(erro => {
            carregando.classList.add("hidden")
            console.log(erro);
        });
        }
    }



    return (
        <div id="pageCadastrarProduto">
            <Cabecalho />
            <form>
                <div>
                    <p>Nome: </p>
                    <input name="nome" id="nome" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <p>Custo: R$</p>
                    <InputMask name="custo" id="custo" mask="99,99" value={custo} onChange={e => setCusto(e.target.value)} />
                </div>
                <div id="carregando" className="nada"></div>
                <button id="btnCadastrarProduto" type="button" onClick={cadastrarProduto}>Cadastrar Produto</button>
            </form>
            <div className = "produtos">
                <h1>Produtos cadastrados</h1>
            {produtos.map(produto =>
                <div key={produto.id} className="produto">
                    <input type="text" name={`nome${produto.id}`} id={`nome${produto.id}`} disabled />
                    <input type="text" disabled name={`custo${produto.id}`} id={`custo${produto.id}`} maxLength="5" />
                    <MdEdit title="Editar" id={`editar${produto.id}`} onClick={() => liberarCampo(produto.id)} />
                    <MdDelete title="Excluir" id={`excluir${produto.id}`} onClick={() => excluirProduto(produto.id, produto.nome)} />
                    <MdDone style = {{color: 'green'}}className="hidden" title="Confirmar" id={`confirmar${produto.id}`} onClick={() => alterarProduto(produto.id)} />
                    <MdCancel style = {{color: 'red'}} className="hidden" title="Cancelar" onClick={() => cancelar(produto.id, produto.nome, produto.custo)} id={`cancelar${produto.id}`} />
                    <div className="carregando hidden" id={`load${produto.id}`}></div>
                </div>)}
            </div>
        </div>
    )
}

export default CadastrarProdutos
