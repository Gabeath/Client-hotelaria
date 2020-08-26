import React from 'react';
import requisicao from '../functions/requisicao';

function FormularioDeReserva () {

    const confirmarReserva = () => {
        var cpfNumPassaporte = document.getElementById("cpfNumPassaporte").value;
        var cpf = null;
        var numPassaporte = null;

        if (cpfNumPassaporte.length === 11 && !isNaN(cpfNumPassaporte)) {
            cpf = cpfNumPassaporte; /* Falta verificar se o CPF é válido */
            console.log("CPF válido");
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
                                              '&quantAdultos=' + /*document.getElementById("quantAdultos").value*/2 +
                                              '&quantCriancas=' + /*document.getElementById("quantCriancas").value*/1 +
                                              '&dataInicio=' + /*document.getElementById("dataInicio").value*/new Date() +
                                              '&dataFim=' + /*document.getElementById("dataFim").value*/new Date() +
                                              '&tipoDeQuarto=' + document.getElementById("tipoDeQuarto").value
                                              ).then(res=>console.log(res)).catch(erro=>console.log(erro));
    }

    return (
        <div>
            <form>
                <label>Nome completo:</label>
                <input id = "nome" type = "text" required></input>

                <label>Tipo do quarto:</label>
                <select id = "tipoDeQuarto" required>
                    <option value = "Standard casal">Standard casal</option>
                    <option value = "Standard duplo">Standard duplo</option>
                    <option value = "Luxo casal">Luxo casal</option>
                    <option value = "Luxo duplo">Luxo duplo</option>
                </select>

                <label>CPF ou número de passaporte:</label> {/*Implementar máscara do input depois*/}
                <input id = "cpfNumPassaporte" type = "text" required></input>

                <label>CEP:</label> {/*Implementar máscara do input depois*/}
                <input id = "cep" type = "text" maxLength = "9" required></input>
                <button>Buscar CEP</button> {/*Implementar funcionalidade do botão depois*/}

                <label>Endereço:</label>
                <input id = "logradouro" type = "text" required></input>

                <label>Número:</label>
                <input id = "numero" type = "text" required></input>

                <label>Complemento:</label>
                <input id = "complemento" type = "text"></input>

                <label>Cidade:</label>
                <input id = "cidade" type = "text" required></input>

                <label>Estado:</label>
                <input id = "estado" type = "text" maxLength = "2" required></input>

                <label>Telefone:</label>
                <input id = "telefone" type = "text" required></input> {/*Implementar máscara do input depois*/}

                <button type = "button" onClick = {() => confirmarReserva()}>Confirmar reserva</button>
            </form>
        </div>
    );
}

export default FormularioDeReserva;