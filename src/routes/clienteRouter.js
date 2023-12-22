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
  
// Rota para criar um novo veículo
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
        // Chame a função para criar veículo no seu modelo (veiculoModels.criarVeiculo)
        const clienteCriado = await clienteModel.criarCliente(novoCliente);
        res.status(201).json(clienteCriado);
    } catch (error) {
        console.error('Erro ao criar veículo:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;