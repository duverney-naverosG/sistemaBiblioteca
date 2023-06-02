import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axios from 'axios';
import { useState, useEffect } from "react";
import { URL_API } from '../../config/URL.js';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

import Menu from '../../components/users/Menu'
import Footer from '../../components/Footer'
import Libro from '../../components/users/Libro.jsx';


function Home() {

    const [busqueda, setBusqueda] = useState({nombreLibro: ""});
    const [Libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setLoading(true);
        cargarLibros();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <Box component="div" sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
                <Menu />
                <Box display="flex" sx={{ mx: 2, mt: 2, mr: 10 }} justifyContent="space-between">
                    <Typography component="h1" variant="h5">
                        NUEVOS LIBROS <AutoStoriesIcon color="error" />
                    </Typography>

                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <OutlinedInput name='nombreLibro' size="small" onChange={hadleChangeBusqueda} endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>} />
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
                                <Libro key={index} libro={libro} />
                            ))
                        )
                        )}
                    </Grid>

                    <Footer sx={{ mt: 5, mb: 2 }} />
                </Container>
            </Box>
        </div>
    );
}

export default Home;