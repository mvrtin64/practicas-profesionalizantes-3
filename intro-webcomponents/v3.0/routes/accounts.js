const express = require('express');
const router = express.Router();
const accounts = require('../controllers/accounts');

// listar 
router.get('/', accounts.getAllAccounts);

// crear
router.post('/', accounts.createAccount);

// editar cuenta
router.put('/:id', accounts.updateAccount);

// eliminar 
router.delete('/:id', accounts.deleteAccount);

// verificar existencia de id
router.get('/:id', accounts.checkAccountExists);

module.exports = router;
