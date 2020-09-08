const validacao = {
    validarNome: (nome) => {
        let regex = /^.{2,} (.{2,})+$/;
        return regex.test(nome);
    },

    validarTelefone: (telefone) => {
        let regex = /^\(\d{2}\)\d{4,5}-\d{4}$/
        return regex.test(telefone);
    },

    validarComplemento: (complemento) => {
        return complemento.length <= 50;
    },

    validarCPF: (cpf) => {
        if (cpf.length !== 11 || isNaN(cpf) || cpf === "00000000000")
            return false;

        var soma = 0;
        var resto;
        var i;

        for (i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11))
            resto = 0;
    
        if (resto !== parseInt(cpf.substring(9, 10)))
            return false;

        soma = 0;
        for (i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11))
            resto = 0;

        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
        return true;
    },

    validarPassaporte: (passaporte) => {
        return (passaporte.length === 8 && isNaN(passaporte[0]) && isNaN(passaporte[1]) && !isNaN(passaporte.substring(2, 8)));
    },

    validarLogradouro: (logradouro) => {
        let regexLogradouroQuantidade = /^.{2,} (.{2,})+$/;
        let regexLogradouroTamanho = /^.{4,100}$/;
        return (regexLogradouroQuantidade.test(logradouro) && regexLogradouroTamanho.test(logradouro));
    },

    limparFormatacao: (dado) => {
        return dado.replace(/(\(|\)|\.|\/|-)/g, "");
    },

    diaAtual: () => {
        let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
    
        if (dia < 10)
            dia = '0' + dia;
        
        if (mes < 10)
            mes = '0' + mes;
        
        data = ano + '-' + mes + '-' + dia;
        return data;
    }
}

export default validacao;