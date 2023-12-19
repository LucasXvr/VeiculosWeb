const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Foto = sequelize.define(
  'Foto',
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    VeiculoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NomeArquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Foto',
    tableName: 'Fotos',
    timestamps: false,
  }
);

// Adicione o método associate para definir associações
Foto.associate = (models) => {
  Foto.belongsTo(models.Veiculo, { foreignKey: 'VeiculoId' });
};

const obterFotosPorVeiculoId = async (veiculoId) => {
  try {
    const fotos = await Foto.findAll({
      where: { VeiculoId: veiculoId },
      attributes: ['Id', 'NomeArquivo'],
    });
    return fotos;
  } catch (error) {
    console.error('Erro ao obter fotos por VeiculoId:', error);
    throw error;
  }
};

module.exports = { obterFotosPorVeiculoId, Foto };
