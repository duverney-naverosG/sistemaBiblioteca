import {  Grid } from '@mui/material';
import Menu from '../../components/users/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState, useEffect } from "react";
import { URL_API } from '../../config/URL.js';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Cookies from 'js-cookie'

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Footer from '../../components/Footer'
import Prestamo from '../../components/users/Prestamo'

function Prestamos() {

    const dataUser = JSON.parse(Cookies.get('SistemaBibliotecaUser'))

    const [prestamos, setPrestamo] = useState([]);
    const [loading, setLoading] = useState(false);

    const cargarPrestamos = async () => {
        try {
            const { data } = await axios.get(URL_API + `/prestamos/${dataUser.identificacion}`);
            setPrestamo(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        cargarPrestamos();
    }, []);

    return (
        <Box component="div" sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Typography align="center" sx={{ mx: 'auto', my: 2 }} component="h1" variant="h5">
                PRESTAMOS <ReceiptLongIcon color="error" />
            </Typography>
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
                                <Prestamo key={index} prestamo={prestamo} />
                            ))}
                        </Grid>
                    )
                    )}
                </Container>
                <Footer sx={{ mt: 5, mb: 2 }} />
            </Box>
        </Box>
    );
}

export default Prestamos;