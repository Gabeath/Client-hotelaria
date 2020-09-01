import React, { useEffect, useState } from 'react';
import requisicao from '../functions/requisicao';
import '../pages/ConfirmarReserva.css';
import './Carregando.css';
import { useHistory } from 'react-router-dom';

function FormularioDeReserva(props) {
    var dadosIniciaisDaReserva = {
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    const [cepValue, setCep] = useState('')
    const [cpfPassaporte, setCPF_Passaporte] = useState('')
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
        if (id === "cpfNumPassaporte") {
            setCPF_Passaporte(event)
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

    function formatarCpfNumPassaporte() {
        let campoTexto = cpfPassaporte
        if (campoTexto.length === 11) {
            campoTexto = mascaraCpf(campoTexto);
            setCPF_Passaporte(campoTexto)
        }
    }

    function mascaraCpf(valor) {
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
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
        
        if(!digito)
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

    const confirmarReserva = () => {
        carregando(true);

        if (document.getElementById("nome").value === "" || document.getElementById("cpfNumPassaporte").value === "" ||
            document.getElementById("cep").value === "" || document.getElementById("logradouro").value === "" ||
            document.getElementById("numero").value === "" || cidadeSelecionada === "" ||
            ufSelecionada === "" || document.getElementById("telefone").value === "") {
            carregando(false);
            alert("Preencha todos os campos obrigatórios, sinalizados com *");
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

        var cpfNumPassaporte = cpfPassaporte;
        cpfNumPassaporte = retirarFormatacao(cpfNumPassaporte)
        var cpf = null;
        var numPassaporte = null;

        if (cpfNumPassaporte.length === 11 && !isNaN(cpfNumPassaporte)) {
            var Soma;
            var Resto;
            Soma = 0;
            var i;
            if (cpfNumPassaporte === "00000000000") {
                carregando(false);
                alert("Digite um número de CPF válido")
                return;
            }

            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpfNumPassaporte.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(cpfNumPassaporte.substring(9, 10))) {
                carregando(false);
                alert("Digite um número de CPF válido")
                return;
            }

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfNumPassaporte.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(cpfNumPassaporte.substring(10, 11))) {
                carregando(false);
                alert("Digite um número de CPF válido")
                return;
            }
            cpf = cpfNumPassaporte;
        }
        else {
            if (cpfNumPassaporte.length === 8 && isNaN(cpfNumPassaporte[0]) && isNaN(cpfNumPassaporte[1]) && !isNaN(cpfNumPassaporte.substring(2, 8))) {
                numPassaporte = cpfNumPassaporte; /* Falta verificar se o número de passaporte é válido */
            }
            else {
                carregando(false);
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }

        let cep = cepValue
        cep = retirarFormatacao(cep)

        requisicao.post("cadastroDeReserva", 'nome=' + document.getElementById("nome").value +
            '&cpf=' + cpf +
            '&numPassaporte=' + numPassaporte +
            '&cep=' + cep +
            '&logradouro=' + document.getElementById("logradouro").value +
            '&numero=' + document.getElementById("numero").value +
            '&complemento=' + document.getElementById("complemento").value +
            '&cidade=' + document.getElementById("cidade").value +
            '&estado=' + document.getElementById("estado").value +
            '&telefone=' + document.getElementById("telefone").value +
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
                    <label htmlFor="cpfNumPassaporte">CPF/Passaporte*:</label>
                    <input id="cpfNumPassaporte" className="inputdivisivel" type="text" maxLength="14" value={cpfPassaporte} onChange={(e) => { handleChange(e.target.value, "cpfNumPassaporte") }} onBlur={() => formatarCpfNumPassaporte()} required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="cep">CEP*:</label>
                    <input id="cep" className="inputdivisivel" type="text" maxLength="9" value={cepValue} onChange={(e) => { handleChange(e.target.value, "cep") }} onBlur={() => pesquisacep()} required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="logradouro">Endereço*:</label>
                    <input id="logradouro" type="text" required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="numero">Número*:</label>
                    <input id="numero" className="inputdivisivel" type="text" required></input>

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