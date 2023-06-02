import { Router } from "express";
import {agregarUsuario, agregarAdmin} from "../controllers/usuario.controller.js";
import {login} from "../controllers/auth.controller.js"

const router = Router();

router.post('/register/usuarios', agregarUsuario);

router.post('/register/admin', agregarAdmin);

router.post('/login', login);

export default router;