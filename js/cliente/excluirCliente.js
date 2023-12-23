$(document).ready(function () {
    // Obter o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    // Se o clienteId não estiver presente, redirecionar para a lista de clientes
    if (!clienteId) {
        window.location.href = "/pages/clientes/ListarClientes.html";
    }

    // Obter informações do cliente e renderizar a página
    $.get(`http://localhost:3000/clientes/${clienteId}`)
        .done(async function (cliente) {
            // Renderizar informações do cliente
            renderVeiculo(cliente);

            // Manipulador de eventos para o botão "Confirmar Exclusão"
            $('#confirmar-exclusao-btn').click(function () {
                // Chamar função para excluir o cliente
                excluirCliente(clienteId);
            });
        })
        .fail(function (error) {
            console.error('Erro ao obter cliente:', error);
        });
});

function renderVeiculo(cliente) {

    // Atualizar o nome do modelo do veículo
    $('#modelo-cliente').text(`${cliente.Nome}`);

    // Atualizar outras informações do veículo, se necessário
    $('#email-cliente').text(cliente.Email);
    $('#cpf-cliente').text(cliente.CPFCNPJ);
    // Adicione mais campos conforme necessário
}


async function excluirCliente(clienteId) {
    try {
        // Excluir o cliente
        await $.ajax({
            url: `http://localhost:3000/clientes/${clienteId}`,
            type: 'DELETE',
            success: function () {
                console.log('Cliente excluído com sucesso');
                // Redirecionar para a lista de clientes após a exclusão bem-sucedida
                window.location.href = "/pages/clientes/ListarClientes.html";
            },
            error: function (error) {
                console.error('Erro ao excluir cliente:', error);
                // Adicione lógica para lidar com erros, se necessário
            }
        });
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
    }
}