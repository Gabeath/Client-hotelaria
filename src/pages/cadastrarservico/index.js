import React, { useState, useEffect } from 'react'
import Cabecalho from '../../components/cabecalho'
import InputMask from "react-input-mask";
import CurrencyInput from 'react-currency-masked-input'
import requisicao from '../../functions/requisicao'
import '../../components/Carregando.css'
import { MdEdit, MdDelete, MdDone, MdCancel } from 'react-icons/md'

import "./styles.css"

const CadastrarServicos = () => {

    const [nome, setNome] = useState("")
    const [custo, setCusto] = useState("0.00")
    const [servicos, setServico] = useState([])

    useEffect(() => {
        requisicao.get('consultarServico').then(servicos => setServico(servicos.dados))
    }, [])

    const carregando = async (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("btnCadastrarServico").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("btnCadastrarServico").className = "";
            document.getElementById("carregando").className = "nada";
        }
    }

    async function cadastrarServico() {

        let descricao = document.getElementById("nome").value
        let custo = document.getElementById("custo").value
        
        if (descricao.length === 0) {
            alert("Preencha a descrição corretamente")
            return
        }

        if (custo.length === 0 || custo.includes("_")) {
            alert("Preencha o custo corretamente, com os 4 dígitos")
            return
        }

        try {
            await carregando(true);

            const res = await requisicao.post("cadastroDeServico", 'nome=' + descricao +
                '&custo=' + custo.replace(",", "."))

            if (res.status === "Sucesso") {
                await carregando(false);
                alert("Serviço cadastrado com sucesso!");
                console.log(res)
                setServico(res.dados)
                setNome("");
                setCusto("");
            }
            else {
                alert("Erro ao cadastrar serviço!\nErro: " + res.dados);
                await carregando(false);
            }

        } catch (err) {
            await carregando(false);
            console.log(err);
        }
    }

    function formataCusto(custo) {
        const arrays = custo.split('.')

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
        var custoServico = document.getElementById(`custo${id}`)
        var nomeServico = document.getElementById(`nome${id}`)

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var confirmar = document.getElementById(`confirmar${id}`)
        var cancelar = document.getElementById(`cancelar${id}`)

        custoServico.value = formataCusto(custo.toString())
        nomeServico.value = nome

        confirmar.classList.add("hidden")
        cancelar.classList.add("hidden")

        editar.classList.remove("hidden")
        excluir.classList.remove("hidden")

        custoServico.disabled = true
        nomeServico.disabled = true
    }

    function preencherValores(id, nome, custo) {
        var custoServico = document.getElementById(`custo${id}`)
        var nomeServico = document.getElementById(`nome${id}`)

        nomeServico.value = nome
        custoServico.value = custo
    }

    if (servicos.length > 0) {
        setTimeout(() => {
            servicos.forEach(servico => {
                preencherValores(servico.id, servico.nome, formataCusto(servico.custo.toString()))
            });
        }, 100);
    }

    function alterarServico(id) {

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var confirmar = document.getElementById(`confirmar${id}`)
        var cancelar = document.getElementById(`cancelar${id}`)
        var carregando = document.getElementById(`load${id}`)

        let regexCusto = /^\d+,\d{2}$/

        var custoServico = document.getElementById(`custo${id}`)
        var nomeServico = document.getElementById(`nome${id}`)

        if (!regexCusto.test(custoServico.value)) {
            alert("Preencha o custo corretamente. \n Exemplo: 100,50")
            return
        }

        if (nomeServico.value.trim() === "") {
            alert("O nome não pode ser vazio")
            return
        }

        var custo = custoServico.value.replace(",", ".")

        editar.classList.add("hidden")
        excluir.classList.add("hidden")
        confirmar.classList.add("hidden")
        cancelar.classList.add("hidden")
        carregando.classList.remove("hidden")

        requisicao.post('alterarServico', 'id=' + id +
            '&nome=' + nomeServico.value +
            '&custo=' + custo).then(res => {
                carregando.classList.add("hidden")
                if (res.status === "Sucesso") {
                    custoServico.disabled = true
                    nomeServico.disabled = true
                    editar.classList.remove("hidden")
                    excluir.classList.remove("hidden")
                    setServico(res.dados)
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

    function excluirServico(id, nome) {

        var editar = document.getElementById(`editar${id}`)
        var excluir = document.getElementById(`excluir${id}`)
        var carregando = document.getElementById(`load${id}`)


        var r = window.confirm(`Tem certeza que deseja excluir o serviço ${nome}`);
        if (r == true) {

            editar.classList.add("hidden")
            excluir.classList.add("hidden")
            carregando.classList.remove("hidden")

           requisicao.delete(`excluirServico/${id}`).then(res => {
            carregando.classList.add("hidden")
            if (res.status === "Sucesso") {
                setServico(res.dados)
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

    const mascara2 = [/^\d+,\d{2}$/]
    
    const mascara = [/[0-9]/, ",", /[0-9][0-9]/]
   

    return(
        <div id="pageCadastrarServico">
            <Cabecalho />
            <form>
                <div>
                    <p>Descrição: </p>
                    <input type="text" name="nome" id="nome"/>
                </div>
                <div>
                    <p>Custo: R$</p>
                    <CurrencyInput type="text" defaultValue="0,00" separator="," placeholder="0,00" name="custo" id="custo" maxLength="6" formNoValidate="true"  className="mask" />
                </div>
                <div id="carregando" className="nada"></div>
                <button id="btnCadastrarServico" type="button" onClick={cadastrarServico}>Cadastrar Serviço</button>
            </form>
            <div className = "servicos">
                <h1>Serviços cadastrados</h1>
            {servicos.map(servico =>
                <div key={servico.id} className="servico">
                    <input type="text" name={`nome${servico.id}`} id={`nome${servico.id}`} disabled />
                    <CurrencyInput type="text" separator="," placeholder="0,00" disabled name={`custo${servico.id}`} id={`custo${servico.id}`} maxLength="6" className="mask"/>
                    <MdEdit title="Editar" id={`editar${servico.id}`} onClick={() => liberarCampo(servico.id)} />
                    <MdDelete title="Excluir" id={`excluir${servico.id}`} onClick={() => excluirServico(servico.id, servico.nome)} />
                    <MdDone style = {{color: 'green'}}className="hidden" title="Confirmar" id={`confirmar${servico.id}`} onClick={() => alterarServico(servico.id)} />
                    <MdCancel style = {{color: 'red'}} className="hidden" title="Cancelar" onClick={() => cancelar(servico.id, servico.nome, servico.custo)} id={`cancelar${servico.id}`} />
                    <div className="carregando hidden" id={`load${servico.id}`}></div>
                </div>)}
            </div>
        </div>
    )
}

export default CadastrarServicos