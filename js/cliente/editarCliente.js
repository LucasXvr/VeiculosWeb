document.addEventListener('DOMContentLoaded', async function () {
    try {
        const clienteId = obterIdDoClienteDaURL();

        if (!clienteId) {
            console.error('ID do cliente não encontrado na URL.');
            return;
        }

        const [cliente] = await Promise.all([
            obterClientePorId(clienteId),
        ]);

        preencherCamposDoFormulario(cliente);

        // Adicione um listener para capturar a seleção da classificação
        const classificacaoRadios = document.getElementsByName('Classificacao');
        classificacaoRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                classificacaoSelecionada = radio.value;
            });
        });

        const salvarBtn = document.getElementById('salvarBtn');
        salvarBtn.addEventListener('click', async () => {
            const dadosAtualizados = await obterDadosDoFormulario();
            // Adicione a classificação aos dados atualizados
            dadosAtualizados.Classificacao = classificacaoSelecionada;
            await atualizarCliente(clienteId, dadosAtualizados);
        });
    } catch (error) {
        console.error('Erro ao inicializar:', error);
    }
});


function obterIdDoClienteDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id'); // Use 'Id' (maiúsculo) para corresponder à sua URL
    console.log('ID do cliente na URL:', clienteId);
    return clienteId;
}

async function obterClientePorId(clienteId) {
    const response = await fetch(`http://localhost:3000/clientes/${clienteId}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

// Função para formatar a data no formato "yyyy-MM-dd"
function formatarData(data) {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataObj.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
}

// Função para preencher os campos do formulário com as informações do veículo
function preencherCamposDoFormulario(cliente) {
    $('#Id').val(cliente.Id);
    $('#Nome').val(cliente.Nome);
    $('#Email').val(cliente.Email);
    $('#DataNascimento').val(formatarData(cliente.DataNascimento));
    $('#CPFCNPJ').val(cliente.CPFCNPJ);
    $('#RGIE').val(cliente.RGIE);
    $('#NomeFantasia').val(cliente.NomeFantasia);
    $('#Endereco').val(cliente.Endereco);
    $('#Numero').val(cliente.Numero);
    $('#Complemento').val(cliente.Complemento);
    $('#Bairro').val(cliente.Bairro);
    $('#CEP').val(cliente.CEP);
    $('#WhatsApp').val(cliente.WhatsApp);
    $('#Fone1').val(cliente.Fone1);
    $('#Fone2').val(cliente.Fone2);
    $('#Fone3').val(cliente.Fone3);
    $('#Observacoes').val(cliente.Observacoes);

    // Carregar a Classificação Salva
    const classificacaoRadio = document.getElementById(cliente.Classificacao);
    if (classificacaoRadio) {
        classificacaoRadio.checked = true;
    }
}


// Função para obter os dados do formulário
async function obterDadosDoFormulario() {
    const dadosFormulario = {
        Id: $('#Id').val(),
        Nome: $('#Nome').val(),
        Email: $('#Email').val(),
        DataNascimento: $('#DataNascimento').val(),
        CPFCNPJ: $('#CPFCNPJ').val(),
        RGIE: $('#RGIE').val(),
        NomeFantasia: $('#NomeFantasia').val(),
        Endereco: $('#Endereco').val(),
        Numero: $('#Numero').val(),
        Complemento: $('#Complemento').val(),
        Bairro: $('#Bairro').val(),
        CEP: $('#CEP').val(),
        WhatsApp: $('#WhatsApp').val(),
        Fone1: $('#Fone1').val(),
        Fone2: $('#Fone2').val(),
        Fone3: $('#Fone3').val(),
        Classificacao: $('#Classificacao').val(),
        Observacoes: $('#Observacoes').val(),
    
    };
    
    console.log('Dados do formulário:', dadosFormulario);
    return dadosFormulario;
}


// Função para atualizar o veículo
async function atualizarCliente(clienteId, dadosAtualizados) {
    try {
        console.log('Dados atualizados antes da stringify:', dadosAtualizados);

        const response = await fetch(`http://localhost:3000/clientes/${clienteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        });

        // Verificar se a resposta não está vazia
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Aguardar a resposta ser processada antes de prosseguir
        const responseData = await response.json();

        console.log('Cliente atualizado com sucesso:', responseData);

        exibirMensagemDeSucesso('Cliente atualizado com sucesso');
        // Adicione aqui o comportamento desejado após a atualização bem-sucedida
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        // Adicione aqui o comportamento desejado em caso de erro
        exibirMensagemDeErro('Erro ado atualizar cliente');
    }
}

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