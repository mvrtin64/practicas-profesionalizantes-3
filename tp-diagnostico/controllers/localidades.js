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

// Consultar localidades por departamento
const obtenerLocalidadesPorDepartamento = async (departamento_id) => {
  try {
      const sql = 'SELECT * FROM localidad WHERE departamento_departamento_id = ?';
      const localidades = await new Promise((resolve, reject) => {
          db.query(sql, [departamento_id], (err, result) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(result);
              }
          });
      });

      // Formatear los datos para la respuesta
      const resultado = localidades.map(localidad => ({
          localidad_id: localidad.localidad_id,
          name: localidad.name
          // Agregar más campos si es necesario
      }));

      return resultado;
  } catch (error) {
      console.error('Error al obtener localidades:', error);
      throw new Error('Error al obtener localidades');
  }
};

module.exports = {
  obtenerLocalidades,
  obtenerLocalidadPorId,
  obtenerLocalidadesPorDepartamento
};
