import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import { URL_API } from '../../config/URL.js';
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer'
import AdminU from '../../components/admin/AdminU.jsx';

function Admin() {

    const [admin, setAdmin] = useState({fechaNacimiento: dayjs(new Date())});
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    const cargarAdmin = async () => {
        try {
            const { data } = await axios.get(URL_API + '/usuarios');
            setAdmins(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const hadleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (admin != null) {
            setLoading(true);

            const res = await axios.post(URL_API + '/register/admin', admin);

            if (res.status === 500 || res.status === 400) {
                toast.error('ERROR');
            }

            if (res.status === 200) {
                toast.success('admin agregado');
                e.target.reset();
                setAdmin({});
            }

            setLoading(false);
            cargarAdmin();
        }
    }

    const hadleEditarForm = async () => {
        setLoading(true);
        const res = await axios.put(URL_API + `/usuarios/${admin.id}`, admin);

        if (res.status === 500 || res.status === 400) {
            toast.error('ERROR');
        }

        if (res.status === 200) {
            toast.success('admin actualizado');
            hadleLimpiar();
            setLoading(false);
        }

        cargarAdmin();
    }

    const hadleEditar = async (id) => {
        setIsModif(true);
        const { data } = await axios.get(URL_API + `/usuarios/${id}`);
        setAdmin({ ...data, fechaNacimiento: dayjs(data.fechaNacimiento)})
    }

    const hadleEliminar = (id) => {
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "accion no revesible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, eliminar!'

        }).then((result) => {
            if (result.isConfirmed) {
                eliminar(id);
            }
        });
    }

    const eliminar = async (id) => {
        const res = await axios.delete(URL_API + `/usuarios/${id}`)

        if (res.status === 500) {
            toast.error('ERROR');
        }

        if (res.status === 200) {
            toast.success('admin eliminado');
        }
        cargarAdmin();
    }

    const hadleLimpiar = () => {
        setAdmin({rol : 'admin', fechaNacimiento: dayjs(new Date())});
        setIsModif(false);
    }

    useEffect(() => {
        setLoading(true);
        cargarAdmin();

    }, []);

    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography component="h1" variant="h5" align='center' sx={{ my: 2 }}>
                    ADMINISTRADORES  <AdminPanelSettingsIcon />
                </Typography>

            </Box>

            <Grid container spacing={2}>

                <Grid item xs={12} md={7} sx={{ mt: 3 }}>
                {loading ? (<Skeleton variant="rounded" height={200} />) : (admins.length === 0 ? (
                        <Typography component="h1" variant="subtitle1" align='center' sx={{ my: 2 }}>
                            no se encuentran autores.... <CircularProgress color="error" />
                        </Typography>
                    ) : (
                    <TableContainer sx={{ ml: 2 }} component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead sx={{ bgcolor: 'info.main' }} >
                                <TableRow  >
                                    <TableCell align="right" >ID</TableCell>
                                    <TableCell align="right">IDENTIFICACION</TableCell>
                                    <TableCell align="right">NONBRE</TableCell>
                                    <TableCell align="right">APELLIDOS</TableCell>
                                    <TableCell align="center">F. NACIMIENTO</TableCell>
                                    <TableCell align="right">CORREO</TableCell>
                                    <TableCell align="center">ACCION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    admins.map((admin, index)=>(
                                        <AdminU key={index} admin={admin} eliminar={hadleEliminar} editar={hadleEditar}/>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )
                )}
                </Grid>

                <Grid item xs={12} md={4} sx={{ ml: 2, mt: 2 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="Identificacion" autoFocus name='identificacion' autoComplete='off' value={admin.identificacion ? admin.identificacion : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Nombre" name='nombre' autoComplete='off' value={admin.nombre ? admin.nombre : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Apellidos" name='apellidos' autoComplete='off' value={admin.apellidos ? admin.apellidos : ""} onChange={hadleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateField', 'DateField']}>
                                        <DateField label="fecha nacimiento" required fullWidth value={admin.fechaNacimiento} format="DD-MM-YYYY" onChange={(newValue) => setAdmin({ ...admin, fechaNacimiento: newValue.toISOString()}) } />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="correo" name="correo"  autoComplete='off' value={admin.correo ? admin.correo : ""} onChange={hadleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="contraseña" type="password" name="password" autoComplete='off' value={admin.password ? admin.password : ""} onChange={hadleChange} />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', }}>
                        {isModif ?
                                (
                                    <LoadingButton type="reset" onClick={() => hadleEditarForm()} sx={{ mr: 2 }} color="warning" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                        <span>ACTUALIZAR</span>
                                    </LoadingButton>
                                ) : (
                                    <LoadingButton type="submit" sx={{ mr: 2 }} color="success" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                        <span>AGREGAR</span>
                                    </LoadingButton>
                                )
                            }

                            <Button variant="contained" onClick={() => hadleLimpiar()} color="error">CANCELAR</Button>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

            <Footer sx={{ mt: 5, mb:2 }} />
        </Box>
    );
}

export default Admin;