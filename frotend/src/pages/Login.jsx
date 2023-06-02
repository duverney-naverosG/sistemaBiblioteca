import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { URL_API } from '../config/URL.js';
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

import imagenfondo from '../assets/images/fondo-login.jpg'
import Footer from '../components/Footer';

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(false);

    const hadleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (usuario != null) {
            setLoading(true);

            const res = await fetch(URL_API + '/login', {
                method: 'POST',
                body: JSON.stringify(usuario),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();

            if (res.status === 404) {
                toast.error('CREDENCIALES EQUIVOCADAS');
            }

            if (res.status === 500) {
                toast.error('ERROR INTERNO');
            }

            if (res.status === 200) {
                setLoading(false);
                e.target.reset();
                toast.success('SESION INICIADA');
                Cookies.set('SistemaBibliotecaUser', JSON.stringify({'id':data.id, 'rol':data.rol, 'identificacion':data.identificacion}));
                if(data.rol === 'usuario'){
                    navigate("/user");
                }

                if(data.rol === 'admin'){
                    navigate("/admin/");
                }
            }

            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Typography component="h1" variant="h5" align='center'>
                        BIENVENIDO - SISTEMA BIBLIOTECARIO
                    </Typography>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                        <Avatar src="/broken-image.jpg" sx={{ m: 1, width: 80, height: 80 }} />
                        <Typography component="h3" variant="h6">
                            INICIAR SESION
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth label="Correo" name="correo" autoFocus autoComplete="off" value={usuario.correo ? usuario.correo : ""} onChange={hadleChange}/>
                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" value={usuario.password ? usuario.password : ""} onChange={hadleChange} />

                            <LoadingButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }} loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                <span>REGISTRAR</span>
                            </LoadingButton>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button component={Link} to="/registro" variant="body2">
                                        {"No tienes una cuenta? crea una"}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Footer sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: `url(${imagenfondo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', }} />
            </Grid>
        </ThemeProvider>
    );
}