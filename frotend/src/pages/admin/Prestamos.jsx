import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useState, useEffect } from "react";
import { URL_API } from '../../config/URL.js';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import Skeleton from '@mui/material/Skeleton';
import toast from 'react-hot-toast';

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer'
import Prestamo from '../../components/admin/Prestamo'


function Prestamos() {

    const [busqueda, setBusqueda] = useState({ id: null });
    const [prestamos, setPrestamo] = useState([]);
    const [loading, setLoading] = useState(false);



    const hadleChangeBusqueda = async (e) => {

        setBusqueda({ [e.target.name]: e.target.value });

        if (busqueda.id.length === 1) {
            return cargarPrestamos()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        cargarPeticionUser()
    }

    const cargarPeticionUser = async () => {
        const res = await fetch(URL_API + `/prestamos/${busqueda.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.status === 404) {
            return toast.error('USUARIO NO ENCONTRADO');
        }

        if (res.status === 500) {
            return toast.error('ERROR');
        }

        toast.success('PRESTAMOS ENCONTRADOS');
        const data = await res.json()
        setPrestamo(data)

    }

    const cargarPrestamos = async () => {
        try {
            const { data } = await axios.get(URL_API + '/prestamos');
            setPrestamo(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const hadleEliminar = (id, cant, idLibro) => {
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
                eliminar(id, cant, idLibro);
            }
        });
    }

    const eliminar = async (id, cant, idLibro) => {
        const res = await axios.delete(URL_API + `/prestamos/${id}/${cant}/${idLibro}`)

        if (res.status === 500) {
            toast.error('ERROR');
        }

        if (res.status === 200) {
            toast.success('prestamo eliminado');
        }
        cargarPrestamos();
    }

    useEffect(() => {
        setLoading(true);
        cargarPrestamos();
    }, []);

    return (
        <Box component="div" sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box display="flex" sx={{ mx: 2, mt: 2, mr: 10 }} justifyContent="space-between">
                <Typography component="h1" variant="h5">
                    PRESTAMOS <ReceiptLongIcon color="error" />
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <OutlinedInput name='id' type='number' size="small" onChange={hadleChangeBusqueda} endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>} />
                </form>
            </Box>
            <Box sx={{ mx: 2 }}>
                <Container sx={{ mt: 3 }} maxWidth="lg">
                    {loading ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Skeleton variant="rectangular" key={index} sx={{ ml: 2, mb: 2 }} width={350} height={300} />
                            ))}
                        </Grid>
                    ) : (prestamos.length === 0 ? (
                        <Typography component="h1" variant="subtitle1" align='center' sx={{ my: 2 }}>
                            no se encuentran prestamos.... <CircularProgress color="error" />
                        </Typography>
                    ) : (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {prestamos.map((prestamo, index) => (
                                <Prestamo key={index} prestamo={prestamo} eliminar={hadleEliminar} />
                            ))}
                        </Grid>
                    )
                    )}
                </Container>
                <Footer sx={{ mt: 5, mb: 2 }} />
            </Box>
            <Box component={Link} to="../admin/prestamosIdit" sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, m: 1, bgcolor: 'background.paper', borderRadius: 1, position: "fixed", bottom: 0, right: 16 }}>
                <Fab color="error" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
}

export default Prestamos;