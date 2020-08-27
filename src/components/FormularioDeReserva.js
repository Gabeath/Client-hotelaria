import React, {useEffect} from 'react';
import requisicao from '../functions/requisicao';
import '../pages/ConfirmarReserva.css';
import { useHistory } from 'react-router-dom';

function FormularioDeReserva (props) {
    var dadosIniciaisDaReserva = {
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    const history = useHistory();

    useEffect(() => {
        if (props.props.props.history.location.state !== undefined) {
            dadosIniciaisDaReserva = props.props.props.history.location.state;
        }
    },);

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
            cpf = cpfNumPassaporte; /* Falta verificar se o CPF é válido */
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
                                                if (res.status === "Sucesso")
                                                    alert("Reserva realizada com sucesso! O ID da reserva é: " + res.dados.id);
                                                else
                                                    alert("A reserva não pôde ser realizada!\nErro: " + JSON.stringify(res/*.dados.errors[0].message*/));
                                                history.push('/');
                                              }).catch(erro => {
                                                console.log(erro);
                                              });
    }

    return (
        <div>
            <form>
                <div id = "divinterna">
                    <label htmlFor = "nome">Nome completo*:</label>
                    <input id = "nome" type = "text" required></input>
                </div>

                <div id = "divinterna">
                    <label htmlFor = "tipoDeQuarto">Tipo do quarto*:</label>
                    <select id = "tipoDeQuarto" required>
                        <option value = "Standard casal">Standard casal</option>
                        <option value = "Standard duplo">Standard duplo</option>
                        <option value = "Luxo casal">Luxo casal</option>
                        <option value = "Luxo duplo">Luxo duplo</option>
                    </select>
                </div>

                <div id = "divinterna">
                    <label htmlFor = "cpfNumPassaporte">CPF/Passaporte*:</label> {/*Implementar máscara do input depois*/}
                    <input id = "cpfNumPassaporte" className = "inputdivisivel" type = "text" required></input>
                </div>

                <div id = "divinterna">
                    <label htmlFor = "cep">CEP*:</label> {/*Implementar máscara do input depois*/}
                    <input id = "cep" className = "inputdivisivel" type = "text" maxLength = "9" required></input>
                    {/*<button id = "botaobuscar">Buscar CEP</button>*/} {/*Implementar funcionalidade do botão depois*/}
                </div>

                <div id = "divinterna">
                    <label htmlFor = "logradouro">Endereço*:</label>
                    <input id = "logradouro" type = "text" required></input>
                </div>

                <div id = "divinterna">
                    <label htmlFor = "numero">Número*:</label>
                    <input id = "numero" className = "inputdivisivel" type = "text" required></input>
                
                    <label htmlFor = "complemento">Complemento:</label>
                    <input id = "complemento" className = "inputdivisivel" type = "text"></input>
                </div>

                <div id = "divinterna">
                    <label htmlFor = "cidade">Cidade*:</label>
                    <input id = "cidade" className = "inputdivisivel" type = "text" required></input>

                    <label htmlFor = "estado">Estado*:</label>
                    <input id = "estado" className = "inputdivisivel" type = "text" maxLength = "2" required></input>
                </div>

                <div id = "divinterna">
                    <label htmlFor = "telefone">Telefone*:</label>
                    <input id = "telefone" className = "inputdivisivel" type = "text" required></input> {/*Implementar máscara do input depois*/}
                </div>

                <button id = "botaoconfirmar" type = "button" onClick = {() => confirmarReserva()}>Confirmar reserva</button>
            </form>
        </div>
    );
}

export default FormularioDeReserva;