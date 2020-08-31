import React, { useEffect, useState } from 'react';
import requisicao from '../functions/requisicao';
import '../pages/ConfirmarReserva.css';
import { useHistory } from 'react-router-dom';

function FormularioDeReserva(props) {
    var dadosIniciaisDaReserva = {
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    const [cepValue, setCep] = useState('')
    const history = useHistory();

    useEffect(() => {
        if (props.props.props.history.location.state !== undefined) {
            dadosIniciaisDaReserva = props.props.props.history.location.state;
        }
    });

    function handleChange(event) {
        setCep(event)
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
                document.getElementById('cidade').value = "...";
                document.getElementById('estado').value = "...";

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((res) => res.json())
                    .then((data) => {
                        document.getElementById('logradouro').value = data.logradouro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;

                        if (data.logradouro === undefined || data.localidade === undefined || data.uf === undefined) {
                            limpa_formulário_cep();
                        }
                    })
                setCep(cep)
            }
            else {
                alert("Formato de CEP inválido.");
            }
        }
    };

    const confirmarReserva = () => {
        if (document.getElementById("nome").value === "" || document.getElementById("cpfNumPassaporte").value === "" ||
            document.getElementById("cep").value === "" || document.getElementById("logradouro").value === "" ||
            document.getElementById("numero").value === "" || document.getElementById("cidade").value === "" ||
            document.getElementById("estado").value === "" || document.getElementById("telefone").value === "") {
            alert("Preencha todos os campos obrigatórios, sinalizados com *");
            return;
        }

        var cpfNumPassaporte = document.getElementById("cpfNumPassaporte").value;
        var cpf = null;
        var numPassaporte = null;

        if (cpfNumPassaporte.length === 11 && !isNaN(cpfNumPassaporte)) {
            var Soma;
            var Resto;
            Soma = 0;
            var i;
            if (cpfNumPassaporte === "00000000000") {
                alert("Digite um número de CPF válido")
                return;
            }

            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpfNumPassaporte.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(cpfNumPassaporte.substring(9, 10))) {
                alert("Digite um número de CPF válido")
                return;
            }

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfNumPassaporte.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(cpfNumPassaporte.substring(10, 11))) {
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
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }

        /*var dados = {
            nome: document.getElementById("nome").value,
            cpf: cpf,
            numPassaporte: numPassaporte,
            cep: document.getElementById("cep").value,
            logradouro: document.getElementById("logradouro").value,
            numero: document.getElementById("numero").value,
            complemento: document.getElementById("complemento").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            telefone: document.getElementById("telefone").value,
            quant_adultos: 2,
            quant_criancas: 1,
            data_inicio: new Date(),
            data_fim: new Date(),
            tipoDeQuarto: document.getElementById("tipoDeQuarto").value,
        }*/

        requisicao.post("cadastroDeReserva", 'nome=' + document.getElementById("nome").value +
            '&cpf=' + cpf +
            '&numPassaporte=' + numPassaporte +
            '&cep=' + document.getElementById("cep").value +
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
            if (res.status === "Sucesso"){
                alert("Reserva realizada com sucesso! O ID da reserva é: " + res.dados.id);
                history.push('/');
            }
            else
                alert("A reserva não pôde ser realizada!\nErro: " + res.dados);
            
        }).catch(erro => {
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
                    <label htmlFor="cpfNumPassaporte">CPF/Passaporte*:</label> {/*Implementar máscara do input depois*/}
                    <input id="cpfNumPassaporte" className="inputdivisivel" type="text" required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="cep">CEP*:</label> {/*Implementar máscara do input depois*/}
                    <input id="cep" className="inputdivisivel" type="text" maxLength="9" value={cepValue} onChange={(e) => { handleChange(e.target.value) }} onBlur={() => pesquisacep()} required></input>
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
                    <label htmlFor="cidade">Cidade*:</label>
                    <input id="cidade" className="inputdivisivel" type="text" required></input>

                    <label htmlFor="estado">Estado*:</label>
                    <input id="estado" className="inputdivisivel" type="text" maxLength="2" required></input>
                </div>

                <div id="divinterna">
                    <label htmlFor="telefone">Telefone*:</label>
                    <input id="telefone" className="inputdivisivel" type="text" required></input> {/*Implementar máscara do input depois*/}
                </div>

                <button id="botaoconfirmar" type="button" onClick={() => confirmarReserva()}>Confirmar reserva</button>
            </form>
        </div>
    );
}

export default FormularioDeReserva;