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
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useState, useEffect } from "react";
import { URL_API } from '../../config/URL.js';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2'
import Skeleton from '@mui/material/Skeleton';

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer';
import Genero from "../../components/admin/Genero";

function Generos() {

    const [genero, setGenero] = useState({});
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(false);

    const cargarGeneros = async () => {
        try {
            const { data } = await axios.get(URL_API + '/generos');
            setGeneros(data);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const hadleChange = (e) =>{
        setGenero({...genero, [e.target.name]: e.target.value});
    }

    const hadleLimpiar = () =>{
        setGenero({});
    }

    const hadleSubmit = async(e) =>{
        e.preventDefault();
        if (genero != null) {
            setLoading(true);
            
            const res = await axios.post(URL_API + '/generos', genero)

            if (res.status === 500) {
                toast.error('ERROR')
            }

            if (res.status === 200) {
                toast.success('genero agregado')
                e.target.reset()
                hadleLimpiar()
            }

            setLoading(false)
            cargarGeneros()
        }
        
    }

    const hadleEliminar = (id) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "asegurese de que el genero este recien creado o no tenga libros con dicho genero!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, eliminar!'

          }).then((result) => {
            if (result.isConfirmed) {
                eliminar(id);
            }
        })
    }

    const eliminar = async(id)=> {
        const res =  await axios.delete(URL_API+`/generos/${id}`)

        if(res.status === 500){
            toast.error('ERROR')  
        }
  
        if(res.status === 200){
            toast.success('genero eliminado')  
        }
        cargarGeneros()
    }
    

    useEffect(() => {
        setLoading(true)
        cargarGeneros()
        
    }, []);

    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography component="h1" variant="h5" align='center' sx={{ my: 2 }}>
                    MODULO DE GENEROS <TheaterComedyIcon />
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={7} sx={{ mt: 3 }}>
                    {loading ? (<Skeleton variant="rounded"  height={200} />) : (generos.length === 0 ? (
                        <Typography component="h1" variant="subtitle1" align='center' sx={{ my: 2 }}>
                            no se encuentran generos.... <CircularProgress color="error" />
                        </Typography>
                    ) : (
                        <TableContainer sx={{ ml: 2 }} component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead sx={{ bgcolor: 'info.main' }} >
                                    <TableRow  >
                                        <TableCell align="right" >ID</TableCell>
                                        <TableCell align="right">NONBRE</TableCell>
                                        <TableCell align="center">ACCION</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        generos.map((genero, index) => (
                                            <Genero item={genero} eliminar={hadleEliminar} key={index} />
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
                        GESTION DE GENEROS 
                    </Typography>
                    <Box component="form" onSubmit={hadleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="genero" name='genero' autoComplete='off' value={genero.genero ? genero.genero : ""} onChange={hadleChange} />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', }}>

                            <LoadingButton type="submit" sx={{ mr: 2 }} color="success" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                <span>AGREGAR</span>
                            </LoadingButton>

                            <Button variant="contained" onClick={() => hadleLimpiar()} color="error">CANCELAR</Button>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
            <Footer sx={{ mt: 5, mb:2 }} />
        </Box>
    );
}

export default Generos;