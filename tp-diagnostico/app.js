const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mtnmind',
  database: 'mydb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// endpoints
app.get('/api/provincias', (req, res) => {
  const sql = 'SELECT * FROM provincia';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/api/nombres', (req, res) => {
  const sql = 'SELECT * FROM nombre';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/api/municipios', (req, res) => {
  const sql = 'SELECT * FROM municipio';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/api/departamentos', (req, res) => {
  const sql = 'SELECT * FROM departamento';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});


// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
