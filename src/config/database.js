const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('adilson_e2motors', 'adilson_host', 'FqMKUh4-LPd-', {
  host: '67.23.238.20',
  dialect: 'mysql',
});

module.exports = sequelize;
