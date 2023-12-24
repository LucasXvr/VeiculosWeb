// Função para renderizar o HTML do carrossel de fotos
let carouselCounter = 0;

function renderCarousel(veiculo) {
    console.log('Veiculo:', veiculo);

    if (veiculo.Fotos && veiculo.Fotos.length > 0) {
        const carouselId = `carousel-${veiculo.id}-${carouselCounter++}`;

        const carouselItems = veiculo.Fotos.map((foto, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="/images/uploads/${foto.NomeArquivo}" alt="Foto" class="d-block w-100 img-fluid">
            </div>
        `).join('');

        const carouselControls = veiculo.Fotos.length > 1 ? `
            <a class="carousel-control-prev" href="#${carouselId}" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next" href="#${carouselId}" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
        ` : '';

        const carouselIndicators = veiculo.Fotos.map((_, index) => `
            <li data-target="#${carouselId}" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
        `).join('');

        return `
            <div class="row memory">
                <div id="${carouselId}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${carouselItems}
                    </div>
                    ${carouselControls}
                    <ol class="carousel-indicators">
                        ${carouselIndicators}
                    </ol>
                </div>
            </div>
        `;
    } else {
        return `
            <div id="image-preview" class="mt-3 text-center">
                <img src="/images/sem-foto.png" alt="Foto" class="img-fluid mx-auto" style="max-height: auto; max-width: auto;">
            </div>
        `;
    }
}

// Função para renderizar o HTML do card do veículo
function renderVeiculoCard(veiculo) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                ${renderCarousel(veiculo)}
                <div class="card-body">
                    <h5 class="card-title">${veiculo.MarcaModeloVeiculo} ${veiculo.FabricacaoVeiculo} - ${veiculo.CategoriaVeiculo} ${veiculo.CorVeiculo}</h5>
                    <p class="card-text">
                        <strong>Preço de Venda:</strong> ${veiculo.PrVenda}
                    </p>
                    <p class="card-text">
                        <strong>Ano:</strong> ${veiculo.ModeloVeiculo}
                    </p>
                    <div class="btn-group" role="group">
                        <a href="#" class="btn btn-primary detalhes-btn" data-veiculo-id="${veiculo.Id}">Detalhes</a>
                        <a href="#" class="btn btn-info editar-btn" data-veiculo-id="${veiculo.Id}">Editar</a>
                        <a href="#" class="btn btn-danger excluir-btn" data-veiculo-id="${veiculo.Id}">Excluir</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar veículos e renderizar os cards
async function loadVeiculos() {
    try {
        // Obtenha os parâmetros de busca da URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchString = urlParams.get('searchString');
        
        // Faça a requisição para obter veículos
        const veiculos = await $.get('http://localhost:3000/veiculos');

        $('#veiculosList').empty();

        if (Array.isArray(veiculos)) {
            const filteredVeiculos = searchString
                ? veiculos.filter(veiculo => veiculo.MarcaModeloVeiculo.toLowerCase().includes(searchString.toLowerCase()))
                : veiculos;

            for (const veiculo of filteredVeiculos) {
                // Obter as fotos do veículo
                const fotos = await $.get(`http://localhost:3000/fotos/${veiculo.Id}`);

                // Adicionar as fotos ao objeto do veículo
                veiculo.Fotos = fotos;

                // Renderizar o card do veículo com as fotos
                $('#veiculosList').append(renderVeiculoCard(veiculo));
            }

            $('.detalhes-btn').click(async function (event) {
                event.preventDefault();
                const veiculoId = $(this).data('veiculo-id');
                console.log('ID do veículo:', veiculoId);

                // Obter as fotos do veículo
                const fotos = await $.get(`http://localhost:3000/fotos/${veiculoId}`);

                // Adicionar as fotos ao objeto do veículo
                const veiculo = veiculos.find(v => v.Id === veiculoId);
                veiculo.Fotos = fotos;

                // Carregar as fotos e, em seguida, redirecionar para a página de detalhes
                await loadFotosVeiculo(veiculo);
                window.location.href = `/pages/veiculos/DetalharVeiculos.html?id=${veiculoId}`;
            });

            $('.editar-btn').click(async function (event) {
                event.preventDefault();
                const veiculoId = $(this).data('veiculo-id');
                console.log('ID do veículo:', veiculoId);

                // Obter as fotos do veículo
                const fotos = await $.get(`http://localhost:3000/fotos/${veiculoId}`);

                // Adicionar as fotos ao objeto do veículo
                const veiculo = veiculos.find(v => v.Id === veiculoId);
                veiculo.Fotos = fotos;

                // Carregar as fotos e, em seguida, redirecionar para a página de detalhes
                await loadFotosVeiculo(veiculo);
                window.location.href = `/pages/veiculos/EditarVeiculos.html?id=${veiculoId}`;
            });

            $('.excluir-btn').click(async function (event) {
                event.preventDefault();
                const veiculoId = $(this).data('veiculo-id');
                console.log('ID do veículo:', veiculoId);

                // Obter as fotos do veículo
                const fotos = await $.get(`http://localhost:3000/fotos/${veiculoId}`);

                // Adicionar as fotos ao objeto do veículo
                const veiculo = veiculos.find(v => v.Id === veiculoId);
                veiculo.Fotos = fotos;

                // Carregar as fotos e, em seguida, redirecionar para a página de detalhes
                await loadFotosVeiculo(veiculo);
                window.location.href = `/pages/veiculos/ExcluirVeiculos.html?id=${veiculoId}`;
            });
        } else {
            console.error('A resposta do servidor não é um array:', veiculos);
        }
    } catch (error) {
        console.error('Erro ao obter veículos:', error);
    }
}

// Executar a função ao carregar a página
$(document).ready(function () {
    loadVeiculos();

    // Adicione o evento de envio para o formulário de busca
    $('#formBuscaVeiculos').submit(function (event) {
        event.preventDefault();
        
        // Obtenha os valores dos campos do formulário e codifique-os
        const searchString = encodeURIComponent($('#formBuscaVeiculos input[name="searchString"]').val());
        const searchField = encodeURIComponent($('#formBuscaVeiculos input[name="searchField"]').val());

        // Redirecione para a página de veículos com os parâmetros de busca
        window.location.href = `/pages/veiculos/ListarVeiculos.html?searchString=${searchString}&searchField=${searchField}`;
    });

     // Obter o ID da URL
     const urlParams = new URLSearchParams(window.location.search);
     const veiculoId = urlParams.get('id');
 
     // Se o veiculoId não estiver presente, não fazer a requisição
    if (veiculoId) {
        // Log para verificar se o ID está sendo obtido corretamente
        console.log('Identificando o Id que está chegando:', veiculoId);

        // Fazer uma requisição para obter o veículo pelo ID
        $.get(`http://localhost:3000/veiculos/${veiculoId}`)
            .done(function (veiculo) {
                // Log para verificar se o veículo foi obtido corretamente
                console.log('Veículo obtido:', veiculo);
            })
            .fail(function (error) {
                console.error('Erro ao obter veículo:', error);
            });
    }
});

// Adicione esta função no seu script listarVeiculos.js
async function loadFotosVeiculo(veiculo) {
    try {
        const fotos = await $.get(`http://localhost:3000/fotos/${veiculo.Id}`);

        // Verifique se há fotos
        if (fotos && fotos.length > 0) {
            const fotosContainer = $('#fotosContainer');
            fotosContainer.empty();

            fotos.forEach(foto => {
                // Adicione lógica para exibir as fotos da maneira desejada
                fotosContainer.append(`<img src="/images/uploads/${foto.NomeArquivo}" alt="Foto" class="img-fluid">`);
            });
        } else {
            // Caso não haja fotos, exiba uma mensagem
            $('#fotosContainer').html('<p>Nenhuma foto disponível para este veículo.</p>');
        }
    } catch (error) {
        console.error('Erro ao obter fotos do veículo:', error);
    }
}
