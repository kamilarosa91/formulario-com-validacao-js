function validarFormulario() {
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var dataNascimento = document.getElementById("dataNascimento");
    var sexo = document.getElementById("sexo");
    var estadoCivil = document.getElementById("estadoCivil");
    var areasInteresse = document.getElementById("areasInteresse");
    var validado = true;
    var mensagem = "";

    // Validando o campo nome
    if (nome.value.length < 15) {
        validado = false;
        mensagem += "O nome deve ter no mínimo 15 caracteres.\n";
        nome.focus();
    }

    // Validando o campo e-mail
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email.value)) {
        validado = false;
        mensagem += "O e-mail é inválido.\n";
        email.focus();
    }

    // Validando o campo data de nascimento
    var dia = parseInt(dataNascimento.value.substr(0, 2));
    var mes = parseInt(dataNascimento.value.substr(3, 2));
    var ano = parseInt(dataNascimento.value.substr(6, 4));
    var data = new Date(ano, mes - 1, dia);
    if (data.getDate() != dia || data.getMonth() != mes - 1 || data.getFullYear() != ano) {
        validado = false;
        mensagem += "A data de nascimento é inválida.\n";
        dataNascimento.focus();
    } else {
        // Passando o foco para o próximo campo após a data ser preenchida corretamente
        sexo.focus();
    }

    // Validando o campo estado civil
    if (estadoCivil.value == "solteiro") {
        var idade = calcularIdade(data);
        if (idade < 15) {
            validado = false;
            mensagem += "Para se cadastrar como solteiro(a), é necessário ter pelo menos 15 anos.\n";
            dataNascimento.focus();
        }
    }
 // Validando o campo áreas de interesse
 if (areasInteresse.selectedOptions.length == 0) {
    validado = false;
    mensagem += "Selecione pelo menos uma área de interesse.\n";
    areasInteresse.focus();
}

// Exibindo a mensagem de validação
if (validado) {
    alert("Dados enviados com sucesso!");
    return true;
} else {
    alert(mensagem);
    return false;
}
}
//Calculo de idade
function calcularIdade(dataNascimento) {
    var hoje = new Date();
    var diferencaAnos = hoje.getFullYear() - dataNascimento.getFullYear();
    if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < new Date(hoje.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate())) {
        diferencaAnos--;
    }
    return diferencaAnos;
}
 //Validando idade mínima para cadastro como solteiro 
 function validarEstadoCivil() {
    var estadoCivil = document.getElementById("estadoCivil");
    var dataNascimento = document.getElementById("dataNascimento");
    if (estadoCivil.value == "solteiro") {
        var idade = calcularIdade(new Date(dataNascimento.value.substr(6, 4), dataNascimento.value.substr(3, 2) - 1, dataNascimento.value.substr(0, 2)));
        if (idade < 15) {
            alert("Para se cadastrar como solteiro(a), é necessário ter pelo menos 15 anos.");
            estadoCivil.value = "";
            dataNascimento.focus();
        }
    }
}