// Função para renderizar o HTML do card do cliente
function renderClienteCard(cliente) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${cliente.Nome}</h5>
                    <p class="card-text">
                        <strong>Email:</strong> ${cliente.Email}
                    </p>
                    <p class="card-text">
                        <strong>CPF/CNPJ:</strong> ${cliente.CPFCNPJ}
                    </p>
                    <div class="btn-group" role="group">
                        <a href="#" class="btn btn-primary detalhes-btn" data-cliente-id="${cliente.Id}">Detalhes</a>
                        <a href="#" class="btn btn-info editar-btn" data-cliente-id="${cliente.Id}">Editar</a>
                        <a href="#" class="btn btn-danger excluir-btn" data-cliente-id="${cliente.Id}">Excluir</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar clientes e renderizar os cards
async function loadClientes() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const searchString = urlParams.get('searchString');
        const url = `http://localhost:3000/clientes`;
        const clientes = await $.get(url);
        
        $('#clientesList').empty();

        if (Array.isArray(clientes) && clientes.length > 0) {
            const filteredClientes = searchString
                ? clientes.filter(cliente => cliente.Nome.toLowerCase().includes(searchString.toLowerCase()))
                : clientes;

            for (const cliente of filteredClientes) {
                // Renderizar o card do cliente
                $('#clientesList').append(renderClienteCard(cliente));
            }

            $('.detalhes-btn').click(async function (event) {
                event.preventDefault();
                const clienteId = $(this).data('cliente-id');
                // console.log('ID do cliente:', clienteId);

                window.location.href = `/pages/clientes/DetalharClientes.html?id=${clienteId}`;
            });

            $('.editar-btn').click(async function (event) {
                event.preventDefault();
                const clienteId = $(this).data('cliente-id');
                // console.log('ID do cliente:', clienteId);

                window.location.href = `/pages/clientes/EditarClientes.html?id=${clienteId}`;
            });

            $('.excluir-btn').click(async function (event) {
                event.preventDefault();
                const clienteId = $(this).data('cliente-id');
                // console.log('ID do cliente:', clienteId);

                window.location.href = `/pages/clientes/ExcluirClientes.html?id=${clienteId}`;
            });
            // Restante do código (event listeners) permanece o mesmo.
        } else {
            // Caso a lista de veículos esteja vazia, adicione o HTML padrão
            $('#clientesList').html(`
                    <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div id="image-preview" class="mt-3 text-center">
                                <img src="/images/sem-foto.png" alt="Foto" class="img-fluid mx-auto"
                                    style="max-height: auto; max-width: auto;">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Nenhum Cliente adicionado ainda. </h5>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div id="image-preview" class="mt-3 text-center">
                                <img src="/images/sem-foto.png" alt="Foto" class="img-fluid mx-auto"
                                    style="max-height: auto; max-width: auto;">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Nenhum Cliente adicionado ainda. </h5>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div id="image-preview" class="mt-3 text-center">
                                <img src="/images/sem-foto.png" alt="Foto" class="img-fluid mx-auto"
                                    style="max-height: auto; max-width: auto;">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Nenhum Cliente adicionado ainda. </h5>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
    }
}

// Executar a função ao carregar a página
$(document).ready(function () {

    // Adicione o evento de envio para o formulário de busca
    $('#formBuscaClientes').submit(function (event) {
        event.preventDefault();
        
        // Obtenha os valores dos campos do formulário e codifique-os
        const searchString = encodeURIComponent($('#formBuscaClientes input[name="searchString"]').val());
        const searchField = encodeURIComponent($('#formBuscaClientes input[name="searchField"]').val());

        // Redirecione para a página de veículos com os parâmetros de busca
        window.location.href = `/pages/clientes/ListarClientes.html?searchString=${searchString}&searchField=${searchField}`;
    });

    // Obter o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    // Se o clienteId estiver presente, fazer a requisição para obter o cliente pelo ID
    if (clienteId) {
        // Log para verificar se o ID está sendo obtido corretamente
        // console.log('Identificando o Id que está chegando:', clienteId);

        // Fazer uma requisição para obter o cliente pelo ID
        $.get(`http://localhost:3000/clientes/${clienteId}`)
            .done(function (cliente) {
                // Log para verificar se o cliente foi obtido corretamente
                // console.log('Cliente obtido:', cliente);

                // Restante do código para manipular o cliente (se necessário)
            })
            .fail(function (error) {
                console.error('Erro ao obter cliente:', error);
            });
    }

    // Restante do código para carregar clientes e renderizar os cards permanece o mesmo.
    loadClientes();
});

