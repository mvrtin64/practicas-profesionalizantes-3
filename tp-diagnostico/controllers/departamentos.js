const db = require('../db');

// consultar todos los departamentos 
const obtenerDepartamentos = (req, res) => {
  const sql = 'SELECT * FROM departamento';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los departamentos' });
      return;
    }
    res.json(result);
  });
};

// obtengo departamento por id
const obtenerDepartamentoPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM departamento WHERE deparamento_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el departamento' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Departamento no encontrado' });
      return;
    }
    res.json(result[0]);
  });
};

module.exports = {
  obtenerDepartamentos,
  obtenerDepartamentoPorId
};
