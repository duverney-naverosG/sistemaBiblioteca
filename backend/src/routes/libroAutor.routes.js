import { Router } from "express";
import { agregarlibroAutor, eliminarLibroAutor, obtenerLibroAutor, obtenerLibrosAutor, actualizarLibroAutor } from "../controllers/libroAurtor.controller.js";
const router = Router();

router.get('/libroAutor', obtenerLibrosAutor);

router.get('/libroAutor/:id', obtenerLibroAutor);

router.post('/libroAutor', agregarlibroAutor);

router.delete('/libroAutor/:id', eliminarLibroAutor);

router.put('/libroAutor/:id', actualizarLibroAutor);

export default router; 