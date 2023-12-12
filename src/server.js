const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { Veiculo } = require('./models/veiculoModels');
const veiculosRoutes = require('./routes/veiculosRoutes');

const app = express();

// Configurar CORS para permitir todas as origens (em desenvolvimento)
app.use(cors());

// Configurar rotas
app.use('/veiculos', veiculosRoutes);

// Inicializar a conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    console.log('Sincronizando modelos com o banco de dados...');
    // Sincronizar modelos com o banco de dados
    await sequelize.sync();
    console.log('Sincronização concluída.');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor está ouvindo na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();
