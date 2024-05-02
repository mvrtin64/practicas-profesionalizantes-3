const db = require('../db');

// consulto las provincias
const obtenerProvincias = (req, res) => {
  const sql = 'SELECT * FROM provincia';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las provincias' });
      return;
    }
    res.json(result);
  });
};

// consulto provincia por id
const obtenerProvinciaPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM provincia WHERE provincia_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener la provincia' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Provincia no encontrada' });
      return;
    }
    res.json(result[0]);
  });
};


module.exports = {
  obtenerProvincias,
  obtenerProvinciaPorId
};
