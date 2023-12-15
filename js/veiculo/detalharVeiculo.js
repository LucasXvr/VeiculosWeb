document.addEventListener('DOMContentLoaded', function () {
    // Esperar o DOM estar totalmente carregado

    // Obter o ID do veículo da URL
    console.log('Detalhar veículo - Início da função');
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Conteúdo de urlParams:', urlParams);  // Adiciona este log
    const veiculoId = urlParams.get('id');
    console.log('Identificando o Id que está chegando:', veiculoId);
    console.log('URL da página:', window.location.href);


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
        .then(veiculo => {
            // Atualizar a página com as informações do veículo
            exibirInformacoesVeiculo(veiculo);
        })
        .catch(error => console.error('Erro ao obter veículo:', error));
});

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