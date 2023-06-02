import bcrypt from 'bcrypt';
import { conexion, sql } from "../database/db.js";

const login = async (req, res) => {
    try {
        const pool = await conexion();
        const result = await pool.input('correo', sql.VarChar, req.body.correo)
            .query("SELECT * FROM usuarios WHERE correo = @correo");

        if (result.recordsets[0].length == 0) {
            return res.status(404).json({
                'mensaje': 'el usuario no esta registrado'
            })
        }

        const validacion = await bcrypt.compare(
            req.body.password,
            result.recordsets[0][0].password
        );

        if (!validacion) {
            return res.status(404).json("credenciales equivocadas!");
        }

        res.status(200).json(result.recordsets[0][0]);

    } catch (err) {
        res.status(500).json(err);
    }
};

export {
    login
};