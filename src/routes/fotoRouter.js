const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/fotoController');

router.get('/fotos/:veiculoId', fotoController.obterFotosPorVeiculoId);

// Implemente outras rotas para adicionar, editar e excluir fotos

module.exports = router;