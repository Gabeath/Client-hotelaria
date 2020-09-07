import React, { useEffect, useState } from 'react';
import '../pages/ConfirmarReserva.css';
import './Carregando.css';
import InputMask from "react-input-mask";

import BotaoConfirmar from './BotaoConfirmar';

function FormularioDeReserva({dados}) {

    const [cepValue, setCep] = useState('')
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [ufSelecionada, setUfSelecionada] = useState("")
    const [cidadeSelecionada, setCidadeSelecionada] = useState("")

    useEffect(() => {
        async function buscarUFS(){
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const ufs = await response.json()
            setUfs(ufs)
        }

        buscarUFS()
        
    },[]);

    useEffect(() => {
        async function buscarCidades(){

            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios`)
            const cidades = await response.json()
            setCidades(cidades)

            const comboboxUF = document.getElementById('estado')
            const comboboxCity = document.getElementById('cidade')

            if(comboboxUF.value !== "")
                comboboxCity.disabled = false
            else
                comboboxCity.disabled = true
        }

        buscarCidades()
        
    },[ufSelecionada]);

    function handleChange(event, id) {
        if (id === "cep") {
            setCep(event)
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

    function mascararTelefone(e){
        e.preventDefault()

        let digito = parseInt(e.key)
        
        if(!digito && e.key !== "0")
            return
        
        let tel = document.getElementById("telefone")

        if(tel.value.length === 0){
            tel.value = "(" + e.key
            return
        }

        if(tel.value.length === 3){
            tel.value += ")" + e.key
            return
        }

        if(tel.value.length === 8){
            tel.value += "-" + e.key
            return
        }

        if(tel.value.length === 13){
            let substringinicio = tel.value.substring(0,8)
            let digito = tel.value.charAt(9)
            let substringFim = tel.value.substring(10)
            tel.value = substringinicio + digito + "-" + substringFim + e.key
            return
        }

        if(tel.value.length < 14)
            tel.value += e.key
        
    }

    const trocarParaCPF = () => {
        document.getElementById("cpf").disabled = false;
        document.getElementById("numPassaporte").disabled = true;
        document.getElementById("numPassaporte").value = "";
        document.getElementById("labelCPF").innerHTML = "CPF*:";
        document.getElementById("labelPassaporte").innerHTML = "Passaporte:";
    }

    const trocarParaPassaporte = () => {
        document.getElementById("cpf").disabled = true;
        document.getElementById("numPassaporte").disabled = false;
        document.getElementById("cpf").value = "";
        document.getElementById("labelCPF").innerHTML = "CPF:";
        document.getElementById("labelPassaporte").innerHTML = "Passaporte*:";
    }

    return (
        <div>
            <form>
                <div id="divinterna">
                    <label htmlFor="nome">Nome completo*:</label>
                    <input id="nome" type="text" required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="tipoDeQuarto">Tipo do quarto*:</label>
                    <select id="tipoDeQuarto" required>
                        <option value="Standard casal">Standard casal</option>
                        <option value="Standard duplo">Standard duplo</option>
                        <option value="Luxo casal">Luxo casal</option>
                        <option value="Luxo duplo">Luxo duplo</option>
                    </select>
                </div>

                <div id="divinterna">
                    <label className="grande">Selecione se deseja utilizar CPF ou número de passaporte*:</label>
                </div>

                <div id="divinterna">
                    <input type="radio" id="botaoCPF" name="cpfNumPassaporte" onChange={(e) => {trocarParaCPF()}}></input>
                    <label id="labelCPF" htmlFor="cpf" className="cpfNumPassaporte">CPF:</label>
                    <InputMask id="cpf" type="text" className="inputdivisivel" mask="999.999.999-99"></InputMask>
                </div>
                <div id="divinterna">
                    <input type="radio" id="botaoNumPassaporte" name="cpfNumPassaporte" className="cpfNumPassaporte" onChange={(e) => {trocarParaPassaporte()}}></input>
                    <label id="labelPassaporte" htmlFor="numPassaporte" className="cpfNumPassaporte">Passaporte:</label>
                    <InputMask id="numPassaporte" type="text" className="inputdivisivel" mask="aa999999"></InputMask>
                </div>

                <div id="divinterna">
                    <label htmlFor="cep">CEP*:</label>
                    <InputMask id="cep" className="inputdivisivel" type="text" mask="99999-999" value={cepValue} onChange={(e) => { handleChange(e.target.value, "cep") }} onBlur={() => pesquisacep()} required></InputMask>
                </div>

                <div id="divinterna">
                    <label htmlFor="logradouro">Endereço*:</label>
                    <input id="logradouro" type="text" maxLength="100" required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="numero">Número*:</label>
                    <input id="numero" className="inputdivisivel" type="number" min="1" required></input>

                    <label htmlFor="complemento">Complemento:</label>
                    <input id="complemento" className="inputdivisivel" type="text"></input>
                </div>

                <div id="divinterna">

                    <label htmlFor="estado">Estado*:</label>
                    <select id="estado" value = {ufSelecionada} onChange = {(event) => setUfSelecionada(event.target.value)} className="inputdivisivel" required>
                        <option value = "">Selecione o Estado</option>
                        {
                            ufs.map(uf => <option key = {uf.sigla} value = {uf.sigla}>{uf.sigla}</option>)
                        }
                    </select>

                    <label htmlFor="cidade">Cidade*:</label>
                    <select id="cidade" value = {cidadeSelecionada} onChange = {(event) => setCidadeSelecionada(event.target.value)} className="inputdivisivel" required disabled>
                        <option value="">Selecione a cidade</option>
                        {
                            cidades.map(cidade => <option key = {cidade.nome} value = {cidade.nome}>{cidade.nome}</option>)
                        }
                    </select>
                </div>

                <div id="divinterna">
                    <label htmlFor="telefone">Telefone*:</label>
                    <input id="telefone" onKeyPress = {mascararTelefone} className="inputdivisivel" type="text" required></input> {/*Implementar máscara do input depois*/}
                </div>

                <BotaoConfirmar dados = {dados} cidadeSelecionada = {cidadeSelecionada} ufSelecionada = {ufSelecionada} cep = {cepValue} />
            </form>
        </div>
    );
}

export default FormularioDeReserva;