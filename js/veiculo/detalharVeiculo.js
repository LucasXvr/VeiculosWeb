document.addEventListener('DOMContentLoaded', function () {
    // Esperar o DOM estar totalmente carregado

    // Obter o ID do veículo da URL
    // console.log('Detalhar veículo - Início da função');
    const urlParams = new URLSearchParams(window.location.search);
    // console.log('Conteúdo de urlParams:', urlParams);  // Adiciona este log
    const veiculoId = urlParams.get('id');
    // console.log('Identificando o Id que está chegando:', veiculoId);
    // console.log('URL da página:', window.location.href);


    // Verificar se o veiculoId é null ou undefined
    if (!veiculoId) {
        console.error('ID do veículo não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    // Fazer uma requisição para obter as informações do veículo com base no ID
    fetch(`http://localhost:3000/veiculos/${veiculoId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(async veiculo => {
            // Atualizar a página com as informações do veículo
            exibirInformacoesVeiculo(veiculo);

            // Formatar e exibir a data de cadastro
            const dtCadastroFormatada = formatarData(veiculo.DtCadastro);
            document.getElementById('dtcadastro').innerText = dtCadastroFormatada;

            // Formatar e exibir a data de emissão do documento do veículo
            const emissaoDocumentoFormatada = formatarData(veiculo.EmissaoDocumentoVeiculo);
            document.getElementById('emissaodocumentoveiculo').innerText = emissaoDocumentoFormatada;


            // Carregar e exibir fotos do veículo
            await loadFotosVeiculo(veiculo.Id);
        })
        .catch(error => console.error('Erro ao obter veículo:', error));
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

// Função para carregar e exibir as fotos do veículo
async function loadFotosVeiculo(veiculoId) {
    try {
        const fotos = await $.get(`http://localhost:3000/fotos/${veiculoId}`);
        const fotosContainer = $('#fotosContainer');

        // Limpar o conteúdo anterior
        fotosContainer.empty();

        // Verificar se há fotos
        if (fotos && fotos.length > 0) {
            fotos.forEach(foto => {
                // Adicionar cada foto ao container
                fotosContainer.append(`
                    <div class="col-md-4 mb-4">
                        <div class="card photo-card">
                            <img src="/images/uploads/${foto.NomeArquivo}" alt="Foto" class="card-img-top img-fluid photo-img">
                        </div>
                    </div>
                `);
            });
        } else {
            // Caso não haja fotos, exiba uma mensagem
            fotosContainer.html('<p>Nenhuma foto disponível para este veículo.</p>');
        }
    } catch (error) {
        console.error('Erro ao obter fotos do veículo:', error);
    }
}


function exibirInformacoesVeiculo(veiculo) {
    // Atualizar o conteúdo da página com as informações do veículo
    // Use o DOM para adicionar as informações à página HTML
    document.getElementById('id').innerText = veiculo.Id.toString();
    document.getElementById('grupo').innerText = veiculo.Grupo.toString();
    document.getElementById('unidade').innerText = veiculo.Unidade.toString();
    document.getElementById('prcusto').innerText = veiculo.PrCusto.toString();
    document.getElementById('margem').innerText = veiculo.Margem.toString();
    document.getElementById('prvenda').innerText = veiculo.PrVenda.toString();
    document.getElementById('ncm').innerText = veiculo.Ncm.toString();
    document.getElementById('ativo').innerText = veiculo.Ativo.toString();
    document.getElementById('cfop').innerText = veiculo.CFOP.toString();
    document.getElementById('cest').innerText = veiculo.CEST.toString();
    document.getElementById('prvendaprazo').innerText = veiculo.PrVendaPrazo.toString();
    document.getElementById('dtcadastro').innerText = veiculo.DtCadastro.toString();
    document.getElementById('viareciboveiculo').innerText = veiculo.ViaReciboVeiculo.toString();
    document.getElementById('renavamveiculo').innerText = veiculo.RenavamVeiculo.toString();
    document.getElementById('registroveiculo').innerText = veiculo.RegistroVeiculo.toString();
    document.getElementById('rntrcveiculo').innerText = veiculo.RntrcVeiculo.toString();
    document.getElementById('exeremisdocveiculo').innerText = veiculo.ExerEmisDocVeiculo.toString();
    document.getElementById('placaveiculo').innerText = veiculo.PlacaVeiculo.toString();
    document.getElementById('chassiveiculo').innerText = veiculo.ChassiVeiculo.toString();
    document.getElementById('combustivelveiculo').innerText = veiculo.CombustivelVeiculo.toString();
    document.getElementById('fabricacaoveiculo').innerText = veiculo.FabricacaoVeiculo.toString();
    document.getElementById('modeloveiculo').innerText = veiculo.ModeloVeiculo.toString();    
    document.getElementById('corveiculo').innerText = veiculo.CorVeiculo.toString();    
    document.getElementById('categoriaveiculo').innerText = veiculo.CategoriaVeiculo.toString();    
    document.getElementById('emissaodocumentoveiculo').innerText = veiculo.EmissaoDocumentoVeiculo.toString();    
    document.getElementById('localregistroveiculo').innerText = veiculo.LocalRegistroVeiculo.toString();    
    document.getElementById('cappotcilveiculo').innerText = veiculo.CapPotCilVeiculo.toString();    
    document.getElementById('marcamodeloveiculo').innerText = veiculo.MarcaModeloVeiculo.toString();    
    document.getElementById('especieveiculo').innerText = veiculo.EspecieVeiculo.toString();
    document.getElementById('observacoes').innerText = veiculo.Observacoes.toString();
    // Adicione mais campos conforme necessário
}

// Adicione esta função no seu script detalharVeiculo.js
function voltarParaLista() {
    window.location.href = 'ListarVeiculos.html';
}

function editarVeiculo() {
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('id');

    // Verificar se o veiculoId é null ou undefined
    if (!veiculoId) {
        console.error('ID do veículo não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    // Redirecionar para a página de edição com o veiculoId
    window.location.href = `/pages/veiculos/EditarVeiculos.html?id=${veiculoId}`;
}

function confirmarExclusao() {
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('id');

    // Verificar se o veiculoId é null ou undefined
    if (!veiculoId) {
        console.error('ID do veículo não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    // Redirecionar para a página de edição com o veiculoId
    window.location.href = `/pages/veiculos/ExcluirVeiculos.html?id=${veiculoId}`;
}
