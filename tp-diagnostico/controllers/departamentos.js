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

const obtenerDepartamentosPorProvincia = async (provincia_provincia_id) => {
  try {
    const sql = 'SELECT * FROM departamento WHERE provincia_provincia_id = ?';
    const departamentos = await new Promise((resolve, reject) => {
      db.query(sql, [provincia_provincia_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Formatear los datos para la respuesta
    const resultado = departamentos.map(departamento => ({
      departamento_id: departamento.deparamento_id,
      name: departamento.name,
      provincia_provincia_id: departamento.provincia_provincia_id
    }));

    return resultado;
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    throw new Error('Error al obtener departamentos');
  }
};


module.exports = {
  obtenerDepartamentos,
  obtenerDepartamentoPorId,
  obtenerDepartamentosPorProvincia
};
