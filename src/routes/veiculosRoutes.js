const express = require('express');
const veiculoModels = require('../models/veiculoModel');
const path = require('path');
const router = express.Router();

function validateId(req, res, next) {
  const veiculoId = req.params.id;
  if (!veiculoId || !/^\d+$/.test(veiculoId)) {
    return res.status(400).json({ error: 'Formato de ID inválido' });
  }
  next();
}

// Rota para listar veículos
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const veiculos = await veiculoModels.obterTodosVeiculos(page, pageSize);
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao obter veículos:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para criar um novo veículo
router.post('/', async (req, res) => {
  console.log('Recebida uma solicitação para POST /veiculos');
  console.log('req.body:', req.body);
  const novoVeiculo = req.body;
  console.log('novoVeiculo:', novoVeiculo);


  if (!novoVeiculo || Object.keys(novoVeiculo).length === 0) {
    console.log('Dados ausentes na solicitação.');
    return res.status(400).json({ erro: 'Corpo da requisição ausente' });
  }

  try {
    // Chame a função para criar veículo no seu modelo (veiculoModels.criarVeiculo)
    const veiculoCriado = await veiculoModels.criarVeiculo(novoVeiculo);
    res.status(201).json(veiculoCriado);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para renderizar a página de detalhes do veículo por ID
router.get('/:id', validateId, async (req, res) => {
  const veiculoId = req.params.id;
  console.log('Recebida uma solicitação para obter veículo por ID:', veiculoId);

  try {
    const veiculo = await veiculoModels.obterVeiculoPorId(veiculoId);

    // Verifique se o veículo foi encontrado
    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    // Envie os detalhes do veículo como JSON
    res.json(veiculo);
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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

module.exports = router;
