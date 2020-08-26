import React from 'react';
import requisicao from '../functions/requisicao';

function FormularioDeReserva () {

    function confirmarReserva () {
        var cpfNumPassaporte = document.getElementById("cpfNumPassaporte");
        var cpf = null;
        var numPassaporte = null;

        if (cpfNumPassaporte.length() === 11 && !isNaN(cpfNumPassaporte)) {
            cpf = cpfNumPassaporte; /* Falta verificar se o CPF é válido */
        }
        else {
            if (cpfNumPassaporte.length() === 8 && isNaN(cpfNumPassaporte[0]) && isNaN(cpfNumPassaporte[1]) && !isNaN(cpfNumPassaporte.substring(2, 8))) {
                numPassaporte = cpfNumPassaporte; /* Falta verificar se o número de passaporte é válido */
            }
            else {
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }

        var dados = {
            nome: document.getElementById("nome"),
            cpf: cpf,
            numPassaporte: numPassaporte,
            cep: document.getElementById("cep"),
            logradouro: document.getElementById("logradouro"),
            numero: document.getElementById("numero"),
            complemento: document.getElementById("complemento"),
            cidade: document.getElementById("cidade"),
            estado: document.getElementById("estado"),
            telefone: document.getElementById("telefone"),
            quant_adultos: null,
            quant_criancas: null,
            data_inicio: null,
            data_fim: null,
            tipoDeQuarto: document.getElementById("tipoDeQuarto"),
        }
        
        requisicao.Post("cadastroDeReserva", dados);
    }

    return (
        <div>
            <form>
                <label>Nome completo:</label>
                <input id = "nome" type = "text" required></input>

                <label>Tipo do quarto:</label>
                <select id = "tipoDeQuarto" required>
                    <option value = "StandardCasal">Standard casal</option>
                    <option value = "StandardDuplo">Standard duplo</option>
                    <option value = "LuxoCasal">Luxo casal</option>
                    <option value = "LuxoDuplo">Luxo duplo</option>
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

                <button type = "submit" onClick = {confirmarReserva()}>Confirmar reserva</button>
            </form>
        </div>
    );
}

export default FormularioDeReserva;