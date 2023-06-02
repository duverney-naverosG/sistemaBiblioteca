import { Router } from "express";
import { actualizarLibro, agregarlibro, eliminarLibro, obtenerLibro, obtenerLibros, obtenerLibroId } from "../controllers/libros.controller.js";
const router = Router();

router.get('/libros', obtenerLibros);

router.post('/librosNombre', obtenerLibro);

router.get('/libros/:id', obtenerLibroId);

router.post('/libros', agregarlibro);

router.delete('/libros/:id', eliminarLibro);

router.put('/libros/:id', actualizarLibro);

export default router;