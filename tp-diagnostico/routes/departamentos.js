const express = require('express');
const departamentosController = require('../controllers/departamentos');
const db = require('../db');

const router = express.Router();

router.get('/', departamentosController.obtenerDepartamentos);
router.get('/:deparamento_id', departamentosController.obtenerDepartamentoPorId);

// obtener departamentos por provincia
router.get('/', async (req, res) => {
    try {
      // Obtener el id de la provincia desde la solicitud 
      const provincia_id = req.query.provincia_id;
  
      // Llamar a la función del controlador para obtener los departamentos por provincia
      const departamentos = await departamentosController.obtenerDepartamentosPorProvincia(provincia_id);
  
      // Enviar los departamentos como respuesta
      res.json(departamentos);
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      res.status(500).json({ error: 'Error al obtener departamentos' });
    }
  });


module.exports = router;
