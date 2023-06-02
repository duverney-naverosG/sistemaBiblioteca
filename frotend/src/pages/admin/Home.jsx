import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from "react-router-dom";

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer';

import libros from '../../assets/images/libros.jfif';
import autores from '../../assets/images/escritores.avif'
import prestamos from '../../assets/images/prestamos.jfif'
import generos from '../../assets/images/generos.jfif'
import admis from '../../assets/images/admin.jfif'
import { CardMedia } from '@mui/material';

function Home() {
    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box display="flex" sx={{ mx: 2, mt: 2, mr: 10 }} justifyContent="space-between">
                <Typography component="h1" variant="h5">
                    MODULOS <AutoStoriesIcon color="error" />
                </Typography>

            </Box>
            <Container maxWidth="md" component="main" sx={{ mt: 2 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid component={Link} to='/admin/libros' item xs={12} sm={4} md={4} >
                        <Card >
                            <CardMedia component="img" height="200" sx={{ backgroundImage: `url(${libros})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <Typography variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} component="div">
                                LIBROS
                            </Typography>

                        </Card>
                    </Grid>
                    <Grid component={Link} to='/admin/autores' item xs={12} sm={4} md={4} >
                        <Card >
                            <CardMedia component="img" height="200" sx={{ backgroundImage: `url(${autores})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                AUTORES
                            </Typography>
                        </Card>

                    </Grid>
                    <Grid component={Link} to='/admin/prestamos' item xs={12} sm={4} md={4} >
                        <Card >
                            <CardMedia component="img" height="200" sx={{ backgroundImage: `url(${prestamos})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                PRESTAMOS
                            </Typography>
                        </Card>

                    </Grid>
                    <Grid component={Link} to='/admin/generos' item xs={12} sm={4} md={4} >
                        <Card >
                            <CardMedia component="img" height="200" sx={{ backgroundImage: `url(${generos})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                GENEROS LITERARIOS
                            </Typography>
                        </Card>

                    </Grid>
                    <Grid component={Link} to='/admin/admins' item xs={12} sm={4} md={4} >
                        <Card >
                            <CardMedia component="img" height="200" sx={{ backgroundImage: `url(${admis})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                ADMIN
                            </Typography>
                        </Card>

                    </Grid>

                </Grid>
                
            </Container>
            <Footer sx={{ mt: 5, mb:2 }} />
        </Box>
    );
}

export default Home;