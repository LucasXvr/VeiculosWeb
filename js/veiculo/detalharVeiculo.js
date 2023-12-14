document.addEventListener('DOMContentLoaded', function () {
    // Obter o ID do veículo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('id');

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
    document.getElementById('id').innerText = veiculo.id;
    document.getElementById('grupo').innerText = veiculo.grupo;
    document.getElementById('unidade').innerText = veiculo.unidade;
    document.getElementById('prcusto').innerText = veiculo.prcusto;
    document.getElementById('margem').innerText = veiculo.margem;
    document.getElementById('prvenda').innerText = veiculo.prvenda;
    document.getElementById('ncm').innerText = veiculo.ncm;
    document.getElementById('ativo').innerText = veiculo.ativo;
    document.getElementById('cfop').innerText = veiculo.cfop;
    document.getElementById('cest').innerText = veiculo.cest;
    document.getElementById('prvendaprazo').innerText = veiculo.prvendaprazo;
    document.getElementById('dtcadastro').innerText = veiculo.dtcadastro;
    document.getElementById('viareciboveiculo').innerText = veiculo.viareciboveiculo;
    document.getElementById('renavamveiculo').innerText = veiculo.renavamveiculo;
    document.getElementById('registroveiculo').innerText = veiculo.registroveiculo;
    document.getElementById('rntrcveiculo').innerText = veiculo.rntrcveiculo;
    document.getElementById('exeremisdocveiculo').innerText = veiculo.exeremisdocveiculo;
    document.getElementById('placaveiculo').innerText = veiculo.placaveiculo;
    document.getElementById('chassiveiculo').innerText = veiculo.chassiveiculo;
    document.getElementById('combustivelveiculo').innerText = veiculo.combustivelveiculo;
    document.getElementById('fabricacaoveiculo').innerText = veiculo.fabricacaoveiculo;
    document.getElementById('modeloveiculo').innerText = veiculo.modeloveiculo;    
    document.getElementById('corveiculo').innerText = veiculo.corveiculo;    
    document.getElementById('categoriaveiculo').innerText = veiculo.categoriaveiculo;    
    document.getElementById('emissaodocumentoveiculo').innerText = veiculo.emissaodocumentoveiculo;    
    document.getElementById('localregistroveiculo').innerText = veiculo.localregistroveiculo;    
    document.getElementById('cappotcilveiculo').innerText = veiculo.cappotcilveiculo;    
    document.getElementById('marcamodeloveiculo').innerText = veiculo.marcamodeloveiculo;    
    document.getElementById('especieveiculo').innerText = veiculo.especieveiculo;
    document.getElementById('observacoes').innerText = veiculo.observacoes;
    // Adicione mais campos conforme necessário
}