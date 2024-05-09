const db = require('../db');

const getAllAccounts = (req, res) => {
  db.query('SELECT * FROM account', (err, accounts) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(accounts);
  });
};

const createAccount = (req, res) => {
  const { id, username, saldo } = req.body;
  db.query('INSERT INTO account (id, username, salary) VALUES (?, ?, ?)', [id, username, saldo], (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'Cuenta creada exitosamente' });
  });
};

const updateAccount = (req, res) => {
  const { id } = req.params;
  const { username, saldo } = req.body;
  db.query('UPDATE account SET username = ?, salary = ? WHERE id = ?', [username, saldo, id], (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json({ message: 'Cuenta actualizada exitosamente' });
  });
};

const deleteAccount = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM account WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json({ message: 'Cuenta eliminada exitosamente' });
  });
};

const checkAccountExists = (req, res) => {
  const { id } = req.params.id;
  try {
      const account = db.query('SELECT * FROM account WHERE id = ?', [id]);
      if (account.length > 0) {
          // la cuenta existe
          res.status(200).json({ exists: true });
      } else {
          // la cuenta no existe
          res.status(404).json({ exists: false });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al verificar la existencia de la cuenta', error: error.message });
  }
}

module.exports = {
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  checkAccountExists
};
