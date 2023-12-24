document.addEventListener('DOMContentLoaded', function (){

    const botaoSubmit = document.getElementById('btnSalvar');

    botaoSubmit.addEventListener('click', async function (event) {
        event.preventDefault(); // Impede a submissão automática do formulário

        const novoCliente = obterDadosDoFormulario();

        if (!novoCliente) {
            console.log('Campos obrigatórios não preenchidos');
            exibirMensagem('danger', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            if (response.ok) {
                // Limpar os campos do formulário
                limparFormulario();

                exibirMensagemDeSucesso('Veículo adicionado com sucesso!');
            } else {
                throw new Error('Erro ao adicionar veículo. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error.message);
            exibirMensagemDeErro('Erro ao adicionar cliente. Por favor, tente novamente.');
        }
    });
})

// Função para exibir mensagem de sucesso na interface do usuário
function exibirMensagemDeSucesso(mensagem) {
    // Adapte este código conforme necessário para exibir a mensagem na interface do usuário
    alert(mensagem);
}

// Função para exibir mensagem de erro na interface do usuário
function exibirMensagemDeErro(mensagem) {
    // Adapte este código conforme necessário para exibir a mensagem na interface do usuário
    alert(mensagem);
}

// Função para exibir mensagens na interface do usuário
function exibirMensagem(tipo, texto) {
    // Remova a mensagem existente se houver
    const mensagemExistente = document.getElementById('mensagem');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    // Crie um elemento de mensagem
    const mensagemElemento = document.createElement('div');
    mensagemElemento.id = 'mensagem';
    mensagemElemento.className = `alert alert-${tipo}`;
    mensagemElemento.textContent = texto;

    // Insira a mensagem acima do formulário
    const formulario = document.getElementById('formAdicionarCliente'); // Substitua 'seu-formulario-id' pelo ID real do seu formulário
    formulario.parentNode.insertBefore(mensagemElemento, formulario);

    // Limpe a mensagem após alguns segundos (opcional)
    setTimeout(() => {
        mensagemElemento.remove();
    }, 5000); // Remova a mensagem após 5 segundos (ajuste conforme necessário)
}

// Implementação básica da função para limpar o formulário
function limparFormulario() {
    const elementosFormulario = document.querySelectorAll('form input, form select, form textarea');

    elementosFormulario.forEach(elemento => {
        elemento.value = '';
    });
}

function obterDadosDoFormulario() {
    // Obter os valores dos campos do formulário
    const id = document.getElementById('Id');
    const nome = document.getElementById('Nome').value;
    const email = document.getElementById('Email').value;
    const dataNascimento = document.getElementById('DataNascimento').value;
    const cpfCnpj = document.getElementById('CPFCNPJ').value;
    const rgIe = document.getElementById('RGIE').value;
    const nomeFantasia = document.getElementById('NomeFantasia').value;
    const endereco = document.getElementById('Endereco').value;
    const numero = document.getElementById('Numero').value;
    const complemento = document.getElementById('Complemento').value;
    const bairro = document.getElementById('Bairro').value;
    const cep = document.getElementById('CEP').value;
    const whatsApp = document.getElementById('WhatsApp').value;
    const fone1 = document.getElementById('Fone1').value;
    const fone2 = document.getElementById('Fone2').value;
    const fone3 = document.getElementById('Fone3').value;
    // Obter o valor do campo de classificação
    const classificacao = document.querySelector('input[name="Classificacao"]:checked');
    const classificacaoValue = classificacao ? classificacao.value : null;
    const observacoesCliente = document.getElementById('Observacoes').value;

    return {
        Id: id,
        Nome: nome,
        Email: email,
        DataNascimento: dataNascimento,
        CPFCNPJ: cpfCnpj,
        RGIE: rgIe,
        NomeFantasia: nomeFantasia,
        Endereco: endereco,
        Numero: numero,
        Complemento: complemento,
        Bairro: bairro,
        CEP: cep,
        WhatsApp: whatsApp,
        Fone1: fone1,
        Fone2: fone2,
        Fone3: fone3,
        Classificacao: classificacaoValue,
        Observacoes: observacoesCliente,
    };
}