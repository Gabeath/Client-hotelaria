import React, { useEffect, useState } from 'react';
import requisicao from '../functions/requisicao';
import '../pages/ConfirmarReserva.css';
import './Carregando.css';
import { useHistory } from 'react-router-dom';
import InputMask from "react-input-mask";

function FormularioDeReserva(props) {
    var dadosIniciaisDaReserva = {
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    const [cepValue, setCep] = useState('')
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [ufSelecionada, setUfSelecionada] = useState("")
    const [cidadeSelecionada, setCidadeSelecionada] = useState("")
    const history = useHistory();

    useEffect(() => {
        if (props.props.props.history.location.state !== undefined) {
            dadosIniciaisDaReserva = props.props.props.history.location.state;
        }
    });

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

    const carregando = (verdadeiro) => {
        if (verdadeiro) {
            document.getElementById("botaoconfirmar").className = "nada";
            document.getElementById("carregando").className = "carregando";
        }
        else {
            document.getElementById("botaoconfirmar").className = "";
            document.getElementById("carregando").className = "nada";
        }
    }

    function mascaraCep(valor) {
        return valor.replace(/(\d{5})(\d{3})/g, "\$1\-\$2");
    }

    function retirarFormatacao(campoTexto) {
        campoTexto = campoTexto.replace(/(\.|\/|\-)/g, "");
        return campoTexto
    }

    function mascararTelefone(e){
        e.preventDefault()

        let digito = parseInt(e.key)
        
        if(!digito && e.key != "0")
            return
        
        let tel = document.getElementById("telefone")

        if(tel.value.length == 0){
            tel.value = "(" + e.key
            return
        }

        if(tel.value.length == 3){
            tel.value += ")" + e.key
            return
        }

        if(tel.value.length == 8){
            tel.value += "-" + e.key
            return
        }

        if(tel.value.length == 13){
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

    const confirmarReserva = () => {
        carregando(true);

        if (document.getElementById("nome").value === "" || 
            (document.getElementById("cpf").value === "" && document.getElementById("numPassaporte").value === "") ||
            document.getElementById("cep").value === "" || document.getElementById("logradouro").value === "" ||
            document.getElementById("numero").value === "" || cidadeSelecionada === "" ||
            ufSelecionada === "" || document.getElementById("telefone").value === "") {
            carregando(false);
            alert("Preencha todos os campos obrigatórios, sinalizados com *");
            return;
        }

        if (document.getElementById("botaoCPF").checked === false && document.getElementById("botaoNumPassaporte").checked === false) {
            carregando(false);
            alert("Selecione se deseja utilizar o CPF ou o número de passaporte");
            return;
        }

        let regexNome = /^.{2,} (.{2,})+$/;
        let nome = document.getElementById("nome").value.toString();

        if (!regexNome.test(nome)) {
            carregando(false);
            alert("Preencha o seu nome completo");
            return;
        }

        let regexTelefone = /^\(\d{2}\)\d{4,5}-\d{4}$/
        let telefone = document.getElementById("telefone").value.toString()

        if(!regexTelefone.test(telefone)){
            carregando(false);
            alert("Preencha o telefone corretamente: \n exemplo: (11)1111-1111 ou (11)11111-1111")
            return
        }

        telefone = telefone.replace("-", "")
        telefone = telefone.replace("(", "")
        telefone = telefone.replace(")", "")

        if(document.getElementById("complemento").value.length > 50){
            carregando(false)
            alert("O complemento deve ter no máximo 50 caracteres")
            return
        }

        var cpf = null;
        var numPassaporte = null;

        if (document.getElementById("botaoCPF").checked === true) {
            cpf = retirarFormatacao(document.getElementById("cpf").value);
            if (cpf.length === 11 && !isNaN(cpf)) {
                var Soma;
                var Resto;
                Soma = 0;
                var i;
                if (cpf === "00000000000") {
                    carregando(false);
                    alert("Digite um número de CPF válido")
                    return;
                }
    
                for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                Resto = (Soma * 10) % 11;
    
                if ((Resto === 10) || (Resto === 11)) Resto = 0;
                if (Resto !== parseInt(cpf.substring(9, 10))) {
                    carregando(false);
                    alert("Digite um número de CPF válido")
                    return;
                }
    
                Soma = 0;
                for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;
    
                if ((Resto === 10) || (Resto === 11)) Resto = 0;
                if (Resto !== parseInt(cpf.substring(10, 11))) {
                    carregando(false);
                    alert("Digite um número de CPF válido")
                    return;
                }
            }
            else {
                carregando(false);
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }

        }
        else {
            numPassaporte = document.getElementById("numPassaporte").value;
            if (numPassaporte.length === 8 && isNaN(numPassaporte[0]) && isNaN(numPassaporte[1]) && !isNaN(numPassaporte.substring(2, 8))) {
                /* Falta verificar se o número de passaporte é válido */
            }
            else {
                carregando(false);
                alert("Digite um número de passaporte válido");
                return;
            }
        }

        let cep = cepValue;
        cep = retirarFormatacao(cep);

        let regexLogradouroQuantidade = /^.{2,} (.{2,})+$/;
        let regexLogradouroTamanho = /^.{4,100}$/;
        let logradouro = document.getElementById("logradouro").value.toString();

        if (!regexLogradouroQuantidade.test(logradouro) || !regexLogradouroTamanho.test(logradouro)) {
            carregando(false);
            alert("Verifique seu endereço");
            return;
        }

        requisicao.post("cadastroDeReserva", 'nome=' + document.getElementById("nome").value +
            '&cpf=' + cpf +
            '&numPassaporte=' + numPassaporte +
            '&cep=' + cep +
            '&logradouro=' + logradouro +
            '&numero=' + document.getElementById("numero").value +
            '&complemento=' + document.getElementById("complemento").value +
            '&cidade=' + document.getElementById("cidade").value +
            '&estado=' + document.getElementById("estado").value +
            '&telefone=' + telefone +
            '&quantAdultos=' + dadosIniciaisDaReserva.adultos +
            '&quantCriancas=' + dadosIniciaisDaReserva.criancas +
            '&dataInicio=' + dadosIniciaisDaReserva.check_in +
            '&dataFim=' + dadosIniciaisDaReserva.check_out +
            '&tipoDeQuarto=' + document.getElementById("tipoDeQuarto").value
        ).then(res => {
            carregando(false);
            if (res.status === "Sucesso") {
                console.log(res.dados);
                alert("Reserva realizada com sucesso!\nO ID da reserva é: " + res.dados.id + "\nA senha da reserva é: " + res.dados.senha);
                history.push('/');
            }
            else
                alert("A reserva não pôde ser realizada!\nErro: " + res.dados);
        }).catch(erro => {
            carregando(false);
            console.log(erro);
        });
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
                    <label class="grande">Selecione se deseja utilizar CPF ou número de passaporte*:</label>
                </div>

                <div id="divinterna">
                    <input type="radio" id="botaoCPF" name="cpfNumPassaporte" onChange={(e) => {trocarParaCPF()}}></input>
                    <label id="labelCPF" htmlFor="cpf" class="cpfNumPassaporte">CPF:</label>
                    <InputMask id="cpf" type="text" className="inputdivisivel" mask="999.999.999-99"></InputMask>
                </div>
                <div id="divinterna">
                    <input type="radio" id="botaoNumPassaporte" name="cpfNumPassaporte" class="cpfNumPassaporte" onChange={(e) => {trocarParaPassaporte()}}></input>
                    <label id="labelPassaporte" htmlFor="numPassaporte" class="cpfNumPassaporte">Passaporte:</label>
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

                <div id="carregando" className="nada"></div>
                <button id="botaoconfirmar" className="" type="button" onClick={() => confirmarReserva()}>Confirmar reserva</button>
            </form>
        </div>
    );
}

export default FormularioDeReserva;