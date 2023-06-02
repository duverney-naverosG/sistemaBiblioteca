import { conexion, sql } from "../database/db.js";

const obtenerLibrosAutor = async(req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.query("SELECT autor_libro. id, libros.id, libros.titulo, autor.nombre, autor.apellidos FROM libros, autor, autor_libro WHERE autor_libro.libro = libros.id AND autor_libro.autor= autor.id;");
    res.json(result.recordsets[0]);
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerLibroAutor = async(req, res) => {
  let {nombreAutor, apellidoAutor, titulo} = req.body

  if(titulo != null ){
    titulo += '%'
  }else{
    titulo = null
  }

  if(apellidoAutor != null){
    apellidoAutor+='%'
  }else if(apellidoAutor === " "){ 
    apellidoAutor = null
  }else{
    apellidoAutor= null
  }

  if(nombreAutor != null){
    nombreAutor += '%'
  }else if(nombreAutor === " "){
    nombreAutor = null
  }else{
    nombreAutor = null
  }

  try {
    const pool = await conexion();
    const idLibro = await pool.input('nombreLibro', sql.VarChar, titulo)
    .query("SELECT * FROM libros  WHERE libros.titulo LIKE @nombreLibro ");
  
    const idAutor = await pool.input('nombre', sql.VarChar, nombreAutor)
    .input('apellido', sql.VarChar, apellidoAutor)
    .query("SELECT * FROM autor WHERE autor.nombre LIKE @nombre OR autor.apellidos LIKE @apellido");
  
    if(idLibro.rowsAffected[0] <= 0 && idAutor.rowsAffected[0] <= 0){
      return res.json({
        'mensaje': 'autor y libro no registrado'
      })
    }
  
    if(idLibro.rowsAffected[0] > 0){
      const id = await pool.input('id', sql.Int, idLibro.recordsets[0][0].id)
      .query("SELECT * FROM autor_libro WHERE autor_libro.libro = @id;");
  
      if(id.rowsAffected <= 0){
        return res.status(400).json({
          'mensaje': 'no hay autores registrados con el nombre del libro'
        })
      }
  
      const result = await pool.input('idLibroAutor', sql.Int, id.recordsets[0][0].id)
      .input('idAutor', sql.Int, id.recordsets[0][0].autor)
      .input('idLibro', sql.Int, id.recordsets[0][0].libro)
      .query("SELECT libros.id, libros.titulo, autor.id,autor.nombre, autor.apellidos FROM libros, autor, autor_libro WHERE autor_libro.autor = @idAutor AND autor_libro.libro=@idLibro AND autor.id = @idAutor AND libros.id=@idLibro;");
      res.json(result.recordsets)
  
    }else{
      const id = await pool.input('id', sql.Int, idAutor.recordsets[0][0].id)
      .query("SELECT * FROM autor_libro WHERE autor_libro.autor = @id;");
      
      if(id.rowsAffected <= 0){
        return res.status(400).json({
          'mensaje': 'no hay libros registrado del autor'
        })
      }
  
      const result = await pool.input('idLibroAutor', sql.Int, id.recordsets[0][0].id)
      .input('idAutor', sql.Int, id.recordsets[0][0].autor)
      .input('idLibro', sql.Int, id.recordsets[0][0].libro)
      .query("SELECT libros.id, libros.titulo, autor.id,autor.nombre, autor.apellidos FROM libros, autor, autor_libro WHERE autor_libro.autor = @idAutor  AND autor.id = @idAutor AND libros.id = autor_libro.libro;");
      res.json(result.recordsets)
    };
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const agregarlibroAutor = async(req, res) => {
  let {nombreAutor, apellidoAutor, titulo} = req.body

  if(titulo != null ){
    titulo += '%'
  }else{
    titulo = null
  }

  if(apellidoAutor != null){
    apellidoAutor+='%'
  }else if(apellidoAutor === " "){ 
    apellidoAutor = null
  }else{
    apellidoAutor= null
  }

  if(nombreAutor != null){
    nombreAutor += '%'
  }else if(nombreAutor === " "){
    nombreAutor = null
  }else{
    nombreAutor = null
  }

  try {
    const pool = await conexion();
    const idLibro = await pool.input('nombreLibro', sql.VarChar, titulo)
    .query("SELECT id FROM libros  WHERE libros.titulo LIKE @nombreLibro ");
  
    const idAutor = await pool.input('nombre', sql.VarChar, nombreAutor)
    .input('apellido', sql.VarChar, apellidoAutor)
    .query("SELECT id FROM autor WHERE autor.nombre LIKE @nombre OR autor.apellidos LIKE @apellido");
  
    if(idLibro.rowsAffected[0] <= 0 && idAutor.rowsAffected[0] <= 0){
      return res.json({
        'mensaje': 'autor y libro no registrado',
        'solucion': 'registrar el libro y/o autor'
      })
    }
  
    const result = await pool.input('libro', sql.Int, idLibro.recordsets[0][0].id)
    .input('autor', sql.Int, idAutor.recordsets[0][0].id)
    .query("INSERT INTO autor_libro (libro, autor) VALUES (@libro, @autor)");
    
    res.status(200).json({
      'mensaje': 'AUTOR Y LIBRO REGISTRADO'
    });
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const eliminarLibroAutor = async(req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "DELETE FROM autor_libro WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
          'message': 'ERROR AL ELIMINAR LIBRO AUTOR'
      });
    }

    res.json({
      'mensaje': 'LIBRO AUTOR ELIMINADO'
    });

 } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const actualizarLibroAutor = async(req, res) => {
  let {nombreAutor, apellidoAutor, titulo} = req.body

  if(titulo != null ){
    titulo += '%'
  }else{
    titulo = null
  }

  if(apellidoAutor != null){
  
    apellidoAutor+='%'
  }else if(apellidoAutor === " "){ 
    apellidoAutor = null
  }else{
    apellidoAutor= null
  }

  if(nombreAutor != null){
    nombreAutor += '%'
  }else if(nombreAutor === " "){
    nombreAutor = null
  }else{
    nombreAutor = null
  }

  
  try {
    const pool = await conexion();
    const idLibro = await pool.input('nombreLibro', sql.VarChar, titulo)
    .query("SELECT id FROM libros  WHERE libros.titulo LIKE @nombreLibro ");
  
    const idAutor = await pool.input('nombre', sql.VarChar, nombreAutor)
    .input('apellido', sql.VarChar, apellidoAutor)
    .query("SELECT id FROM autor WHERE autor.nombre LIKE @nombre OR autor.apellidos LIKE @apellido");
  
    if(idLibro.rowsAffected[0] <= 0){
      return res.json({
        'mensaje': 'libro no registrado',
        'solucion': 'registrar el libro '
      })
    }

    if( idAutor.rowsAffected[0] <= 0){
      return res.json({
        'mensaje': 'autor no registrado',
        'solucion': 'registrar el autor '
      })
    }

    const  result =  await pool.input('id_libro', sql.Int, idLibro.recordsets[0][0].id)
    .input('id_autor', sql.Int,  idAutor.recordsets[0][0].id)
    .input('id', sql.Int, req.params.id)
    .query("UPDATE autor_Libro SET libro = @id_libro, autor = @id_autor WHERE id = @id");

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
      })
    }
};

export{
  obtenerLibrosAutor,
  obtenerLibroAutor,
  agregarlibroAutor,
  eliminarLibroAutor,
  actualizarLibroAutor
}