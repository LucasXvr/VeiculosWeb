const veiculoModels = require('../models/veiculoModels');

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

// Controlador para obter um veículo por ID
async function obterVeiculoPorId(req, res) {
  const veiculoId = req.params.id;
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

// Controlador para criar um novo veículo
async function criarVeiculo(req, res) {
  const novoVeiculo = req.body; // Certifique-se de enviar os dados do novo veículo no corpo da requisição
  try {
    const veiculoCriado = await veiculoModels.criarVeiculo(novoVeiculo);
    res.status(201).json(veiculoCriado);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
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

async function obterFotosPorVeiculoId(req, res) {
  const veiculoId = req.params.veiculoId;

  try {
    const fotos = await veiculoModels.obterFotosPorVeiculoId(veiculoId);
    res.json(fotos);
  } catch (error) {
    console.error('Erro ao obter fotos por ID de veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

module.exports = {
  listarVeiculos,
  obterVeiculoPorId,
  criarVeiculo,
  atualizarVeiculo,
  excluirVeiculo,
  obterFotosPorVeiculoId,
};
