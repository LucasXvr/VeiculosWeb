const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Veiculo = require('./veiculoModel'); // Importe Veiculo após a definição do modelo

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

module.exports = Foto;
