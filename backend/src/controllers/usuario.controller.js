import bcrypt from 'bcrypt';
import { conexion, sql } from "../database/db.js";

const obtenerUsuarios = async (req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.query("SELECT * from usuarios WHERE rol = 'admin'");
    res.json(result.recordsets[0]);

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "SELECT * FROM usuarios WHERE id = @id");

    if(result.recordsets[0].length == 0){
      return res.json({
        'mensaje': 'el usuario no esta registrado'
      })
    }

    res.json(result.recordsets[0][0]);

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const agregarUsuario = async (req, res) => {
  const { identificacion, nombre, apellidos, fechaNacimiento, correo, password} = req.body;
  const rol = 'usuario'

  if (identificacion == null || nombre == null || apellidos == null || fechaNacimiento == null || correo == null || password == null) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
    const pool = await conexion();
    const result = await pool.input('identificacion', sql.Int, identificacion)
    .input('nombre', sql.VarChar, nombre)
    .input('apellidos', sql.VarChar, apellidos)
    .input('fecha_nacimiento', sql.Date, fechaNacimiento)
    .input('correo', sql.VarChar, correo)
    .input('password', sql.VarChar, hashedPass)
    .input('rol', sql.VarChar, rol)
    .query("INSERT INTO usuarios (identificacion, nombre, apellidos, fechaNacimiento, correo, password, rol) VALUES (@identificacion, @nombre, @apellidos, @fecha_nacimiento, @correo, @password, @rol)");

    if(result.rowsAffected<=0){
      return res.status(404).json({
        'mensaje': 'usuario no insertado'
      })
    }

    res.status(200).json({
      'mensaje': 'USUARIO REGISTRADO',
      identificacion,
      nombre,
      apellidos,
      fechaNacimiento,
      correo,
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const agregarAdmin = async (req, res) => {
  const { identificacion, nombre, apellidos, fechaNacimiento, correo, password} = req.body;
  const rol = 'admin'

  if (identificacion == null || nombre == null || apellidos == null || fechaNacimiento == null || correo == null || password == null) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
    const pool = await conexion();
    const result = await pool.input('identificacion', sql.Int, identificacion)
    .input('nombre', sql.VarChar, nombre)
    .input('apellidos', sql.VarChar, apellidos)
    .input('fecha_nacimiento', sql.Date, fechaNacimiento)
    .input('correo', sql.VarChar, correo)
    .input('password', sql.VarChar, hashedPass)
    .input('rol', sql.VarChar, rol)
    .query("INSERT INTO usuarios (identificacion, nombre, apellidos, fechaNacimiento, correo, password, rol) VALUES (@identificacion, @nombre, @apellidos, @fecha_nacimiento, @correo, @password, @rol)");

    if(result.rowsAffected<=0){
      return res.status(404).json({
        'mensaje': 'usuario no insertado'
      })
    }

    res.status(200).json({
      'mensaje': 'USUARIO REGISTRADO',
      identificacion,
      nombre,
      apellidos,
      fechaNacimiento,
      correo,
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const pool = await conexion();
    const result = await pool.input('id', sql.Int, req.params.id)
    .query( "DELETE FROM usuarios WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
          'message': 'ERROR AL ELIMINAR CLIENTE'
      });
    }

    res.json({
      'mensaje': 'USUARIO ELIMINADO'
    });

 } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const { identificacion, nombre, apellidos, fechaNacimiento, correo, password } = req.body;

  if (identificacion == null || nombre == null || apellidos == null || fechaNacimiento == null || correo == null|| password== null) {
    return res.status(400).json({
      mensaje: "llenar todos los campos",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
    const pool = await conexion();
    const result = await pool.input('identificacion', sql.Int, identificacion)
    .input('nombre', sql.VarChar, nombre)
    .input('apellidos', sql.VarChar, apellidos)
    .input('fecha_nacimiento', sql.Date, fechaNacimiento)
    .input('correo', sql.VarChar, correo)
    .input('id', sql.Int, req.params.id)
    .input('password', sql.VarChar, hashedPass)
    .query("UPDATE usuarios SET identificacion = @identificacion, nombre = @nombre, apellidos = @apellidos, fechaNacimiento = @fecha_nacimiento, correo = @correo, password = @password WHERE id = @id");

    if (result.rowsAffected <= 0) {
      return res.status(404).json({
        'message': 'ERROR AL ACTUALIZAR'
      });
    } 

    res.status(200).json({
      'mensaje': 'USUARIO ACTUALIZADO',
      identificacion,
      nombre,
      apellidos,
      fechaNacimiento,
      correo,
    });

  } catch (error) {
    res.status(500).json({
      'mensaje': 'error interno 🚨📢🚩❌‼'
    });
  }
};

export {
  obtenerUsuarios,
  obtenerUsuario,
  agregarUsuario,
  agregarAdmin,
  eliminarUsuario,
  actualizarUsuario,
};
