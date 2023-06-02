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
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useState, useEffect } from "react";
import { URL_API } from '../../config/URL.js';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2'
import Skeleton from '@mui/material/Skeleton';

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer'
import Autor from '../../components/admin/Autor.jsx';

function Autores() {

    const [autor, setAutor] = useState({});
    const [busqueda, setBusqueda] = useState({busqueda: ""});
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    const cargarAutores = async () => {
        try {
            const { data } = await axios.get(URL_API + '/autor');
            setAutores(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const hadleChange = (e) => {
        setAutor({ ...autor, [e.target.name]: e.target.value });
    }

    const hadleChangeBusqueda = async(e) => {
        
        setBusqueda({[e.target.name]: e.target.value });

        const { data } = await axios.post(URL_API + `/autorBusqueda`, busqueda);

        if(busqueda.busqueda.length === 1){
            return cargarAutores()
        }

        if(data.length !=0){
            setAutores(data);
        }else{
         setAutores([])   
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const hadleSubmitForm = async (e) => {
        e.preventDefault();
        if (autor != null) {
            setLoading(true);

            const res = await axios.post(URL_API + '/autor', autor);

            if (res.status === 500 || res.status === 400) {
                toast.error('ERROR');
            }

            if (res.status === 200) {
                toast.success('autor agregado');
                e.target.reset();
                setAutor({});
            }

            setLoading(false);
            cargarAutores();
        }
    }

    const hadleEliminar = (id) => {
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "asegurese de que el autor este recien creado o no tenga libros registrados!",
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
        const res = await axios.delete(URL_API + `/autor/${id}`)

        if (res.status === 500) {
            toast.error('ERROR');
        }

        if (res.status === 200) {
            toast.success('autor eliminado');
        }
        cargarAutores();
    }

    const hadleEditar = async (id) => {
        setIsModif(true);
        const { data } = await axios.get(URL_API + `/autorId/${id}`);
        setAutor(data);
    }

    const hadleEditarForm = async () => {
        setLoading(true);
        const res = await axios.put(URL_API + `/autor/${autor.id}`, autor);

        if (res.status === 500) {
            toast.error('ERROR');
        }

        if (res.status === 200) {
            toast.success('autor actualizado');
            hadleLimpiar();
            setLoading(false);
        }

        cargarAutores();
    }

    const hadleLimpiar = () => {
        setAutor({});
        setIsModif(false);
    }

    useEffect(() => {
        setLoading(true);
        cargarAutores();

    }, []);

    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box display="flex" sx={{ mx: 2, mt: 2, mr: 10 }} justifyContent="space-between">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography component="h1" variant="h5" align='center' sx={{ my: 2 }}>
                        MODULO DE AUTORES
                    </Typography>
                    <Avatar src="/broken-image.jpg" sx={{ m: 1, width: 40, height: 40 }} />
                </Box>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <OutlinedInput  name='busqueda' size="small" onChange={hadleChangeBusqueda} endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>} />
                </form>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={7} sx={{ mt: 6 }}>
                    {loading ? (<Skeleton variant="rounded" height={200} />) : (autores.length === 0 ? (
                        <Typography component="h1" variant="subtitle1" align='center' sx={{ my: 2 }}>
                            no se encuentran autores.... <CircularProgress color="error" />
                        </Typography>
                    ) : (
                        <TableContainer sx={{ ml: 2 }} component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead sx={{ bgcolor: 'info.main' }} >
                                    <TableRow  >
                                        <TableCell align="right" >ID</TableCell>
                                        <TableCell align="right">NONBRE</TableCell>
                                        <TableCell align="right">APELLIDO</TableCell>
                                        <TableCell align="right">NACIONALIDAD</TableCell>
                                        <TableCell align="center">ACCION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        autores.map((genero, index) => (
                                            <Autor genero={genero} eliminar={hadleEliminar} editar={hadleEditar} key={index} />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                    )}

                </Grid>

                <Grid item xs={12} md={4} sx={{ ml: 2, mt: 2 }}>
                    <Typography component="h1" variant="h5" align='center' sx={{ my: 2 }}>
                        GESTION DE AUTORES <HistoryEduIcon color="error" />
                    </Typography>
                    <Box component="form" onSubmit={hadleSubmitForm} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField required fullWidth label="nombre" name='nombre' autoComplete='off' autoFocus value={autor.nombre ? autor.nombre : ""} onChange={hadleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="apellidos" name='apellidos' autoComplete='off' value={autor.apellidos ? autor.apellidos : ""} onChange={hadleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name='nacionalidad' autoComplete='off' label="nacionalidad" value={autor.nacionalidad ? autor.nacionalidad : ""} onChange={hadleChange} />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', }}>
                            {isModif ?
                                (
                                    <LoadingButton type="reset" onClick={() => hadleEditarForm()} sx={{ mr: 2 }} color="warning" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                        <span>ACTUALIAZR</span>
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
            <Footer sx={{ mt: 5, mb: 2 }} />
        </Box>
    );
}

export default Autores;