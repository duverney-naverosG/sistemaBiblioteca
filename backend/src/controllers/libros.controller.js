import { conexion, sql } from "../database/db.js";

const obtenerLibros = async(req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.query("SELECT libros.id, libros.titulo, libros.editorial, libros.stock, libros.imagen, libros.disponible, genero.genero, autor.nombre, autor.apellidos  FROM libros, autor, genero where libros.genero = genero.id AND libros.autor = autor.id");
    res.json(result.recordsets[0])
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerLibro = async(req, res) => {
  let {nombreLibro} = req.body

  try {
    const pool = await conexion();
    if(nombreLibro != null ){
      nombreLibro += '%'
    }else{
      nombreLibro = null
    }

    const result = await pool.input('nombreLibro', sql.VarChar, nombreLibro)
    .query("SELECT libros.id, libros.titulo, libros.editorial, libros.stock, libros.imagen, libros.disponible, genero.genero, autor.nombre, autor.apellidos  FROM libros, autor, genero where libros.genero = genero.id AND libros.autor = autor.id AND libros.titulo LIKE @nombreLibro");

    res.json(result.recordsets[0]);

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerLibroId = async (req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "SELECT * FROM libros WHERE id = @id");

    res.json(result.recordsets[0]);

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const agregarlibro = async(req, res) => {
  const { titulo, editorial, stock, imagen, autor, genero, disponible } = req.body;

  if (titulo == null || editorial == null || stock == null || imagen == null || autor == null || genero == null || disponible == null) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  try {
    const pool = await conexion();
    await pool.input('titulo', sql.VarChar, titulo)
    .input('editorial', sql.VarChar, editorial)
    .input('stock', sql.Int, stock)
    .input('imagen', sql.VarChar, imagen)
    .input('genero', sql.Int, genero)
    .input('autor', sql.Int, autor)
    .input('disponible', sql.Int, disponible)
    .query("INSERT INTO libros (titulo, editorial, stock, genero, imagen, autor, disponible) VALUES (@titulo, @editorial, @stock, @genero, @imagen, @autor, @disponible)");
  
    res.status(200).json({
      'mensaje': 'libro REGISTRADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  };
};

const eliminarLibro = async(req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "DELETE FROM libros WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
          'message': 'ERROR AL ELIMINAR LIBRO'
      });
    }

    res.json({
      'mensaje': 'LIBRO ELIMINADO'
    });

 } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const actualizarLibro = async(req, res) => {
  const { titulo, editorial, stock } = req.body;

  if (titulo == null || editorial == null || stock == null ) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  try {
    const pool = await conexion();
    const  result =  await pool.input('titulo', sql.VarChar, titulo)
    .input('editorial', sql.VarChar, editorial)
    .input('stock', sql.Int, stock)
    .input('id', sql.Int, req.params.id)
    .query("UPDATE libros SET titulo = @titulo, editorial = @editorial, stock = @stock WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ACTUALIZAR'
      });
    } 

    res.status(200).json({
      'mensaje': 'LIBRO ACTUALIZADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  };
};

export {
  obtenerLibros,
  obtenerLibro,
  obtenerLibroId,
  agregarlibro,
  eliminarLibro,
  actualizarLibro
}
