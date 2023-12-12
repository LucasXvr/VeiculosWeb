const express = require('express');
const veiculoModels = require('../models/veiculoModels');

const router = express.Router();

// Rota para listar veículos
router.get('/', async (req, res) => {
  try {
    const veiculos = await veiculoModels.obterTodosVeiculos();
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao obter veículos:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para criar um novo veículo
router.post('/', async (req, res) => {
  const novoVeiculo = req.body; // Certifique-se de enviar os dados do novo veículo no corpo da requisição
  try {
    const veiculoCriado = await veiculoModels.criarVeiculo(novoVeiculo);
    res.json(veiculoCriado);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para obter um veículo por ID
router.get('/:id', async (req, res) => {
  const veiculoId = req.params.id;
  try {
    const veiculo = await veiculoModels.obterVeiculoPorId(veiculoId);
    res.json(veiculo);
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para atualizar um veículo
router.put('/:id', async (req, res) => {
  const veiculoId = req.params.id;
  const novosDados = req.body; // Certifique-se de enviar os novos dados no corpo da requisição
  try {
    const veiculoAtualizado = await veiculoModels.atualizarVeiculo(veiculoId, novosDados);
    res.json(veiculoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para excluir um veículo
router.delete('/:id', async (req, res) => {
  const veiculoId = req.params.id;
  try {
    await veiculoModels.excluirVeiculo(veiculoId);
    res.json({ mensagem: 'Veículo excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para buscar fotos por idVeiculo
router.get('/fotos/:idVeiculo', async (req, res) => {
  const idVeiculo = req.params.idVeiculo;

  try {
    console.log('Rota de fotos acessada para veículo ID:', idVeiculo);
    const fotos = await veiculoModels.obterFotosPorVeiculoId(idVeiculo);
    console.log('Fotos obtidas:', fotos);
    res.json(fotos);
  } catch (error) {
    console.error('Erro ao obter fotos por ID de veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
