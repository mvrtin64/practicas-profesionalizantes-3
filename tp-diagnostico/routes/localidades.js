const express = require('express');
const db = require('../db');
const localidadesController = require('../controllers/localidades');

const router = express.Router();

// rutas para las localidades
router.get('/', localidadesController.obtenerLocalidades);
router.get('/:name_id', localidadesController.obtenerLocalidadPorId);

module.exports = router;
