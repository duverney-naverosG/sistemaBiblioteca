import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import axios from 'axios';
import dayjs from 'dayjs';
import { URL_API } from '../config/URL.js';
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import imagenfondo from '../assets/images/fondo-login.jpg'
import Footer from '../components/Footer';

export default function Register() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({fechaNacimiento: dayjs(new Date())});
    const [loading, setLoading] = useState(false);

    const hadleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (usuario != null) {
            setLoading(true);

            const res = await axios.post(URL_API + '/register/usuarios', usuario);

            if (res.status === 500 || res.status === 400) {
                toast.error('ERROR');
            }

            if (res.status === 200) {
                setLoading(false);
                e.target.reset();
                toast.success('usuario agregado');
                navigate("/");
            }
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: `url(${imagenfondo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', }} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <Avatar src="/broken-image.jpg" sx={{ m: 1, width: 80, height: 80 }} />
                    <Typography component="h1" variant="h5">
                        REGISTRO
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField required fullWidth label="Identificacion" autoFocus name='identificacion' autoComplete='off' value={usuario.identificacion ? usuario.identificacion : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Nombre" name='nombre' autoComplete='off' value={usuario.nombre ? usuario.nombre : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Apellidos" name='apellidos' autoComplete='off' value={usuario.apellidos ? usuario.apellidos : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateField', 'DateField']}>
                                        <DateField label="fecha nacimiento" required fullWidth value={usuario.fechaNacimiento} format="DD-MM-YYYY" onChange={(newValue) => setUsuario({ ...usuario, fechaNacimiento: newValue.toISOString()}) } />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="correo" name="correo"  autoComplete='off' value={usuario.correo ? usuario.correo : ""} onChange={hadleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="contraseña" type="password" name="password" autoComplete='off' value={usuario.password ? usuario.password : ""} onChange={hadleChange} />
                            </Grid>
                        </Grid>

                        <LoadingButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }} loading={loading} loadingIndicator="CARGANDO" variant="contained">
                            <span>REGISTRAR</span>
                        </LoadingButton>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button component={Link} to="/" variant="body2">
                                    {"ya tienes una cuenta? inicia sesion"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Footer sx={{ mt: 5 }} />
            </Grid>
        </Grid>
    );
}