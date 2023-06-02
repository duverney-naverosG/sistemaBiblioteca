import { conexion, sql } from "../database/db.js";

const obtenerPrestamos = async (req, res) => {
  const pool = await conexion();
  try {
    const result = await pool.query("SELECT prestamos.id, prestamos.fecha_prestamo, prestamos.fecha_devolucion, prestamos.devuelto, prestamos.cantidad, usuarios.identificacion, usuarios.nombre, usuarios.apellidos, libros.id AS idLibro, libros.titulo FROM prestamos, usuarios, libros WHERE prestamos.usuario_id = usuarios.id AND prestamos.libro_id = libros.id AND prestamos.devuelto = 0 ORDER BY prestamos.id DESC; ");
    res.json(result.recordsets[0]);
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerPrestamo = async (req, res) => {
  const pool = await conexion();
  try {
    const result = await pool.input('identificacion', sql.Int, req.params.id)
      .query("SELECT prestamos.id, prestamos.fecha_prestamo, prestamos.fecha_devolucion, prestamos.devuelto, prestamos.cantidad, usuarios.identificacion, usuarios.nombre, usuarios.apellidos, libros.id AS idLibro, libros.titulo FROM prestamos, usuarios, libros WHERE prestamos.usuario_id = usuarios.id AND prestamos.libro_id = libros.id AND usuarios.identificacion = @identificacion ORDER BY prestamos.id; ");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL OBTENER PRESTAMO'
      });
    }

    res.status(200).json(result.recordsets[0])

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerPrestamoId = async (req, res) => {
  const pool = await conexion();
  try {
    const result = await pool.input('id', sql.Int, req.params.id)
      .query("SELECT prestamos.id, prestamos.fecha_prestamo, prestamos.fecha_devolucion, prestamos.devuelto AS regresado, prestamos.cantidad, usuarios.identificacion ,libros.id AS nombreLibro, libros.titulo FROM prestamos, usuarios, libros WHERE prestamos.usuario_id = usuarios.id AND prestamos.libro_id = libros.id AND prestamos.id = @id; ");
    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL OBTENER PRESTAMO'
      });
    }
    res.json(result.recordsets[0])
  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const agregarPrestamo = async (req, res) => {
  let { fecha_prestamo, fecha_devolucion, identificacion, nombreLibro, cantidad, regresado } = req.body;
  if (fecha_prestamo == null, fecha_devolucion == null, identificacion == null, nombreLibro == null || cantidad == null || regresado == null) {

    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  let idLibro = parseInt(nombreLibro)
  nombreLibro += '%'

  try {
    const pool = await conexion();
    const idUsuario = await pool.input('idUusuario', sql.Int, identificacion)
      .query("SELECT usuarios.id FROM usuarios WHERE usuarios.identificacion = @idUusuario");

    if (idUsuario.rowsAffected[0] <= 0) {
      return res.status(402).json({
        'mensaje': 'usuario no encontrado'
      })
    }

    const result = await pool.input('fechaPrestamo', sql.Date, fecha_prestamo)
      .input('fechaDevolucion', sql.Date, fecha_devolucion)
      .input('idLibro', sql.Int, idLibro)
      .input('idUsuario', sql.Int, idUsuario.recordsets[0][0].id)
      .input('cantidad', sql.Int, cantidad)
      .input('devuelto', sql.Int, regresado)
      .query("INSERT INTO prestamos (fecha_prestamo, fecha_devolucion, usuario_id, libro_id, cantidad, devuelto) VALUES (@fechaPrestamo, @fechaDevolucion, @idUsuario, @idLibro, @cantidad, @devuelto)");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'mensaje': 'prestamo no insertado'
      })
    }

    await pool.input('id', sql.Int, idLibro)
      .input('cant', sql.Int, cantidad)
      .query("UPDATE libros SET libros.stock = libros.stock - @cant  WHERE id = @id");
    res.status(200).json({
      'mensaje': 'PRESTAMO REGISTRADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }


};

const eliminarPrestamo = async (req, res) => {

  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
      .query("DELETE FROM prestamos WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ELIMINAR PRESTAMO'
      });
    }

    await pool.input('cant', sql.Int, req.params.cant)
    pool.input('idLibro', sql.Int, req.params.idLibro)
      .query("UPDATE libros SET libros.stock = libros.stock + @cant  WHERE id = @idLibro");

    res.status(200).json({
      'mensaje': 'PRESTAMO ELIMINADO'
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const actualizarPrestamo = async (req, res) => {
  let { fecha_prestamo, fecha_devolucion, identificacion, nombreLibro, cantidad, cantidadAnterior, regresado } = req.body;
  if (fecha_prestamo == null, fecha_devolucion == null, identificacion == null, nombreLibro == null || cantidad == null || regresado == null) {

    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  let cantidad1 = parseInt(cantidad)
  let identificacion1 = parseInt(identificacion)
  let nombreLibro1 = parseInt(nombreLibro)

  if (cantidad != 0) {
    cantidadAnterior -= cantidad
  }

  try {
    const pool = await conexion();
    const idUsuario = await pool.input('idUusuario', sql.Int, identificacion1)
      .query("SELECT usuarios.id FROM usuarios WHERE usuarios.identificacion = @idUusuario");

    if (idUsuario.rowsAffected[0] <= 0) {
      return res.json({
        'mensaje': 'usuario no encontrado'
      })
    }

    const result = await pool.input('fechaPrestamo', sql.Date, fecha_prestamo)
      .input('fechaDevolucion', sql.Date, fecha_devolucion)
      .input('idLibro', sql.Int, nombreLibro1)
      .input('idUsuario', sql.Int, idUsuario.recordsets[0][0].id)
      .input('cantidad', sql.Int, cantidad1)
      .input('devuelto', sql.Int, regresado)
      .input('id', sql.Int, req.params.id)
      .query("UPDATE prestamos SET fecha_prestamo = @fechaPrestamo , fecha_devolucion = @fechaDevolucion, devuelto = @devuelto, usuario_id = @idUsuario, libro_id = @idLibro, cantidad = @cantidad  WHERE id = @id");

    if (result.rowsAffected.length <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ACTUALIZAR'
      });
    }

    await pool.input('cant', sql.Int, cantidadAnterior)
      .query("UPDATE libros SET libros.stock = libros.stock + @cant  WHERE id = @idLibro");

    res.status(200).json({
      result
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

export {
  obtenerPrestamo,
  obtenerPrestamos,
  obtenerPrestamoId,
  agregarPrestamo,
  eliminarPrestamo,
  actualizarPrestamo
}
