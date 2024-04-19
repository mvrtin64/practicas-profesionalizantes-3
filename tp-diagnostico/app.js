const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mtnmind',
  database: 'mydb'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Definir un endpoint para obtener todas las provincias
app.get('/api/provincias', (req, res) => {
  const sql = 'SELECT * FROM provincia';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
