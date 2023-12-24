document.addEventListener('DOMContentLoaded', function () {

    // Obter o ID do cliente da URL
    // console.log('Detalhar cliente - Início da função');
    const urlParams = new URLSearchParams(window.location.search);
    // console.log('Conteúdo de urlParams:', urlParams);  // Adiciona este log
    const clienteId = urlParams.get('id');
    // console.log('Identificando o Id que está chegando:', clienteId);
    // console.log('URL da página:', window.location.href);

    // Verificar se o veiculoId é null ou undefined
    if (!clienteId) {
        console.error('ID do cliente não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    // Fazer uma requisição para obter as informações do veículo com base no ID
    fetch(`http://localhost:3000/clientes/${clienteId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(async cliente => {
            // Atualizar a página com as informações do veículo
            exibirInformacoesVeiculo(cliente);

            // Formatar e exibir a data de cadastro
            const DataNascimentoFormatada = formatarData(cliente.DataNascimento);
            document.getElementById('datanascimento').innerText = DataNascimentoFormatada;



        })
        .catch(error => console.error('Erro ao obter cliente:', error));
});

function formatarData(dataString) {
    const data = new Date(dataString);
    
    // Obter componentes da data
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é base 0, então adicionamos 1
    const ano = data.getFullYear();

    // Formatar a data como "dd/mm/yyyy"
    return `${dia}/${mes}/${ano}`;
}

function exibirInformacoesVeiculo(cliente) {
    // Atualizar o conteúdo da página com as informações do veículo
    // Use o DOM para adicionar as informações à página HTML
    document.getElementById('id').innerText = cliente.Id ? cliente.Id.toString() : '';
    document.getElementById('nome').innerText = cliente.Nome ? cliente.Nome.toString() : '';
    document.getElementById('email').innerText = cliente.Email ? cliente.Email.toString() : '';
    document.getElementById('datanascimento').innerText = cliente.DataNascimento ? cliente.DataNascimento.toString() : '';
    document.getElementById('cpfcnpj').innerText = cliente.CPFCNPJ ? cliente.CPFCNPJ.toString() : '';
    document.getElementById('rgie').innerText = cliente.RGIE ? cliente.RGIE.toString() : '';
    document.getElementById('nomefantasia').innerText = cliente.NomeFantasia ? cliente.NomeFantasia.toString() : '';
    document.getElementById('endereco').innerText = cliente.Endereco ? cliente.Endereco.toString() : '';
    document.getElementById('numero').innerText = cliente.Numero ? cliente.Numero.toString() : '';
    document.getElementById('complemento').innerText = cliente.Complemento ? cliente.Complemento.toString() : '';
    document.getElementById('bairro').innerText = cliente.Bairro ? cliente.Bairro.toString() : '';
    document.getElementById('cep').innerText = cliente.CEP ? cliente.CEP.toString() : '';
    document.getElementById('whatsapp').innerText = cliente.WhatsApp ? cliente.WhatsApp.toString() : '';
    document.getElementById('fone1').innerText = cliente.Fone1 ? cliente.Fone1.toString() : '';
    document.getElementById('fone2').innerText = cliente.Fone2 ? cliente.Fone2.toString() : '';
    document.getElementById('fone3').innerText = cliente.Fone3 ? cliente.Fone3.toString() : '';
    document.getElementById('classificacao').innerText = cliente.Classificacao ? cliente.Classificacao.toString() : '';
    document.getElementById('observacoes').innerText = cliente.Observacoes ? cliente.Observacoes.toString() : '';
    // Adicione mais campos conforme necessário
}

// Adicione esta função no seu script detalharVeiculo.js
function voltarParaLista() {
    window.location.href = 'ListarClientes.html';
}

function editarCliente() {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    // Verificar se o clienteId é null ou undefined
    if (!clienteId) {
        console.error('ID do cliente não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    // Redirecionar para a página de edição com o clienteId
    window.location.href = `/pages/clientes/EditarClientes.html?id=${clienteId}`;
}

function confirmarExclusao() {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    // Verificar se o clienteId é null ou undefined
    if (!clienteId) {
        console.error('ID do veículo não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    // Redirecionar para a página de edição com o clienteId
    window.location.href = `/pages/clientes/ExcluirClientes.html?id=${clienteId}`;
}