const express = require('express');
const clienteModel = require('../models/clienteModel');
const path = require('path');
const router = express.Router();

function validateId(req, res, next) {
  const clienteId = req.params.id;
  if (!clienteId || !/^\d+$/.test(clienteId)) {
    return res.status(400).json({ error: 'Formato de ID inválido' });
  }
  next();
}

// Rota para listar clientes
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    try {
      const clientes = await clienteModel.obterTodosClientes(page, pageSize);
      res.json(clientes);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
      res.status(500).send('Erro interno do servidor');
    }
  });
  
// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    console.log('Recebida uma solicitação para POST /clientes');
    console.log('req.body:', req.body);
    const novoCliente = req.body;
    console.log('novoVeiculo:', novoCliente);


    if (!novoCliente || Object.keys(novoCliente).length === 0) {
        console.log('Dados ausentes na solicitação.');
        return res.status(400).json({ erro: 'Corpo da requisição ausente' });
    }

    try {
        // Chame a função para criar cliente no seu modelo (clienteModel.criarCliente)
        const clienteCriado = await clienteModel.criarCliente(novoCliente);
        res.status(201).json(clienteCriado);
    } catch (error) {
        console.error('Erro ao criar veículo:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para renderizar a página de detalhes do cliente por ID
router.get('/:id', validateId, async (req, res) => {
  const clienteId = req.params.id;
  console.log('Recebida uma solicitação para obter veículo por ID:', clienteId);

  try {
    const cliente = await clienteModel.obterClientePorId(clienteId);

    // Verifique se o cliente foi encontrado
    if (!cliente) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    // Envie os detalhes do cliente como JSON
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um cliente
router.put('/:id', async (req, res) => {
  const clienteId = req.params.id;
  const novosDados = req.body; // Certifique-se de enviar os novos dados no corpo da requisição
  try {
    const clienteAtualizado = await clienteModel.atualizarCliente(clienteId, novosDados);
    res.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).send('Erro interno do servidor');
  }
});


// Rota para excluir um cliente
router.delete('/:id', async (req, res) => {
  const clienteId = req.params.id;
  try {
    await clienteModel.excluirCliente(clienteId);
    res.json({ mensagem: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;