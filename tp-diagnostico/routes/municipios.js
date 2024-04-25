const express = require('express');
const municipiosController = require('../controllers/municipios');
const db = require('../db');

const router = express.Router();

router.get('/', municipiosController.obtenerMunicipios);
router.get('/:id', municipiosController.obtenerMunicipioPorId);


module.exports = router;
