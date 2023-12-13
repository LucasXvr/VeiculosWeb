const Foto = require('../models/fotoModel');

exports.obterFotosPorVeiculoId = async (req, res) => {
    const veiculoId = req.params.veiculoId;
  
    try {
      const fotos = await Foto.findAll({ where: { veiculoid: veiculoId } });
      res.json(fotos);
    } catch (error) {
      console.error('Erro ao obter fotos por ID de veículo:', error);
      res.status(500).send('Erro interno do servidor');
    }
  };