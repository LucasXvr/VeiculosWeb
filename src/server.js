const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { Veiculo } = require('./models/veiculoModel');
const veiculosRoutes = require('./routes/veiculosRoutes');
const fotoRouter = require('./routes/fotoRouter');
const path = require('path'); // Adicione esta linha

const app = express();

// Configurar mecanismo de visualização (neste exemplo, estou usando EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
// Configurar CORS para permitir todas as origens (em desenvolvimento)
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/veiculos', (req, res, next) => {
  console.log(`Recebida uma solicitação para ${req.method} ${req.url}`);
  next();
});

// Configurar rotas
app.use('/veiculos', veiculosRoutes);
app.use('/fotos', fotoRouter);

// Rota para renderizar a página de detalhes do veículo por ID
app.get('/veiculos/:id/detalhes', async (req, res) => {
  const veiculoId = req.params.id;
  try {
    const veiculo = await veiculoModels.obterVeiculoPorId(veiculoId);
    res.render('DetalharVeiculos', { veiculo });
  } catch (error) {
    console.error('Erro ao obter veículo por ID:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

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
