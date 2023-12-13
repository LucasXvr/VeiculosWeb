// Quando a página é carregada
$(document).ready(function () {
    // Fazer uma requisição para obter os veículos
    $.get('http://localhost:3000/veiculos')
        .done(function (veiculos) {
            // Limpar a lista de veículos
            $('#veiculosList').empty();

            // Verificar se veiculos é um array
            if (Array.isArray(veiculos)) {
                // Iterar sobre cada veículo e adicionar um card
                veiculos.forEach(function (veiculo) {
                    var cardHtml = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                ${veiculo.Fotos && veiculo.Fotos.length > 0 ? `
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
                                ` : `
                                    <div id="image-preview" class="mt-3 text-center">
                                        <img src="/images/sem-foto.png" alt="Foto" class="img-fluid mx-auto"
                                            style="max-height: auto; max-width: auto;">
                                    </div>
                                `}
                                <div class="card-body">
                                    <h5 class="card-title">${veiculo.MarcaModeloVeiculo} ${veiculo.FabricacaoVeiculo} - ${veiculo.CategoriaVeiculo} ${veiculo.CorVeiculo}</h5>
                                    <p class="card-text">
                                        <strong>Preço de Venda:</strong> ${veiculo.PrVenda}
                                    </p>
                                    <p class="card-text">
                                        <strong>Ano:</strong> ${veiculo.ModeloVeiculo}
                                    </p>
                                    <div class="btn-group" role="group">
                                        <a href="/veiculo/${veiculo.id}" class="btn btn-primary">Detalhes</a>
                                        <a href="/veiculo/editar/${veiculo.id}" class="btn btn-info">Editar</a>
                                        <a href="/veiculo/excluir/${veiculo.id}" class="btn btn-danger">Excluir</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Adicionar o card à lista de veículos
                    $('#veiculosList').append(cardHtml);
                });
            } else {
                console.error('A resposta do servidor não é um array:', veiculos);
            }
        })
        .fail(function (error) {
            console.error('Erro ao obter veículos:', error);
        });
});