import { Router } from "express";
import { obtenerUsuarios, obtenerUsuario, agregarUsuario, eliminarUsuario, actualizarUsuario} from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);

router.get("/usuarios/:id", obtenerUsuario);

router.post("/usuarios", agregarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

router.put("/usuarios/:id", actualizarUsuario);

export default router;
