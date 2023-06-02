import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from "react-router-dom";
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
import Footer from '../../components/Footer';
import Libro from '../../components/admin/Libro.jsx';

function Libros() {

    const [busqueda, setBusqueda] = useState({nombreLibro: ""});
    const [Libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const cargarLibros = async () => {
        try {
            const { data } = await axios.get(URL_API + '/libros');
            setLibros(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const hadleChangeBusqueda = async(e) => {
        
        setBusqueda({[e.target.name]: e.target.value });

        const { data } = await axios.post(URL_API + `/librosNombre`, busqueda);

        if(busqueda.nombreLibro.length === 1){
            return cargarLibros()
        }

        if(data.length !=0){
            setLibros(data);
        }else{
            setLibros([])   
        }
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
        const res = await axios.delete(URL_API + `/libros/${id}`)

        if (res.status === 500) {
            toast.error('ERROR');
        }

        if (res.status === 200) {
            toast.success('autor eliminado');
        }
        cargarLibros();
    }

    useEffect(() => {
        setLoading(true);
        cargarLibros();
    }, []);

    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box display="flex" sx={{ mx: 2, mt: 2, mr: 10 }} justifyContent="space-between">
                <Typography component="h1" variant="h5">
                    NUEVOS LIBROS <AutoStoriesIcon color="error" />
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <OutlinedInput  name='nombreLibro' size="small" onChange={hadleChangeBusqueda} endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>} />
                </form>
            </Box>
            <Container maxWidth="md" component="div" sx={{ mt: 2 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                    {loading ? (<Skeleton variant="rounded" height={200} />) : (Libros.length === 0 ? (
                        <Typography component="h1" variant="subtitle1" align='center' sx={{ my: 2 }}>
                            no se encuentran libros.... <CircularProgress color="error" />
                        </Typography>
                    ) : (
                        Libros.map((libro, index) => (
                            <Libro key={index} libro={libro} eliminar={hadleEliminar}/>
                        ))
                    )
                    )}
                </Grid>

                <Footer sx={{ mt: 5, mb:2 }} />
            </Container>
            <Box component={Link} to="../admin/libroEdit" sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, m: 1, bgcolor: 'background.paper', borderRadius: 1, position: "fixed", bottom: 0, right: 16 }}>
                <Fab color="error" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
}

export default Libros;