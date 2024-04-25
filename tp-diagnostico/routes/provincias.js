const express = require('express');
const db = require('../db');
const provinciasController = require('../controllers/provincias');

const router = express.Router();

// rutas para las provincias
router.get('/', provinciasController.obtenerProvincias);
router.get('/:provincia_id', provinciasController.obtenerProvinciaPorId);

module.exports = router;
