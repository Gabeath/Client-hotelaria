import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import requisicao from '../../functions/requisicao'
import './styles.css'
import '../../components/Carregando.css'

import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape/Rodape'
import InputMask from "react-input-mask";
import validacao from '../../functions/validacao';

const CadastrarFuncionarios = () => {

    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [cargo, setCargo] = useState("1")
    const [cepValue, setCep] = useState('')
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [ufSelecionada, setUfSelecionada] = useState("")
    const [cidadeSelecionada, setCidadeSelecionada] = useState("")

    const history = useHistory()

    useEffect(() => {
        async function buscarUFS() {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const ufs = await response.json()
            setUfs(ufs)
        }

        buscarUFS()

    }, []);

    useEffect(() => {
        async function buscarCidades() {

            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios`)
            const cidades = await response.json()
            setCidades(cidades)

            const comboboxUF = document.getElementById('estado')
            const comboboxCity = document.getElementById('cidade')

            if (comboboxUF.value !== "")
                comboboxCity.disabled = false
            else
                comboboxCity.disabled = true
        }

        buscarCidades()

    }, [ufSelecionada]);

    const carregando = async (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("btnCadastrarFuncionario").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("btnCadastrarFuncionario").className = "btnCadastrarFuncionario";
            document.getElementById("carregando").className = "nada";
        }
    }

    function handleChange(event, id) {
        if (id === "cep") {
            setCep(event)
        }
    }

    function validar(logradouro, numero, complemento, celular) {

        //verifica se os campos estão preenchidos
        if (nome === "" ||
            cepValue === "" ||
            logradouro.value === "" ||
            numero.value === "" ||
            cidadeSelecionada === "" ||
            ufSelecionada === "" ||
            celular.value === ""
        ) {
            alert("Preencha todos os campos obrigatórios, sinalizados com *");
            return;
        }

        if (!validacao.validarNome(nome)) {
            alert("Preencha o seu nome completo");
            return;
        }

        if (!validacao.validarSenha(senha)) {
            alert("A senha deve conter entre 6 e 50 caracteres");
            return;
        }

        if (!validacao.validarTelefone(celular.value)) {
            alert("Preencha o celular corretamente: \n exemplo: (11)1111-1111 ou (11)11111-1111");
            return;
        }

        if (!validacao.validarLogradouro(logradouro.value)) {
            alert("Verifique seu endereço");
            return;
        }

        if (complemento.value) {
            if (!validacao.validarComplemento(complemento.value)) {
                alert("O complemento deve ter entre 3 e 50 caracteres");
                return;
            }
        }

        return true

    }

    async function cadastrar() {
        await carregando(true)

        let logradouro = document.getElementById("logradouro")
        let numero = document.getElementById("numero")
        let complemento = document.getElementById("complemento")
        let celular = document.getElementById("celular")


        if (validar(logradouro, numero, complemento, celular)) {
            celular = validacao.limparFormatacao(celular.value);
            let cepFormatado = validacao.limparFormatacao(cepValue)

            try {

                const res = await requisicao.post("cadastroDeFuncionario", 'nome=' + nome +
                '&senha=' + senha +
                '&cargo=' + cargo +
                '&cep=' + cepFormatado +
                '&logradouro=' + logradouro.value +
                '&numero=' + numero.value +
                '&complemento=' + complemento.value +
                '&cidade=' + cidadeSelecionada +
                '&estado=' + ufSelecionada +
                '&celular=' + celular
            )



            if (res.status === "Sucesso") {
                await carregando(false);
                alert(`Funcionário cadastrado com sucesso \n Matricula: ${res.dados.funcionario.id}`);
            }
            else{
                alert("A reserva não pôde ser realizada!\nErro: " + res.dados);
                await carregando(false);
            }


            } catch (err) {
                await carregando(false);
                console.log(err);
            }

        }
        else {
            await carregando(false)
        }



    }

    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('logradouro').value = ("");
        document.getElementById('cidade').value = ("");
        document.getElementById('estado').value = ("");
    }

    const pesquisacep = () => {
        let valor = cepValue;
        // Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep !== "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('logradouro').value = "...";

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((res) => res.json())
                    .then(async (data) => {
                        document.getElementById('logradouro').value = data.logradouro;
                        setUfSelecionada(data.uf)
                        setCidadeSelecionada(data.localidade)


                        if (data.logradouro === undefined || data.localidade === undefined || data.uf === undefined) {
                            limpa_formulário_cep();
                        }
                    })
                cep = mascaraCep(cep)
                setCep(cep)
            }
            else {
                alert("Formato de CEP inválido.");
            }
        }
    };

    function mascaraCep(valor) {
        return valor.replace(/(\d{5})(\d{3})/g, "$1-$2");
    }

    function mascararTelefone(e) {
        e.preventDefault()

        let digito = parseInt(e.key)

        if (!digito && e.key !== "0")
            return

        let tel = document.getElementById("celular")

        if (tel.value.length === 0) {
            tel.value = "(" + e.key
            return
        }

        if (tel.value.length === 3) {
            tel.value += ")" + e.key
            return
        }

        if (tel.value.length === 8) {
            tel.value += "-" + e.key
            return
        }

        if (tel.value.length === 13) {
            let substringinicio = tel.value.substring(0, 8)
            let digito = tel.value.charAt(9)
            let substringFim = tel.value.substring(10)
            tel.value = substringinicio + digito + "-" + substringFim + e.key
            return
        }

        if (tel.value.length < 14)
            tel.value += e.key

    }

    return (
        <div>
            <Cabecalho />
            <form id="cadastrarFuncionarios">

                <div className="divinterna">
                    <label htmlFor="nome">Nome completo*:</label>
                    <input id="nome" value={nome} onChange={e => setNome(e.target.value)} type="text" required></input>
                </div>

                <div className="divinterna">
                    <label htmlFor="senha">Senha*:</label>
                    <input id="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} required></input>
                </div>

                <div className="divinterna">

                    <label htmlFor="cargo" >Cargo*:</label>
                    <select id="cargo" value={cargo} onChange={(event) => setCargo(event.target.value)} className="inputdivisivel" required>
                        <option value="1">Camareira</option>
                        <option value="2">Recepcionista</option>
                        <option value="3">Atendente de restaurante'</option>

                    </select>
                </div>

                <div className="divinterna">
                    <label htmlFor="cep">CEP*:</label>
                    <InputMask id="cep" className="inputdivisivel" type="text" mask="99999-999" value={cepValue} onChange={(e) => { handleChange(e.target.value, "cep") }} onBlur={() => pesquisacep()} required></InputMask>
                </div>

                <div className="divinterna">
                    <label htmlFor="logradouro">Endereço*:</label>
                    <input id="logradouro" type="text" maxLength="100" required></input>
                </div>

                <div className="divinterna">
                    <label htmlFor="numero">Número*:</label>
                    <input id="numero" className="inputdivisivel" type="number" min="1" required></input>

                    <label htmlFor="complemento">Complemento:</label>
                    <input id="complemento" className="inputdivisivel" type="text"></input>
                </div>

                <div className="divinterna">

                    <label htmlFor="estado">Estado*:</label>
                    <select id="estado" value={ufSelecionada} onChange={(event) => setUfSelecionada(event.target.value)} className="inputdivisivel" required>
                        <option value="">Selecione o estado</option>
                        {
                            ufs.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>)
                        }
                    </select>

                    <label htmlFor="cidade">Cidade*:</label>
                    <select id="cidade" value={cidadeSelecionada} onChange={(event) => setCidadeSelecionada(event.target.value)} className="inputdivisivel" required disabled>
                        <option value="">Selecione a cidade</option>
                        {
                            cidades.map(cidade => <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option>)
                        }
                    </select>
                </div>

                <div className="divinterna">
                    <label htmlFor="celular">Celular*:</label>
                    <input id="celular" onKeyPress={mascararTelefone} className="inputdivisivel" type="text" required></input> {/*Implementar máscara do input depois*/}
                </div>

                <div id="carregando" className="nada"></div>
                <button type="button" className="btnCadastrarFuncionario" id="btnCadastrarFuncionario" onClick={() => cadastrar()}>Cadastrar</button>

            </form>
            <Rodape />
        </div>
    )
}

export default CadastrarFuncionarios
