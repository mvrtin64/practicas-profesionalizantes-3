const db = require('../db');

// consultar todos los municipios
const obtenerMunicipios = (req, res) => {
  const sql = 'SELECT * FROM municipio';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los municipios' });
      return;
    }
    res.json(result);
  });
};

// obtener municipio por id
const obtenerMunicipioPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM municipio WHERE muncipio_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el municipio' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Municipio no encontrado' });
      return;
    }
    res.json(result[0]);
  });
};

module.exports = {
  obtenerMunicipios,
  obtenerMunicipioPorId
};
