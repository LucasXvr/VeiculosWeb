document.addEventListener('DOMContentLoaded', async function () {
    const veiculoId = obterIdDoVeiculoDaURL();

    if (!veiculoId) {
        console.error('ID do veículo não encontrado na URL.');
        // Adicione aqui o comportamento desejado para quando o ID não está presente
        return;
    }

    try {
        const veiculo = await obterVeiculoPorId(veiculoId);
        const fotos = await obterFotosDoVeiculo(veiculoId);

        preencherCamposDoFormulario(veiculo, fotos);

        // Adicione um ouvinte de evento ao botão de "Salvar" ou "Atualizar"
        const salvarBtn = document.getElementById('salvarBtn');
        salvarBtn.addEventListener('click', async () => {
            // Obtenha os dados atualizados do formulário
            const dadosAtualizados = obterDadosDoFormulario();

            // Envie uma solicitação PUT para atualizar o veículo
            await atualizarVeiculo(veiculoId, dadosAtualizados);
        });
    } catch (error) {
        console.error('Erro ao obter veículo:', error);
    }
});


function obterIdDoVeiculoDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function obterVeiculoPorId(veiculoId) {
    const response = await fetch(`http://localhost:3000/veiculos/${veiculoId}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

async function obterFotosDoVeiculo(veiculoId) {
    try {
        return await $.get(`http://localhost:3000/fotos/${veiculoId}`);
    } catch (error) {
        console.error('Erro ao obter fotos do veículo:', error);
        return [];
    }
}

// Função para formatar a data no formato "yyyy-MM-dd"
function formatarData(data) {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataObj.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
}

// Função para preencher os campos do formulário com as informações do veículo
function preencherCamposDoFormulario(veiculo, fotos) {
    $('#Id').val(veiculo.Id);
    $('#Grupo').val(veiculo.Grupo);
    $('#Unidade').val(veiculo.Unidade);
    $('#PrCusto').val(veiculo.PrCusto);
    $('#Margem').val(veiculo.Margem);
    $('#PrVenda').val(veiculo.PrVenda);
    $('#Ncm').val(veiculo.Ncm);
    $('#Ativo').val(veiculo.Ativo);
    $('#CFOP').val(veiculo.CFOP);
    $('#CEST').val(veiculo.CEST);
    $('#PrVendaPrazo').val(veiculo.PrVendaPrazo);
    $('#DtCadastro').val(formatarData(veiculo.DtCadastro));
    $('#ViaReciboVeiculo').val(veiculo.ViaReciboVeiculo);
    $('#RenavamVeiculo').val(veiculo.RenavamVeiculo);
    $('#RegistroVeiculo').val(veiculo.RegistroVeiculo);
    $('#RntrcVeiculo').val(veiculo.RntrcVeiculo);
    $('#ExerEmisDocVeiculo').val(veiculo.ExerEmisDocVeiculo);
    $('#PlacaVeiculo').val(veiculo.PlacaVeiculo);
    $('#ChassiVeiculo').val(veiculo.ChassiVeiculo);
    $('#CombustivelVeiculo').val(veiculo.CombustivelVeiculo);
    $('#FabricacaoVeiculo').val(veiculo.FabricacaoVeiculo);
    $('#ModeloVeiculo').val(veiculo.ModeloVeiculo);
    $('#CorVeiculo').val(veiculo.CorVeiculo);
    $('#CategoriaVeiculo').val(veiculo.CategoriaVeiculo);
    $('#EmissaoDocumentoVeiculo').val(formatarData(veiculo.EmissaoDocumentoVeiculo));
    $('#LocalRegistroVeiculo').val(veiculo.LocalRegistroVeiculo);
    $('#CapPotCilVeiculo').val(veiculo.CapPotCilVeiculo);
    $('#MarcaModeloVeiculo').val(veiculo.MarcaModeloVeiculo);
    $('#EspecieVeiculo').val(veiculo.EspecieVeiculo);
    $('#Observacoes').val(veiculo.Observacoes);

    // Exibir imagens do veículo, se houver
    exibirImagensDoVeiculo(fotos, veiculo.Id);
}

// Função para obter os dados do formulário
async function obterDadosDoFormulario() {
    const dadosFormulario = {
        Id: $('#Id').val(),
        Grupo: $('#Grupo').val(),
        Unidade: $('#Unidade').val(),
        PrCusto: $('#PrCusto').val(),
        Margem: $('#Margem').val(),
        PrVenda: $('#PrVenda').val(),
        Ncm: $('#Ncm').val(),
        Ativo: $('#Ativo').val(),
        CFOP: $('#CFOP').val(),
        CEST: $('#CEST').val(),
        PrVendaPrazo: $('#PrVendaPrazo').val(),
        DtCadastro: $('#DtCadastro').val(),
        ViaReciboVeiculo: $('#ViaReciboVeiculo').val(),
        RenavamVeiculo: $('#RenavamVeiculo').val(),
        RegistroVeiculo: $('#RegistroVeiculo').val(),
        RntrcVeiculo: $('#RntrcVeiculo').val(),
        ExerEmisDocVeiculo: $('#ExerEmisDocVeiculo').val(),
        PlacaVeiculo: $('#PlacaVeiculo').val(),
        ChassiVeiculo: $('#ChassiVeiculo').val(),
        CombustivelVeiculo: $('#CombustivelVeiculo').val(),
        FabricacaoVeiculo: $('#FabricacaoVeiculo').val(),
        ModeloVeiculo: $('#ModeloVeiculo').val(),
        CorVeiculo: $('#CorVeiculo').val(),
        CategoriaVeiculo: $('#CategoriaVeiculo').val(),
        EmissaoDocumentoVeiculo: $('#EmissaoDocumentoVeiculo').val(),
        LocalRegistroVeiculo: $('#LocalRegistroVeiculo').val(),
        CapPotCilVeiculo: $('#CapPotCilVeiculo').val(),
        MarcaModeloVeiculo: $('#MarcaModeloVeiculo').val(),
        EspecieVeiculo: $('#EspecieVeiculo').val(),
        Observacoes: $('#Observacoes').val(),
        
        novasFotos: $('#novasFotos')[0].files,
        // Adicione os outros campos do formulário conforme necessário
    };

    try {
        // Converta novasFotos em um array, se necessário
        const novasFotosArray = Array.from(dadosFormulario.novasFotos);

        // Verifique se há um ID válido do veículo antes de chamar a função de associação
        if (dadosFormulario.Id) {
            // Associar as novas fotos ao veículo no servidor
            await associationFotosToVeiculo(dadosFormulario.Id, novasFotosArray);

            // Remover a propriedade 'novasFotos' dos dados do formulário, pois já foram processadas
            delete dadosFormulario.novasFotos;
        } else {
            console.error('ID do veículo não encontrado. As fotos não serão associadas.');
        }
    } catch (error) {
        console.error('Erro ao associar fotos ao veículo:', error);
        // Adicione aqui o comportamento desejado em caso de erro
    }

    return dadosFormulario;
}

// Função para exibir as imagens do veículo
function exibirImagensDoVeiculo(fotos, veiculoId) {
    const fotosContainer = $('#image-preview');

    if (fotos && fotos.length > 0) {
        fotosContainer.empty();
        console.log('veiculoId:', veiculoId);
        fotos.forEach(foto => {
            const imgUrl = `/images/uploads/${foto.NomeArquivo}`;
            const fotoElement = $('<div class="col-md-4 mb-4">').html(`
                <div class="card photo-card">
                    <img src="${imgUrl}" alt="Foto" class="card-img-top img-fluid photo-img">
                    <input type="hidden" name="fotosExistente" value="${foto.NomeArquivo}">
                    <button type="button" class="btn btn-danger mt-2" onclick="removeImage('${foto.NomeArquivo}', '${veiculoId}')">Remover</button>
                </div>
            `);
            fotosContainer.append(fotoElement);
        });
    } else {
        fotosContainer.html('<p>Nenhuma foto disponível para este veículo.</p>');
    }
}

// Modifique a função removeImage para chamar a nova função removerImagem
function removeImage(nomeArquivo, veiculoId) {
    const confirmacao = confirm('Tem certeza de que deseja remover esta imagem?');

    if (confirmacao && veiculoId) {
        removerImagem(veiculoId, nomeArquivo);
    } else {
        console.error('ID do veículo inválido ou ausente.');
    }
}

// Função para remover a imagem do veículo
async function removerImagem(veiculoId, nomeArquivo) {
    try {
        // Remover a imagem do servidor
        const response = await fetch(`http://localhost:3000/fotos/${veiculoId}/${nomeArquivo}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Imagem removida com sucesso.');

        // Remover a imagem da interface
        $(`[value="${nomeArquivo}"]`).parent().remove();
    } catch (error) {
        console.error('Erro ao remover imagem:', error);
        // Adicione aqui o comportamento desejado em caso de erro
    }
}

// Função para atualizar o veículo
async function atualizarVeiculo(veiculoId, dadosAtualizados) {
    try {
        const response = await fetch(`http://localhost:3000/veiculos/${veiculoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Veículo atualizado com sucesso.');
        // Adicione aqui o comportamento desejado após a atualização bem-sucedida

        // Adicione a mensagem de sucesso na interface do usuário
        exibirMensagemDeSucesso('Veículo atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        // Adicione a mensagem de erro na interface do usuário
        exibirMensagemDeErro('Erro ao atualizar veículo. Por favor, tente novamente.');

        // Adicione aqui o comportamento desejado em caso de erro
    }
}

// Função para exibir mensagem de sucesso na interface do usuário
function exibirMensagemDeSucesso(mensagem) {
    // Adapte este código conforme necessário para exibir a mensagem na interface do usuário
    alert(mensagem);
}

// Função para exibir mensagem de erro na interface do usuário
function exibirMensagemDeErro(mensagem) {
    // Adapte este código conforme necessário para exibir a mensagem na interface do usuário
    alert(mensagem);
}

//Função para associar fotos ao veículo na base de dados
async function associationFotosToVeiculo(veiculoId, fotoData) {
    try {
        // Verifica se fotoData é um array antes de chamar o map
        if (Array.isArray(fotoData)) {
            // Cria um array de objetos com VeiculoId e NomeArquivo
            const fotosParaAssociar = fotoData.map(foto => ({
                VeiculoId: veiculoId,
                NomeArquivo: foto.name, // Use 'name' em vez de 'filename'
            }));

            console.log('Fotos para associar:', fotosParaAssociar);

            // Envie a lista de fotos para o servidor usando a sua rota de upload existente
            await enviarFotosParaServidor(veiculoId, fotosParaAssociar);

            console.log('Fotos associadas ao veículo na base de dados.');
        } else {
            console.error('Nenhuma foto encontrada para associar ao veículo.');
        }
    } catch (error) {
        console.log('Erro ao associar fotos ao veículo:', error.message);
    }
}

// Enviar a lista de fotos para o servidor
async function enviarFotosParaServidor(veiculoId, fotos) {
    try {
        // Adapte a URL da sua rota de upload de fotos
        const uploadUrl = `http://localhost:3000/fotos/upload/${veiculoId}`;

        const formData = new FormData();
        fotos.forEach(foto => {
            formData.append('fotos', new File([foto], foto.NomeArquivo)); // Cria um novo objeto File para cada foto
        });

        console.log('Enviando solicitação fetch para upload de fotos');

        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fotos adicionadas com sucesso:', data);

        // Adapte conforme necessário para a lógica específica do seu aplicativo

    } catch (error) {
        console.error('Erro ao enviar fotos para o servidor:', error);
    }
}
