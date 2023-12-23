const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CPFCNPJ: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RGIE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NomeFantasia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Complemento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CEP: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    WhatsApp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fone1: {
      type: DataTypes.STRING,
    },
    Fone2: {
      type: DataTypes.STRING,
    },
    Fone3: {
      type: DataTypes.STRING,
    },
    Classificacao: {
      type: DataTypes.STRING,
    },
    Observacoes: {
      type: DataTypes.TEXT,
    },

    },

    {
    sequelize,
    modelName: 'Cliente',
    tableName: 'Cliente', // Nome da tabela no banco de dados
    timestamps: false,
    }                       
);

const obterTodosClientes = async () => {
    try {
      const clientes = await Cliente.findAll();
      return clientes;
    } catch (error) {
      console.error('Erro ao obter veículos:', error);
      throw error;
    }
  };
  
  const criarCliente = async (novoCliente) => {
    try {
      const clienteCriado = await Cliente.create(novoCliente);
      return clienteCriado;
    } catch (error) {
      throw error;
    }
  };

  const obterClientePorId = async (clienteId) => {
    try {
      console.log('Buscando veículo por ID:', clienteId);
      const cliente = await Cliente.findByPk(clienteId);
      console.log('Veículo encontrado:', cliente);
      return cliente;
    } catch (error) {
      console.error('Erro ao obter veículo por ID:', error);
      throw error;
    }
  };

  const atualizarCliente = async (clienteId, novosDados) => {
    try {
      const clienteAtualizado = await Cliente.update(novosDados, {
        where: { Id: clienteId },
        returning: true,
        plain: true,
      });
      return clienteAtualizado[1];
    } catch (error) {
      throw error;
    }
  };

  const excluirCliente = async (clienteId) => {
    try {
      const clienteExcluido = await Cliente.destroy({
        where: { id: clienteId },
      });
      return clienteExcluido;
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    obterTodosClientes,
    criarCliente,
    obterClientePorId,
    atualizarCliente,
    excluirCliente,
    Cliente,
  };