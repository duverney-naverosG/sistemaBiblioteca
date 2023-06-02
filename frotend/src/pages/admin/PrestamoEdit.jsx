import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link, useNavigate, useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState, useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { URL_API } from '../../config/URL.js';
import toast from 'react-hot-toast';

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer'
function PrestamoEdit() {

    let { id } = useParams();
    const date = new Date()
    const date2 = new Date()
    date2.setDate(date.getDate() + 15)
    const navigate = useNavigate();
    const [prestamo, setPrestamo] = useState(
        {
            fecha_prestamo: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            fecha_devolucion: `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`,
            identificacion: 0,
            nombreLibro: '',
            cantidad: 1,
            regresado: 0
        }
    );
    const [Libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    const cargarLibros = async () => {
        try {
            const { data } = await axios.get(URL_API + '/libros');
            setLibros(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const cargarPrestamo = async () => {
        try {
            setIsModif(true);
            const { data } = await axios.get(URL_API + `/prestamosId/${id}`);
            setPrestamo(data[0]);
            setPrestamo({ ...data[0], cantidadAnterior: data[0].cantidad ,fecha_prestamo: data[0].fecha_prestamo.substr(0, 10), fecha_devolucion: data[0].fecha_devolucion.substr(0, 10) })
        } catch (error) {
            toast.error('ERROR');
        }
    }

    const hadleChange = (e) => {
        setPrestamo({ ...prestamo, [e.target.name]: e.target.value });
    }

    const hadleSubmitForm = async (e) => {
        e.preventDefault();
        if (!id) {
            if (prestamo != null) {
                setLoading(true);

                const res = await fetch(URL_API + '/prestamos', {
                    method: 'POST',
                    body: JSON.stringify(prestamo),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (res.status === 500 || res.status === 404) {
                    toast.error('ERROR');
                }

                if (res.status === 400) {
                    toast.error('LLENAR TODOS LOS DATOS');
                }

                if (res.status === 402) {
                    toast.error('USUARIO NO ENCONTRADO');
                }

                if (res.status === 200) {
                    toast.success('prestamo agregado');
                    e.target.reset();
                    setPrestamo({});
                    navigate("../admin/prestamos");
                }
                setLoading(false);
            }
        } else {
            if (prestamo != null) {
                setLoading(true);

                const res = await fetch(URL_API + `/prestamos/${prestamo.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(prestamo),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (res.status === 500 || res.status === 404) {
                    toast.error('ERROR');
                }

                if (res.status === 400) {
                    toast.error('LLENAR TODOS LOS DATOS');
                }

                if (res.status === 402) {
                    toast.error('USUARIO NO ENCONTRADO');
                }

                if (res.status === 200) {
                    toast.success('prestamo actualizado');
                    e.target.reset();
                    setPrestamo({});
                    navigate("../admin/prestamos");
                }
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        cargarLibros();
        if (id) {
            cargarPrestamo();
        }
    }, [])

    return (
        <Box component="div" sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box sx={{ mx: 'auto', mt: 2, width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                <Avatar sx={{ m: 1, width: 50, height: 50 }}>
                    <AutoStoriesIcon color="error" />
                </Avatar>
                <Typography component="h1" variant="h5">
                    GESTION PRESTAMO
                </Typography>

                <Box component="form" onSubmit={hadleSubmitForm} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel >LIBRO</InputLabel>
                                <Select name='nombreLibro' value={prestamo.nombreLibro} label="LIBRO" onChange={hadleChange}>
                                    {Libros?.map((libro, index) => (
                                        <MenuItem key={index} value={libro.id}>
                                            {`${libro.id} - ${libro.titulo}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth label="ID USUARIO" type='number' name='identificacion' onChange={hadleChange} value={prestamo.identificacion ? prestamo.identificacion : ''} autoComplete='off' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth label="stock" name="cantidad" type='number' onChange={hadleChange} value={prestamo.cantidad ? prestamo.cantidad : ''} autoComplete='off' />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">REGRESADO</InputLabel>
                                <Select name='regresado' value={prestamo.regresado} label="REGRESADO" onChange={hadleChange}>
                                    <MenuItem value={1}>SI</MenuItem>
                                    <MenuItem value={0}>NO</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker label="fecha prestamo" value={dayjs(prestamo.fecha_prestamo)} format="DD-MM-YYYY" onChange={(newValue) => setPrestamo({ ...prestamo, fecha_prestamo: newValue.toISOString() })} />
                                    <DatePicker label="fecha devolucion" value={dayjs(prestamo.fecha_devolucion)} format="DD-MM-YYYY" onChange={(newValue) => setPrestamo({ ...prestamo, fecha_devolucion: newValue.toISOString() })} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', }}>
                        {isModif ?
                            (
                                <LoadingButton type="submit" sx={{ mr: 2 }} color="warning" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                    <span>ACTUALIZAR</span>
                                </LoadingButton>
                            ) : (
                                <LoadingButton type="submit" sx={{ mr: 2 }} color="success" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                    <span>AGREGAR</span>
                                </LoadingButton>
                            )
                        }
                        <Button variant="contained" component={Link} to="../admin/prestamos" color="error">CANCELAR</Button>
                    </Box>
                </Box>
            </Box>
            <Footer sx={{ mt: 5, mb: 2 }} />
        </Box>
    );
}

export default PrestamoEdit;