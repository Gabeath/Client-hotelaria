import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import requisicao from '../functions/requisicao';
import validacao from '../functions/validacao';

function BotaoConfirmar ({dados, cidadeSelecionada, ufSelecionada, cep}) {
    var dadosIniciaisDaReserva = {
        adultos: null,
        criancas: null,
        check_in: null,
        check_out: null
    };

    const history = useHistory();
    
    useEffect(() => {
        if (dados.history.location.state !== undefined) {
            dadosIniciaisDaReserva = dados.history.location.state;
        }
    });

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

        let nome = document.getElementById("nome").value.toString();

        if (!validacao.validarNome(nome)) {
            carregando(false);
            alert("Preencha o seu nome completo");
            return;
        }

        let telefone = document.getElementById("telefone").value.toString();

        if (!validacao.validarTelefone(telefone)) {
            carregando(false);
            alert("Preencha o telefone corretamente: \n exemplo: (11)1111-1111 ou (11)11111-1111");
            return;
        }

        telefone = validacao.limparFormatacao(telefone);

        let complemento = document.getElementById("complemento").value;

        if(!validacao.validarComplemento(complemento)) {
            carregando(false);
            alert("O complemento deve ter no máximo 50 caracteres");
            return;
        }

        var cpf = null;
        var numPassaporte = null;

        if (document.getElementById("botaoCPF").checked === true) {
            cpf = validacao.limparFormatacao(document.getElementById("cpf").value);
            if (!validacao.validarCPF(cpf)) {
                carregando(false);
                alert("Digite um CPF ou número de passaporte válido");
                return;
            }
        }
        else {
            numPassaporte = document.getElementById("numPassaporte").value;
            if (!validacao.validarPassaporte(numPassaporte)) {
                carregando(false);
                alert("Digite um número de passaporte válido");
                return;
            }
        }

        cep = validacao.limparFormatacao(cep);

        let logradouro = document.getElementById("logradouro").value.toString();

        if (!validacao.validarLogradouro(logradouro)) {
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
            <div id="carregando" className="nada"></div>
            <button id="botaoconfirmar" className="" type="button" onClick={() => confirmarReserva()}>Confirmar reserva</button>
        </div>
    );
}

export default BotaoConfirmar;

            