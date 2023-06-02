import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import { config } from "dotenv";
import usuariosRouter from "./routes/usuarios.routes.js";
import prestamosRouter from './routes/prestamo.routes.js';
import librosRouter from './routes/libros.routes.js';
import generosRouter from './routes/genero.routes.js'
import autorRouter from './routes/autor.routes.js'
import authRouter from './routes/auth.routes.js'

//config
const app = express();
config();

//middewale
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

//rutas principales de la API
app.use('/api', usuariosRouter);
app.use('/api', prestamosRouter);
app.use('/api', librosRouter);
app.use('/api', generosRouter);
app.use('/api', autorRouter);
app.use('/api', authRouter);

//puerto
app.listen(process.env.PORT || 3000, () => {
  console.log(`puerto encendido en el puerto ${process.env.PORT} 🪐🛸🚀🌍`);
});
