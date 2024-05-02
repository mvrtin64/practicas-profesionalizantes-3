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
const obtenerMunicipiosPorDepartamento = async (deparamento_id) => {
  try {
    const sql = 'SELECT * FROM municipio WHERE departamento_deparamento_id = ?';
    const municipios = await new Promise((resolve, reject) => {
      db.query(sql, [deparamento_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Formatear los datos para la respuesta
    const resultado = municipios.map(municipio => ({
      municipio_id: municipio.muncipio_id,
      name: municipio.name
    }));

    return resultado;
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    throw new Error('Error al obtener municipios');
  }
};

module.exports = {
  obtenerMunicipios,
  obtenerMunicipioPorId,
  obtenerMunicipiosPorDepartamento
};
