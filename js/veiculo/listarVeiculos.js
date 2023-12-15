// Função para renderizar o HTML do carrossel de fotos
function renderCarousel(veiculo) {
    if (veiculo.Fotos && veiculo.Fotos.length > 0) {
        return `
            <div id="carousel-${veiculo.id}" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    ${veiculo.Fotos.map((foto, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="/images/uploads/${foto.NomeArquivo}" alt="Foto"
                                class="d-block w-100 img-fluid">
                        </div>
                    `).join('')}
                </div>
                ${veiculo.Fotos.length > 1 ? `
                    <a class="carousel-control-prev" href="#carousel-${veiculo.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </a>
                    <a class="carousel-control-next" href="#carousel-${veiculo.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </a>
                ` : ''}
                <ol class="carousel-indicators">
                    ${veiculo.Fotos.map((foto, index) => `
                        <li data-target="#carousel-${veiculo.id}" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}">
                        </li>
                    `).join('')}
                </ol>
            </div>
        `;
    } else {
        return `
            <div id="image-preview" class="mt-3 text-center">
                <img src="/images/sem-foto.png" alt="Foto" class="img-fluid mx-auto"
                    style="max-height: auto; max-width: auto;">
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
                        <a href="/veiculo/editar/${veiculo.id}" class="btn btn-info">Editar</a>
                        <a href="/veiculo/excluir/${veiculo.id}" class="btn btn-danger">Excluir</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar veículos e renderizar os cards
function loadVeiculos() {
    $.get('http://localhost:3000/veiculos')
        .done(function (veiculos) {
            $('#veiculosList').empty();

            if (Array.isArray(veiculos)) {
                veiculos.forEach(function (veiculo) {
                    $('#veiculosList').append(renderVeiculoCard(veiculo));
                });

                $('.detalhes-btn').click(function (event) {
                    event.preventDefault();
                    const veiculoId = $(this).data('veiculo-id');
                    console.log('ID do veículo:', veiculoId);
                    window.location.href = `/pages/veiculos/DetalharVeiculos.html?id=${veiculoId}`;
                });
            } else {
                console.error('A resposta do servidor não é um array:', veiculos);
            }
        })
        .fail(function (error) {
            console.error('Erro ao obter veículos:', error);
        });
}

// Executar a função ao carregar a página
$(document).ready(function () {
    loadVeiculos();

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
