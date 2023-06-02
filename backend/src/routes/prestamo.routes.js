import { Router } from "express";
import { actualizarPrestamo, agregarPrestamo, eliminarPrestamo, obtenerPrestamo, obtenerPrestamos, obtenerPrestamoId } from "../controllers/prestamo.controller.js";
const router = Router();

router.get('/prestamos', obtenerPrestamos);

router.get('/prestamos/:id', obtenerPrestamo);

router.get('/prestamosId/:id', obtenerPrestamoId);

router.post('/prestamos', agregarPrestamo);

router.delete('/prestamos/:id/:cant/:idLibro', eliminarPrestamo);

router.put('/prestamos/:id', actualizarPrestamo);

export default router;