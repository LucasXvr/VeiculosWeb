const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Grupo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Unidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PrCusto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Margem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PrVenda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ncm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ativo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CFOP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CEST:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  PrVendaPrazo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  DtCadastro: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  ViaReciboVeiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  RenavamVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  RegistroVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  RntrcVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ExerEmisDocVeiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  PlacaVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ChassiVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  CombustivelVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  FabricacaoVeiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  ModeloVeiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  CorVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  CategoriaVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  EmissaoDocumentoVeiculo: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  LocalRegistroVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  CapPotCilVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  MarcaModeloVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  EspecieVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Observacoes: {
    type: DataTypes.TEXT,
  },
  
  },

  {
    sequelize,
    modelName: 'Veiculo',
    tableName: 'Veiculos', // Nome da tabela no banco de dados
    timestamps: false,
  }
);

// Adicione o método associate para definir associações
Veiculo.associate = (models) => {
  Veiculo.hasMany(models.Foto, { foreignKey: 'VeiculoId' });
};

const obterTodosVeiculos = async () => {
  try {
    const veiculos = await Veiculo.findAll();
    return veiculos;
  } catch (error) {
    console.error('Erro ao obter veículos:', error);
    throw error;
  }
};

const criarVeiculo = async (novoVeiculo) => {
  try {
    const veiculoCriado = await Veiculo.create(novoVeiculo);
    return veiculoCriado;
  } catch (error) {
    throw error;
  }
};

const obterVeiculoPorId = async (veiculoId) => {
  try {
    console.log('Buscando veículo por ID:', veiculoId);
    const veiculo = await Veiculo.findByPk(veiculoId);
    console.log('Veículo encontrado:', veiculo);
    return veiculo;
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    throw error;
  }
};

const atualizarVeiculo = async (veiculoId, novosDados) => {
  try {
    const veiculoAtualizado = await Veiculo.update(novosDados, {
      where: { id: veiculoId },
      returning: true,
      plain: true,
    });
    return veiculoAtualizado[1];
  } catch (error) {
    throw error;
  }
};

const excluirVeiculo = async (veiculoId) => {
  try {
    const veiculoExcluido = await Veiculo.destroy({
      where: { id: veiculoId },
    });
    return veiculoExcluido;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  obterTodosVeiculos,
  obterVeiculoPorId,
  criarVeiculo,
  atualizarVeiculo,
  excluirVeiculo,
  Veiculo,
};
