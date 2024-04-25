const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();

const provinciasRouter = require('./routes/provincias');
const municipiosRouter = require('./routes/municipios');
const departamentosRouter = require('./routes/departamentos');
const localidadesRouter = require('./routes/localidades');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());  
app.use('/api/provincias', provinciasRouter);
app.use('/api/municipios', municipiosRouter);
app.use('/api/departamentos', departamentosRouter);
app.use('/api/localidades', localidadesRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
