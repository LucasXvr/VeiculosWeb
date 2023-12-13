function adicionarVeiculo() {
    // Obter os valores dos campos do formulário
    const id = document.getElementById('Id').value;
    const grupo = document.getElementById('Grupo').value;
    const unidade = document.getElementById('Unidade').value;
    const prcusto = document.getElementById('PrCusto').value;
    const margem = document.getElementById('Margem').value;
    const prvenda = document.getElementById('PrVenda').value;
    const ncm = document.getElementById('Ncm').value;
    const ativo = document.getElementById('Ativo').value;
    const cfop = document.getElementById('CFOP').value;
    const cest = document.getElementById('CEST').value;
    const prvendaprazo = document.getElementById('PrVendaPrazo').value;
    const dtcadastro = document.getElementById('DtCadastro').value;
    const viareciboveiculo = document.getElementById('ViaReciboVeiculo').value;
    const renavamveiculo = document.getElementById('RenavamVeiculo').value;
    const registroveiculo = document.getElementById('RegistroVeiculo').value;
    const rntrcveiculo = document.getElementById('RntrcVeiculo').value;
    const exeremisdocveiculo = document.getElementById('ExerEmisDocVeiculo').value;
    const placaveiculo = document.getElementById('PlacaVeiculo').value;
    const chassiveiculo = document.getElementById('ChassiVeiculo').value;
    const combustivelveiculo = document.getElementById('CombustivelVeiculo').value;
    const fabricacaoveiculo = document.getElementById('FabricacaoVeiculo').value;
    const modeloveiculo = document.getElementById('ModeloVeiculo').value;
    const corveiculo = document.getElementById('CorVeiculo').value;
    const categoriaveiculo = document.getElementById('CategoriaVeiculo').value;
    const emissaodocumentoveiculo = document.getElementById('EmissaoDocumentoVeiculo').value;
    const localregistroveiculo = document.getElementById('LocalRegistroVeiculo').value;
    const cappotcilveiculo = document.getElementById('CapPotCilVeiculo').value;
    const marcamodeloveiculo = document.getElementById('MarcaModeloVeiculo').value;
    const especieveiculo = document.getElementById('EspecieVeiculo').value;
    const observacoes = document.getElementById('Observacoes').value;
    

    if (!id || !grupo || !unidade){
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        errorMessage.style.display = 'block';
        return;
    }

    // Construir objeto com os dados do veículo
    const novoVeiculo = {
        Id: id,
        Grupo: grupo,
        Unidade: unidade,
        PrCusto: prcusto,
        Margem: margem,
        PrVenda: prvenda,
        Ncm: ncm,
        Ativo: ativo,
        CFOP: cfop,
        CEST: cest,
        PrVendaPrazo: prvendaprazo,
        DtCadastro: dtcadastro,
        ViaReciboVeiculo: viareciboveiculo,
        RenavamVeiculo: renavamveiculo,
        RegistroVeiculo: registroveiculo,
        RntrcVeiculo: rntrcveiculo,
        ExerEmisDocVeiculo: exeremisdocveiculo,
        PlacaVeiculo: placaveiculo,
        ChassiVeiculo: chassiveiculo,
        CombustivelVeiculo: combustivelveiculo,
        FabricacaoVeiculo: fabricacaoveiculo,
        ModeloVeiculo: modeloveiculo,
        CorVeiculo: corveiculo,
        CategoriaVeiculo: categoriaveiculo,
        EmissaoDocumentoVeiculo: emissaodocumentoveiculo,
        LocalRegistroVeiculo: localregistroveiculo,
        CapPotCilVeiculo: cappotcilveiculo,
        MarcaModeloVeiculo: marcamodeloveiculo,
        EspecieVeiculo: especieveiculo,
        Observacoes: observacoes,

    };

    // Log para verificar o objeto novoVeiculo antes de enviar
    console.log('Objeto novoVeiculo:', novoVeiculo);

    // Enviar dados para o servidor usando o método fetch
    fetch('http://localhost:3000/veiculos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoVeiculo),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Lógica para lidar com a resposta do servidor (pode ser atualizar a página, redirecionar, etc.)
        console.log('Veículo adicionado com sucesso:', data);
    })
    .catch(error => {
        // Lógica para lidar com erros na requisição
        console.error('Erro ao adicionar veículo:', error.message);
    });

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}
