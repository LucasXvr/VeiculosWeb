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
    

    const inputFoto = document.getElementById('fotos');
    const foto = Array.from(inputFoto.files);


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

        Fotos: foto,
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

        // Adicionar a lógica para o upload de fotos
        uploadsFotos(data.Id, foto);

        // // Redirecionar para a página de detalhes após a conclusão bem-sucedida
        // window.location.href = `/pages/veiculos/DetalharVeiculos.html?id=${data.Id}`;
    })
    .catch(error => {
        // Lógica para lidar com erros na requisição
        console.error('Erro ao adicionar veículo:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    });

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}


async function uploadsFotos(veiculoId, fotos) {
    const formData = new FormData();

    try {
        for (let index = 0; index < fotos.length; index++) {
            const file = fotos[index];
            console.log('Adicionando foto ao FormData:', file.name);
            formData.append('fotos', file);
        }

        console.log('Enviando solicitação fetch para upload de fotos');

        const response = await fetch(`http://localhost:3000/fotos/upload/${veiculoId}`, {
            method: 'POST',
            body: formData,
        });

        console.log('Resposta do servidor:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fotos adicionadas com sucesso:', data);

        await associationFotosToVeiculo(veiculoId, data);

    } catch (error) {
        console.log('Erro ao adicionar fotos:', error.message);
    }
}

//Função para associar fotos ao veículo na base de dados
async function associationFotosToVeiculo(veiculoId, fotoData) {
    try {
        //Cria um array de objetos com VeiculoId e NomeArquivo
        const fotosParaAssociar = fotoData.map(foto => ({
            VeiculoId: veiculoId,
            NomeArquivo: foto.filename,
        }));

        console.log('Fotos para associar:', fotosParaAssociar);

        // Log para verificar se há algum erro durante a operação de bulkCreate
        const result = await Fotos.bulkCreate(fotosParaAssociar);
        console.log('Resultado do bulkCreate:', result);

        console.log('Fotos associadas ao veículo na base de dados.');
    } catch (error) {
        console.log('Erro ao associar fotos aso veículo:', error.message);
    }
}