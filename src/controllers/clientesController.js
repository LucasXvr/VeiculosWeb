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

// Controlador para criar um novo cliente
async function criarCliente(req, res) {
    console.log('Chamando a função criarCliente');
    const novoCliente = req.body;
    console.log('Dados do corpo da solicitação:', novoCliente);
  
    try {
      // Certifique-se de ajustar os nomes dos campos de acordo com os que estão no seu formulário HTML
      
      const clienteCriado = await clienteModel.criarCliente(novoCliente);
  
      res.status(201).json(clienteCriado);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }

  // Controlador para obter um cliente por ID
async function obterClientePorId(req, res) {
  console.log('Chamando a função obterClientePorId');
  const clienteId = req.params.id;
  console.log('Dados do corpo da solicitação:', clienteId);

  try {
    const cliente = await clienteModel.obterClientePorId(clienteId);
    
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao obter cliente por ID:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

// Controlador para atualizar um cliente
async function atualizarCliente(req, res) {
  const clienteId = req.params.id;
  const novosDados = req.body; // Certifique-se de enviar os novos dados no corpo da requisição
  try {
    const clienteAtualizado = await clienteModel.atualizarCliente(clienteId, novosDados);
    if (!clienteAtualizado) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    res.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

// Controlador para excluir um cliente
async function excluirCliente(req, res) {
  const clienteId = req.params.id;
  try {
    // Excluir o cliente
    const clienteExcluido = await clienteModel.excluirCliente(clienteId);
    if (!clienteExcluido) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    res.json({ mensagem: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

  module.exports = {
    listarCliente,
    criarCliente,
    obterClientePorId,
    atualizarCliente,
    excluirCliente,
  };
  
  