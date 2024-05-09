const express = require('express');
const mysql = require('mysql');
const path = require('path');
const db = require('./db');
const app = express();
const accountsRouter = require('./routes/accounts');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/accounts', accountsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


// endpoints
app.get('/api/accounts', (req, res) => {
    const sql = 'SELECT id, username, salary FROM account';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al obtener las cuentas', error: err.message });
      } else {
        res.json(result);
      }
    });
  });

  app.get('/api/accounts/:id', (req, res) => {
    const { id } = req.params.id;
    const sql = 'SELECT * FROM account WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener la cuenta', error: err.message });
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]); // Devuelve la primera fila encontrada
            } else {
                res.status(404).json({ message: 'No se encontró la cuenta con la ID especificada' });
            }
        }
    });
});



const PORT = process.env.PORT || 3000;app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});