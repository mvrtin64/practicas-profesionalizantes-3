const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mtnmind',
    database: 'diagnostico-ppiii'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Conectado a la base de datos MySQL');
  });

  module.exports = db;