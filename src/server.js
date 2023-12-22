const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const veiculosRoutes = require('./routes/veiculosRoutes');
const fotoRouter = require('./routes/fotoRouter');
const clienteRouter = require('./routes/clienteRouter');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/veiculos', veiculosRoutes);
app.use('/fotos', fotoRouter);
app.use('/clientes', clienteRouter);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    console.log('Sincronizando modelos com o banco de dados...');
    await sequelize.sync();
    console.log('Sincronização concluída.');

    app.listen(port, () => {
      console.log(`Servidor está ouvindo na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();
