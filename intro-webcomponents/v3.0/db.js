const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mtnmind',
    database: 'webcomponents'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Conectado a la base de datos MySQL');
  });

  module.exports = db;