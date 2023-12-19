const veiculoModels = require('../models/veiculoModel');

// Controlador para listar todos os veículos
async function listarVeiculos(req, res) {
  try {
    const veiculos = await veiculoModels.obterTodosVeiculos();
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao listar veículos:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

// Controlador para criar um novo veículo
async function criarVeiculo(req, res) {
  console.log('Chamando a função criarVeiculo');
  const novoVeiculo = req.body;
  console.log('Dados do corpo da solicitação:', novoVeiculo);

  try {
    // Certifique-se de ajustar os nomes dos campos de acordo com os que estão no seu formulário HTML
    
    const veiculoCriado = await veiculoModels.criarVeiculo(novoVeiculo);

    res.status(201).json(veiculoCriado);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

// Controlador para obter um veículo por ID
async function obterVeiculoPorId(req, res) {
  console.log('Chamando a função obterVeiculoPorId');
  const veiculoId = req.params.id;
  console.log('Dados do corpo da solicitação:', veiculoId);

  try {
    const veiculo = await veiculoModels.obterVeiculoPorId(veiculoId);
    
    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado' });
    }
    res.json(veiculo);
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

// Controlador para atualizar um veículo
async function atualizarVeiculo(req, res) {
  const veiculoId = req.params.id;
  const novosDados = req.body; // Certifique-se de enviar os novos dados no corpo da requisição
  try {
    const veiculoAtualizado = await veiculoModels.atualizarVeiculo(veiculoId, novosDados);
    if (!veiculoAtualizado) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado' });
    }
    res.json(veiculoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

// Controlador para excluir um veículo
async function excluirVeiculo(req, res) {
  const veiculoId = req.params.id;
  try {
    const veiculoExcluido = await veiculoModels.excluirVeiculo(veiculoId);
    if (!veiculoExcluido) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado' });
    }
    res.json({ mensagem: 'Veículo excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

module.exports = {
  listarVeiculos,
  obterVeiculoPorId,
  criarVeiculo,
  atualizarVeiculo,
  excluirVeiculo,
};
