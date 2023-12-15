const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/fotoController');

router.post('/upload/:idVeiculo', fotoController.uploadFoto);

module.exports = router;