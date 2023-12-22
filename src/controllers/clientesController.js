const clienteModel = require('../models/clienteModel');

// Controlador para listar todos os veículos
async function listarCliente(req, res) {
    try {
      const clientes = await clienteModel.obterTodosClientes();
      res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar veículos:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }

// Controlador para criar um novo veículo
async function criarCliente(req, res) {
    console.log('Chamando a função criarVeiculo');
    const novoCliente = req.body;
    console.log('Dados do corpo da solicitação:', novoCliente);
  
    try {
      // Certifique-se de ajustar os nomes dos campos de acordo com os que estão no seu formulário HTML
      
      const clienteCriado = await clienteModel.criarCliente(novoCliente);
  
      res.status(201).json(clienteCriado);
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }

  module.exports = {
    listarCliente,
    criarCliente,
  };
  
  