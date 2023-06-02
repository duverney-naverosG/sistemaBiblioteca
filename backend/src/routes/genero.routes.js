import { Router } from "express";
import { actualizargenero, agregarGenero, eliminarGenero, obtenerGeneros } from "../controllers/genero.controller.js";
const router = Router();

router.get('/generos', obtenerGeneros);

router.post('/generos', agregarGenero);

router.delete('/generos/:id', eliminarGenero);

router.put('/generos/:id', actualizargenero);

export default router;