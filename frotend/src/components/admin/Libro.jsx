import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Libro({libro, eliminar}) {
    return (  
        <Grid item xs={12} sm={4} md={4} >
            <Card >
                <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={libro.imagen} style={{width: '100%',  height:'100'}}  />
                </Paper>
                <Typography gutterBottom variant="h5" component="div">
                    TUTULO: 
                </Typography>
                <Typography gutterBottom variant="h6" sx={{ ml: 1}} component="div">
                    {libro.titulo}
                </Typography>
                <Typography sx={{ ml: 2 }} variant="subtitle1" color="text.secondary">
                    autor: {`${libro.nombre} ${libro.apellidos}`}
                </Typography>
                <Typography sx={{ ml: 2 }} variant="subtitle1" color="text.secondary">
                    genero: {libro.genero}
                </Typography>
                <Typography sx={{ ml: 2 }} variant="subtitle1" color="text.secondary">
                    editorial: {libro.editorial}
                </Typography>
                <Typography sx={{ ml: 2 }} variant="subtitle1" color="text.secondary">
                    cantidad: {libro.stock}
                </Typography>
                <Typography sx={{ ml: 2 }} variant="subtitle1" color="text.secondary">
                    referencia: {libro.id}
                </Typography>
                <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Box >
                        <Button variant="contained" component={Link} to={`../admin/libroEdit/${libro.id}`} color="warning">editar</Button>
                        <Button variant="contained" color="error" onClick={()=> eliminar(libro.id)} >eliminar</Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
}

Libro.propTypes

export default Libro;