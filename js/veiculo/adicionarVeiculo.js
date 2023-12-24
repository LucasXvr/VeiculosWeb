document.addEventListener('DOMContentLoaded', function () {

    const botaoSubmit = document.getElementById('btnSalvar');

    botaoSubmit.addEventListener('click', async function (event) {
        event.preventDefault(); // Impede a submissão automática do formulário

        const novoVeiculo = obterDadosDoFormulario();

        if (!novoVeiculo) {
            console.log('Campos obrigatórios não preenchidos');
            exibirMensagem('danger', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            // console.log('Enviando dados para o servidor:', novoVeiculo);

            const response = await fetch('http://localhost:3000/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoVeiculo),
            });

            // console.log('Resposta do servidor:', response);

            if (response.ok) {
                const data = await response.json();
                await uploadsFotos(data.Id, novoVeiculo.Fotos);

                // Limpar os campos do formulário
                limparFormulario();

                exibirMensagemDeSucesso('Veículo adicionado com sucesso!');
            } else {
                throw new Error('Erro ao adicionar veículo. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error.message);
            exibirMensagemDeErro('Erro ao adicionar veículo. Por favor, tente novamente.');
        }
    });
});

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

// Função para exibir mensagens na interface do usuário
function exibirMensagem(tipo, texto) {
    // Remova a mensagem existente se houver
    const mensagemExistente = document.getElementById('mensagem');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    // Crie um elemento de mensagem
    const mensagemElemento = document.createElement('div');
    mensagemElemento.id = 'mensagem';
    mensagemElemento.className = `alert alert-${tipo}`;
    mensagemElemento.textContent = texto;

    // Insira a mensagem acima do formulário
    const formulario = document.getElementById('formAdicionarVeiculo'); // Substitua 'seu-formulario-id' pelo ID real do seu formulário
    formulario.parentNode.insertBefore(mensagemElemento, formulario);

    // Limpe a mensagem após alguns segundos (opcional)
    setTimeout(() => {
        mensagemElemento.remove();
    }, 5000); // Remova a mensagem após 5 segundos (ajuste conforme necessário)
}

// Implementação básica da função para limpar o formulário
function limparFormulario() {
    const elementosFormulario = document.querySelectorAll('form input, form select, form textarea');

    elementosFormulario.forEach(elemento => {
        elemento.value = '';
    });
}

async function uploadsFotos(veiculoId, fotos) {
    const formData = new FormData();

    try {
        for (let index = 0; index < fotos.length; index++) {
            const file = fotos[index];
            // console.log('Adicionando foto ao FormData:', file.name);
            formData.append('fotos', file);
        }

        // console.log('Enviando solicitação fetch para upload de fotos');

        const response = await fetch(`http://localhost:3000/fotos/upload/${veiculoId}`, {
            method: 'POST',
            body: formData,
        });

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
        const result = await Foto.bulkCreate(fotosParaAssociar);
        // console.log('Resultado do bulkCreate:', result);

        console.log('Fotos associadas ao veículo na base de dados.');
    } catch (error) {
        console.log('Erro ao associar fotos aso veículo:', error.message);
    }
}

// Função para obter dados do formulário
function obterDadosDoFormulario() {
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

    return {
        // ... Seus dados do veículo ...
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
}