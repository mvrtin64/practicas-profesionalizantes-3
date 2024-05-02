const express = require('express');
const municipiosController = require('../controllers/municipios');
const db = require('../db');

const router = express.Router();

router.get('/', municipiosController.obtenerMunicipios);
router.get('/:id', municipiosController.obtenerMunicipioPorId);
router.get('/municipios/:departamento_deparamento_id', async (req, res) => {
    try {
      const departamento_id = req.params.departamento_deparamento_id;
      const municipios = await municipiosController.obtenerMunicipiosPorDepartamento(departamento_id);
      res.json(municipios);
    } catch (error) {
      console.error('Error al obtener municipios por departamento:', error);
      res.status(500).json({ error: 'Error al obtener municipios por departamento' });
    }
  });

module.exports = router;
