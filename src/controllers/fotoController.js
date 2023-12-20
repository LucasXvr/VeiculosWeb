const Foto = require('../models/fotoModel');

const uploadFoto = async (req, res) => {
  console.log('VeiculoId:', req.params.veiculoId);
  console.log('Arquivos recebidos:', req.files);

  try {
    const veiculoId = req.params.veiculoId;

    // Certifique-se de que há um veículoId e que o array de fotos está presente
    if (!veiculoId || !req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Veículo ID ou fotos ausentes.' });
    }

    // Iterar sobre os arquivos e salvar as informações na base de dados
    for (const file of req.files) {
      const fotoData = {
        VeiculoId: veiculoId,
        NomeArquivo: file.filename,
      };

      // Salvar informações da foto no banco de dados
      await Foto.create(fotoData);
    }

    console.log('Fotos salvas com sucesso.');

    res.status(201).json({ message: 'Fotos adicionadas com sucesso.' });
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    res.status(500).json({ message: 'Erro ao fazer upload da foto.' });
  }
};

// Método para obter fotos por VeiculoId
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

module.exports = { uploadFoto, obterFotosPorVeiculoId };