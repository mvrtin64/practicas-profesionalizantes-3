const express = require('express');
const departamentosController = require('../controllers/departamentos');
const db = require('../db');

const router = express.Router();

router.get('/', departamentosController.obtenerDepartamentos);
router.get('/:deparamento_id', departamentosController.obtenerDepartamentoPorId);


module.exports = router;
