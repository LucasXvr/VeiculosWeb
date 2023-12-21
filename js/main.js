document.addEventListener("DOMContentLoaded", async function () {
    // Aguarde o carregamento completo do DOM

    try {
        const veiculos = await obterVeiculos();

        // Manipule os dados dos veículos recebidos
        const recentCarsContainer = document.getElementById('recentCars');

        if (veiculos.length > 0) {
            // Itere sobre os veículos e crie os cards dinamicamente
            for (const veiculo of veiculos.slice(0, 3)) {
                // Faça uma solicitação AJAX para obter as fotos do veículo
                const fotos = await obterFotosDoVeiculo(veiculo.Id);

                const cardHtml = createCardHtml(veiculo, fotos);
                recentCarsContainer.innerHTML += cardHtml;
            }
        }
    } catch (error) {
        console.error('Erro ao obter veículos:', error);
    }

    async function obterVeiculos() {
        try {
            const response = await fetch('http://localhost:3000/veiculos');
            if (!response.ok) {
                throw new Error(`Erro ao obter veículos: ${response.statusText}`);
            }
            const veiculos = await response.json();
            return veiculos;
        } catch (error) {
            throw new Error(`Erro ao obter veículos: ${error.message}`);
        }
    }

    async function obterFotosDoVeiculo(veiculoId) {
        try {
            const response = await fetch(`http://localhost:3000/fotos/${veiculoId}`);
            if (!response.ok) {
                throw new Error(`Erro ao obter fotos do veículo ${veiculoId}: ${response.statusText}`);
            }
            const fotos = await response.json();
            return fotos;
        } catch (error) {
            console.error(`Erro ao obter fotos do veículo ${veiculoId}:`, error);
            return [];
        }
    }

    function createCardHtml(veiculo, fotos) {
        // Função auxiliar para criar o HTML do card do veículo
        const foto = fotos.length > 0 ? fotos[0].NomeArquivo : 'placeholder.jpg';

        return `
            <div class="col-md-4 mb-4">
                <div class="card card-zoom card-link">
                    <img src="/images/uploads/${foto}" 
                        alt="Carro Destaque" class="img-fluid img-zoom">
                    <div class="card-body">
                        <h5 class="card-title">${veiculo.MarcaModeloVeiculo} ${veiculo.FabricacaoVeiculo} - ${veiculo.CategoriaVeiculo} ${veiculo.CorVeiculo}</h5>
                        <a href="/pages/veiculos/DetalharVeiculos.html?id=${veiculo.Id}" class="btn btn-primary stretched-link">Ver Detalhes</a>
                    </div>
                </div>
            </div>
        `;
    }
});
