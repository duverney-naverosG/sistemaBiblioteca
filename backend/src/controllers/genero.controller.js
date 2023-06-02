import { conexion, sql } from "../database/db.js";

const obtenerGeneros = async(req, res) => {
  const pool = await conexion();
  const result = await pool.query("SELECT * FROM genero");
  res.json(result.recordsets[0])
};

const agregarGenero = async(req, res) => {
  const { genero } = req.body;

  if (genero == null ) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  try {
    const pool = await conexion();
    await pool.input('genero', sql.VarChar, genero)
    .query("INSERT INTO genero (genero) VALUES (@genero)");
  
    res.status(200).json({
      'mensaje': 'GNERO REGISTRADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  };
};

const eliminarGenero = async(req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "DELETE FROM genero WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
          'message': 'ERROR AL ELIMINAR GENERO'
      });
    }

    res.json({
      'mensaje': 'GENERO ELIMINADO'
    });

 } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const actualizargenero = async(req, res) => {
  const { genero } = req.body;

  if (genero == null ) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  try {
    const pool = await conexion();
    const  result =  await pool.input('genero', sql.VarChar, genero)
    .input('id', sql.Int, req.params.id)
    .query("UPDATE genero SET genero = @genero WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ACTUALIZAR'
      });
    }
     
    res.status(200).json({
      'mensaje': 'GENERO ACTUALIZADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  };
};

export {
  obtenerGeneros,
  agregarGenero,
  eliminarGenero,
  actualizargenero
}