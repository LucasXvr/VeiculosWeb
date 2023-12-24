$(document).ready(function () {
    // Obter o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('id');

    // Se o veiculoId não estiver presente, redirecionar para a lista de veículos
    if (!veiculoId) {
        window.location.href = "/pages/veiculos/ListarVeiculos.html";
    }

    // Obter informações do veículo e renderizar a página
    $.get(`http://localhost:3000/veiculos/${veiculoId}`)
        .done(async function (veiculo) {
            // Obter as fotos do veículo
            const fotos = await obterFotosDoVeiculo(veiculo.Id);

            // Adicionar as fotos ao objeto do veículo
            veiculo.Fotos = fotos;

            // Renderizar informações do veículo
            renderVeiculo(veiculo);

            // Manipulador de eventos para o botão "Confirmar Exclusão"
            $('#confirmar-exclusao-btn').click(function () {
                // Chamar função para excluir o veículo
                excluirVeiculo(veiculoId);
            });
        })
        .fail(function (error) {
            console.error('Erro ao obter veículo:', error);
        });
});

function renderVeiculo(veiculo) {
    // Renderizar o carrossel de fotos
    renderCarousel(veiculo);

    // Atualizar o nome do modelo do veículo
    $('#modelo-veiculo').text(`${veiculo.MarcaModeloVeiculo} ${veiculo.FabricacaoVeiculo}`);

    // Atualizar outras informações do veículo, se necessário
    $('#ano-fabricacao').text(veiculo.FabricacaoVeiculo);
    $('#cor-veiculo').text(veiculo.CorVeiculo);
    // Adicione mais campos conforme necessário
}

async function obterFotosDoVeiculo(veiculoId) {
    try {
        // Obter fotos do veículo
        const fotos = await $.get(`http://localhost:3000/fotos/${veiculoId}`);
        return fotos;
    } catch (error) {
        console.error('Erro ao obter fotos do veículo:', error);
        return [];
    }
}

async function excluirVeiculo(veiculoId) {
    try {
        // Obter todas as fotos do veículo
        const fotosDoVeiculo = await obterFotosDoVeiculo(veiculoId);

        // Excluir todas as fotos do veículo
        await Promise.all(fotosDoVeiculo.map(async (foto) => {
            await excluirFotoDoVeiculo(veiculoId, foto.NomeArquivo);
        }));

        // Excluir o veículo
        await $.ajax({
            url: `http://localhost:3000/veiculos/${veiculoId}`,
            type: 'DELETE',
            success: function () {
                // console.log('Veículo excluído com sucesso');
                // Redirecionar para a lista de veículos após a exclusão bem-sucedida
                window.location.href = "/pages/veiculos/ListarVeiculos.html";
            },
            error: function (error) {
                console.error('Erro ao excluir veículo:', error);
                // Adicione lógica para lidar com erros, se necessário
            }
        });
    } catch (error) {
        console.error('Erro ao excluir veículo:', error);
    }
}

async function excluirFotoDoVeiculo(veiculoId, nomeArquivo) {
    try {
        // Chamar rota de exclusão de foto do veículo
        // console.log(`Excluindo foto ${nomeArquivo} do veículo ${veiculoId}`);
        await $.ajax({
            url: `http://localhost:3000/fotos/${veiculoId}/${nomeArquivo}`,
            type: 'DELETE',
            success: function () {
                console.log(`Foto ${nomeArquivo} do veículo ${veiculoId} excluída com sucesso`);
            },
            error: function (error) {
                console.error(`Erro ao excluir foto ${nomeArquivo} do veículo ${veiculoId}:`, error);
                // Adicione lógica para lidar com erros, se necessário
            }
        });
    } catch (error) {
        console.error(`Erro ao excluir foto ${nomeArquivo} do veículo ${veiculoId}:`, error);
    }
}

function renderCarousel(veiculo) {
    const carouselInner = $('#carousel-veiculo .carousel-inner');
    carouselInner.empty();

    // Adicionar lógica para exibir as fotos do veículo no carrossel
    veiculo.Fotos.forEach((foto, index) => {
        const carouselItem = $(`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="/images/uploads/${foto.NomeArquivo}" alt="Foto" class="d-block w-100 img-fluid" style="max-width: 500px; max-height: 400px; margin: auto;">
            </div>
        `);
        carouselInner.append(carouselItem);
    });
}
