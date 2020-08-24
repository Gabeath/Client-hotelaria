import React from 'react';

function FormularioDeReserva () {
    return (
        <div>
            <form>
                <label>Nome completo:</label>
                <input type = "text" required></input>

                <label>Tipo do quarto:</label>
                <select required>
                    <option value = "StandardCasal">Standard casal</option>
                    <option value = "StandardDuplo">Standard duplo</option>
                    <option value = "LuxoCasal">Luxo casal</option>
                    <option value = "LuxoDuplo">Luxo duplo</option>
                </select>

                <label>CPF ou número de passaporte:</label> {/*Implementar máscara do input depois*/}
                <input type = "text" required></input>

                <label>CEP:</label> {/*Implementar máscara do input depois*/}
                <input type = "text" maxLength = "9" required></input>
                <button>Buscar CEP</button> {/*Implementar funcionalidade do botão depois*/}

                <label>Endereço:</label>
                <input type = "text" required></input>

                <label>Número:</label>
                <input type = "text" required></input>

                <label>Complemento:</label>
                <input type = "text"></input>

                <label>Cidade:</label>
                <input type = "text" required></input>

                <label>Estado:</label>
                <input type = "text" maxLength = "2" required></input>

                <label>Telefone:</label>
                <input type = "text" required></input> {/*Implementar máscara do input depois*/}

                <button>Confirmar reserva</button> {/*Implementar funcionalidade do botão depois*/}
            </form>
        </div>
    );
}

export default FormularioDeReserva;