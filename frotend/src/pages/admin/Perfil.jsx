import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Menu from '../../components/admin/Menu';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie'
import { useState, useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { URL_API } from '../../config/URL.js';
import toast from 'react-hot-toast';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';

import dayjs from 'dayjs';
import Footer from '../../components/Footer'

function Perfil() {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    
    const dataUser = JSON.parse(Cookies.get('SistemaBibliotecaUser'))

    const cargarUser = async () => {
        try {
            const { data } = await axios.get(URL_API + `/usuarios/${dataUser.id}`);
            setUser(data);
        } catch (error) {
            toast.error('ERROR');
        }
    }

    const hadleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user != null) {
            setLoading(true);
            const res = await axios.put(URL_API + `/usuarios/${user.id}`, user);

            if (res.status === 500 || res.status === 400) {
                toast.error('ERROR');
            }

            if (res.status === 200) {
                cargarUser()
                toast.success('Perfil actualizado');
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarUser();
    }, []);

    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box sx={{ mx: 'auto', mt: 2, width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                <Avatar src="/broken-image.jpg" sx={{ m: 1, width: 80, height: 80 }} />
                <Typography component="h1" variant="h5">
                    PERFIL
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                                <TextField required fullWidth label="Identificacion" autoFocus name='identificacion' autoComplete='off' value={user.identificacion ? user.identificacion : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Nombre" name='nombre' autoComplete='off' value={user.nombre ? user.nombre : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Apellidos" name='apellidos' autoComplete='off' value={user.apellidos ? user.apellidos : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateField', 'DateField']}>
                                        <DateField label="fecha nacimiento" required fullWidth format="DD-MM-YYYY" value={dayjs(user.fechaNacimiento)} onChange={(newValue) => setUser({ ...user, fechaNacimiento: newValue.toISOString()}) } />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="correo" name="correo"  autoComplete='off' value={user.correo ? user.correo : ""} onChange={hadleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="nueva contraseña" type="password" name="password" autoComplete='off' onChange={hadleChange} />
                            </Grid>
                    </Grid>
                    <LoadingButton type="submit" fullWidth variant="contained" color='warning' sx={{ mt: 3, mb: 2 }} loading={loading} loadingIndicator="CARGANDO">
                        <span>ACTUALIZAR</span>
                    </LoadingButton>
                </Box>
            </Box>
            <Footer sx={{ mt: 5, mb:2 }} />
        </Box>
    );
}

export default Perfil;