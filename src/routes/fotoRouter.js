const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/fotoController');
const multer = require('multer');
const path = require('path');
const Foto = require('../models/fotoModel');

//Configuração do Multer para salvar os arquivos na pasta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, '/home/adilson/public_html/images/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({storage: storage});

router.post('/upload/:veiculoId', upload.array('fotos'), (req, res, next) => {
    //Aqui acessa os arquivos enviados através de req.files
    console.log('Original URL:', req.originalUrl);
    console.log('Params:', req.params);
    console.log('Files:', req.files);
    //e o id do veiculo através de req.params.veiculoId
    req.veiculoId = req.params.veiculoId;
    next();
}, fotoController.uploadFoto);

// Rota para obter as fotos de um veículo específico
router.get('/:veiculoId', async (req, res) => {
  try {
    const veiculoId = req.params.veiculoId;
    const fotos = await fotoController.obterFotosPorVeiculoId(veiculoId);
    res.json(fotos);
  } catch (error) {
    console.error('Erro ao obter fotos por veículo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para excluir uma foto de um veículo específico
router.delete('/:veiculoId/:nomeArquivo', async (req, res) => {
  try {
    const veiculoId = req.params.veiculoId;
    const nomeArquivo = req.params.nomeArquivo;

    // Remover a foto do banco de dados
    await Foto.destroy({
      where: { VeiculoId: veiculoId, NomeArquivo: nomeArquivo }
    });

    // Responder com sucesso
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir a foto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;