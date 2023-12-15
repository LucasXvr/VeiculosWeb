const Veiculo = require('../models/veiculoModel');
const Foto = require('../models/fotoModel');

const uploadFoto = async (req, res) => {
  try {
      const idVeiculo = req.params.idVeiculo;
      const nomeArquivo = req.file.filename;

      // Salve os detalhes da foto no banco de dados
      await Foto.create({ VeiculoId: idVeiculo, NomeArquivo: nomeArquivo });

      res.status(201).json({ message: 'Foto adicionada com sucesso.' });
  } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      res.status(500).json({ message: 'Erro ao fazer upload da foto.' });
  }
};

module.exports = { uploadFoto };