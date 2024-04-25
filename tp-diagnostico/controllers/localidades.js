const db = require('../db');

const obtenerLocalidades = (req, res) => {
  const sql = 'SELECT * FROM nombre';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las localidades' });
      return;
    }
    res.json(result);
  });
};

const obtenerLocalidadPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM nombre WHERE name_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener la localidad' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Localidad no encontrada' });
      return;
    }
    res.json(result[0]);
  });
};

module.exports = {
  obtenerLocalidades,
  obtenerLocalidadPorId
};
