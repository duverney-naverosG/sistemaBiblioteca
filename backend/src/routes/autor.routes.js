import { Router } from "express";
import { actualizarAutor, agregarAutor, eliminarAutor, obtenerAutor, obtenerAutores, obtenerAutorId } from "../controllers/autor.controller.js";
const router = Router();

router.get('/autor', obtenerAutores);

router.post('/autorBusqueda', obtenerAutor);

router.get('/autorId/:id', obtenerAutorId);

router.post('/autor', agregarAutor);

router.delete('/autor/:id', eliminarAutor);

router.put('/autor/:id', actualizarAutor); 

export default router; 
