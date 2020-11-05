import React, { useEffect, useState } from 'react';
import '../pages/ConfirmarAlterarReserva.css';
import './Carregando.css';
import InputMask from "react-input-mask";

import BotaoConfirmar from './BotaoConfirmar';
import BotaoAlterar from './BotaoAlterar';
import BotaoCancelar from './BotaoCancelar';
import validacao from '../functions/validacao';

function FormularioDeReserva({dados, nome}) {

    const [tipoDeQuarto, setTipoDeQuarto] = useState("Standard casal")
    const [cpf, setCPF] = useState("")
    const [numPassaporte, setNumPassaporte] = useState("")
    const [cepValue, setCep] = useState('')
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [ufSelecionada, setUfSelecionada] = useState("")
    const [cidadeSelecionada, setCidadeSelecionada] = useState("")

    var dadosIniciaisDaReserva = {
        id: null,
        senha: null,
        quantAdultos: null,
        quantCriancas: null,
        checkIn: null,
        checkOut: null,
        tipoDeQuarto: null,
    };
    
    useEffect(() => {
        if (dados.history.location.state !== undefined) {
            dadosIniciaisDaReserva = dados.history.location.state;
        }
    });

    useEffect(() => {
        if (nome === "Alterar") {
            console.log(dadosIniciaisDaReserva)

            /*var dados = {};
            
            dados.tipoDeQuarto = "Luxo casal";
            dados.quantAdultos = "2";
            dados.quantCriancas = "1";*/
            //dados.cpf = "065.973.578-41"
            //dados.cep = 13045903
            //dados.numPassaporte = "AB111111"
            //dados.numero = "123"
            //dados.estado = "SP"
            //dados.cidade = "Campinas";
            //dados.checkIn = "2020-05-07";
            //dados.checkOut = "2020-05-08";
            //dados.telefone = "19999999990";

            //document.getElementById("nome").setAttribute("value", dados.nome);
            setTipoDeQuarto(dadosIniciaisDaReserva.tipoDeQuarto);
            document.getElementById("quantAdultos").setAttribute("value", dadosIniciaisDaReserva.quantAdultos);
            document.getElementById("quantCriancas").setAttribute("value", dadosIniciaisDaReserva.quantCriancas);
            document.getElementById("checkIn").setAttribute("value", validacao.formatarDataSemHorario(dadosIniciaisDaReserva.checkIn));
            document.getElementById("checkOut").setAttribute("value", validacao.formatarDataSemHorario(dadosIniciaisDaReserva.checkOut));
            /*document.getElementById("botaoCPF").setAttribute("disabled", true);
            document.getElementById("botaoNumPassaporte").setAttribute("disabled", true);
            document.getElementById("escolhaCPFNumPassaporte").setAttribute("hidden", true);
            if (dados.cpf !== null) {
                document.getElementById("botaoCPF").setAttribute("checked", true);
                trocarParaCPF();
                document.getElementById("cpf").setAttribute("disabled", true);
                setCPF(dados.cpf);
            }
            else {
                document.getElementById("botaoNumPassaporte").setAttribute("checked", true);
                trocarParaPassaporte();
                document.getElementById("numPassaporte").setAttribute("disabled", true);
                setNumPassaporte(dados.numPassaporte);
            }
            setCep(dados.cep);
            document.getElementById("logradouro").setAttribute("value", dados.logradouro);
            document.getElementById("numero").setAttribute("value", dados.numero);
            document.getElementById("complemento").setAttribute("value", dados.complemento);
            setUfSelecionada(dados.estado);
            setCidadeSelecionada(dados.cidade);

            for (let i = 0; i < dados.telefone.length; i++) {
                mascararTelefone({key: dados.telefone[i], preventDefault: () => {}});
            }*/
        }
    },[]);

    useEffect(() => {
        async function buscarUFS(){
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const ufs = await response.json()
            setUfs(ufs)
        }

        if (nome === "Cadastrar")
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

        if (nome === "Cadastrar")
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
            }
            else {
                alert("Formato de CEP inválido.");
            }
        }
    };

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
        setNumPassaporte("");
        document.getElementById("labelCPF").innerHTML = "CPF*:";
        document.getElementById("labelPassaporte").innerHTML = "Passaporte:";
    }

    const trocarParaPassaporte = () => {
        document.getElementById("cpf").disabled = true;
        document.getElementById("numPassaporte").disabled = false;
        setCPF("");
        document.getElementById("labelCPF").innerHTML = "CPF:";
        document.getElementById("labelPassaporte").innerHTML = "Passaporte*:";
    }

    return (
        <div>
            <form>
                <div className="divinterna">
                    <label htmlFor="tipoDeQuarto">Tipo do quarto*:</label>
                    <select id="tipoDeQuarto" required value = {tipoDeQuarto} onChange = {(evento) => setTipoDeQuarto(evento.target.value)}>
                        <option value="Standard casal">Standard casal</option>
                        <option value="Standard duplo">Standard duplo</option>
                        <option value="Luxo casal">Luxo casal</option>
                        <option value="Luxo duplo">Luxo duplo</option>
                    </select>
                </div>

                {nome === "Cadastrar" ? 
                    (<div>
                        <div className="divinterna">
                            <label htmlFor="nome">Nome completo*:</label>
                            <input id="nome" type="text" required></input>
                        </div>

                        <div className="divinterna">
                            <label id="escolhaCPFNumPassaporte" className="grande">Selecione se deseja utilizar CPF ou número de passaporte*:</label>
                        </div>

                        <div className="divinterna">
                            <input type="radio" id="botaoCPF" name="cpfNumPassaporte" onChange={(e) => {trocarParaCPF()}}></input>
                            <label id="labelCPF" htmlFor="cpf" className="cpfNumPassaporte">CPF:</label>
                            <InputMask id="cpf" type="text" className="inputdivisivel" mask="999.999.999-99" value={cpf} onChange={(evento) => setCPF(evento.target.value)}></InputMask>
                        </div>
                        <div className="divinterna">
                            <input type="radio" id="botaoNumPassaporte" name="cpfNumPassaporte" className="cpfNumPassaporte" onChange={(e) => {trocarParaPassaporte()}}></input>
                            <label id="labelPassaporte" htmlFor="numPassaporte" className="cpfNumPassaporte">Passaporte:</label>
                            <InputMask id="numPassaporte" type="text" className="inputdivisivel" mask="aa999999" value={numPassaporte} onChange={(evento) => setNumPassaporte(evento.target.value)}></InputMask>
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
                            <select id="estado" value = {ufSelecionada} onChange = {(event) => setUfSelecionada(event.target.value)} className="inputdivisivel" required>
                                <option value = "">Selecione o estado</option>
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

                        <div className="divinterna">
                            <label htmlFor="telefone">Telefone*:</label>
                            <input id="telefone" onKeyPress = {mascararTelefone} className="inputdivisivel" type="text" required></input> {/*Implementar máscara do input depois*/}
                        </div>
                    </div>)
                    :
                    (<div>
                        <div className="divinterna">
                            <label htmlFor="quantAdultos">Quantidade de adultos*:</label>
                            <input id="quantAdultos" type="number" className="inputdivisivel" min="1" max="3" required />
                        </div>

                        <div className="divinterna">
                            <label htmlFor="quantCriancas">Quantidade de crianças*:</label>
                            <input id="quantCriancas" type="number" className="inputdivisivel" min="0" max="2" required />
                        </div>

                        <div className="divinterna">
                            <label htmlFor="checkIn">Check-in*:</label>
                            <input id="checkIn" type="date" placeholder="Date" min={validacao.diaAtual()} required />
                        </div>

                        <div className="divinterna">
                            <label htmlFor="checkOut">Check-out*:</label>
                            <input id="checkOut" type="date" placeholder="Date" min={validacao.diaAtual()} />
                        </div>
                    </div>)
                }

                {nome === "Cadastrar" ?
                    <BotaoConfirmar dados = {dados} tipoDeQuarto = {tipoDeQuarto} cpf = {cpf} numPassaporte = {numPassaporte} cep = {cepValue} cidadeSelecionada = {cidadeSelecionada} ufSelecionada = {ufSelecionada} />
                    : 
                    <div>
                        <BotaoAlterar dados = {dados} tipoDeQuarto = {tipoDeQuarto} />
                        <BotaoCancelar dados = {dados} />
                    </div>
                }
            </form>
        </div>
    );
}

export default FormularioDeReserva;