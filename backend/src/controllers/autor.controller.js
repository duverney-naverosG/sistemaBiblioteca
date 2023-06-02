import { conexion, sql } from "../database/db.js";

const obtenerAutores = async(req, res) => {
  const pool = await conexion();
  const result = await pool.query("SELECT * FROM autor");
  res.json(result.recordsets[0])
};

const obtenerAutor = async (req, res) => {
  let { busqueda } = req.body

  if (busqueda != null) {
    busqueda += '%'
  } else {
    busqueda = null
  }

  try {
    const pool = await conexion();
    const result = await pool.input('busqueda', sql.VarChar, busqueda)
      .query("SELECT * FROM autor WHERE autor.nombre LIKE @busqueda OR autor.apellidos LIKE @busqueda");


    res.json(result.recordsets[0]);

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerAutorId = async(req, res) => {
  
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query("SELECT * FROM autor WHERE id = @id");
  
    if(result.recordsets[0].length == 0){
      return res.json({
        'mensaje': 'el autor no esta registrado'
      })
    }

    res.json(result.recordsets[0][0]);

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const agregarAutor = async(req, res) => {
  const { nombre, apellidos, nacionalidad } = req.body;

  if (nombre == null || apellidos == null || nacionalidad == null ) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  try {
    const pool = await conexion();
    await pool.input('nombre', sql.VarChar, nombre)
    .input('apellidos', sql.VarChar, apellidos)
    .input('nacionalidad', sql.VarChar, nacionalidad)
    .query("INSERT INTO autor (nombre, apellidos, nacionalidad) VALUES (@nombre, @apellidos, @nacionalidad)");
  
    res.status(200).json({
      'mensaje': 'AUTOR REGISTRADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  };
};

const eliminarAutor = async(req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "DELETE FROM autor WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ELIMINAR AUTOR'
      });
    }

    res.json({
      'mensaje': 'AUTOR ELIMINADO'
    });
    
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const actualizarAutor = async(req, res) => {
  const { nombre, apellidos, nacionalidad } = req.body;

  if (nombre == null || apellidos == null || nacionalidad == null ) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  try {
    const pool = await conexion();
    const  result = await pool.input('nombre', sql.VarChar, nombre)
    .input('apellidos', sql.VarChar, apellidos)
    .input('nacionalidad', sql.VarChar, nacionalidad)
    .input('id', sql.Int, req.params.id)
    .query("UPDATE autor SET nombre = @nombre , apellidos = @apellidos , nacionalidad = @nacionalidad WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ACTUALIZAR'
      });
    } 
    
    res.status(200).json({
      'mensaje': 'AUTOR ACTUALIZADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  };
};

export {
  obtenerAutores,
  obtenerAutor, 
  obtenerAutorId,
  agregarAutor, 
  eliminarAutor, 
  actualizarAutor
}