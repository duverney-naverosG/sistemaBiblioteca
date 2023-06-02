import { Card, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Prestamo({prestamo}) {
    return (
        <Grid item xs={12} sm={4} md={4} >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {
                            (prestamo.devuelto === 0)? '🔴' : '🟢'
                        }
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} component="div">
                        ENTREGADO
                    </Typography>
                    <Typography variant="h5" component="div">
                        {prestamo.nombre} {prestamo.apellidos}
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} component="div">
                        USUARIO
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            fecha prestamo
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {prestamo.fecha_prestamo.substr(0, 10)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            fecha devolucion
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {prestamo.fecha_devolucion.substr(0, 10)}
                        </Typography>
                    </Box>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        cantidad {prestamo.cantidad}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 20 }} variant="h5" color="text.primary">
                        {prestamo.titulo}
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            titulo libro
                        </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        atraso de entrega:
                        {
                            (new Date(prestamo.fecha_prestamo.substr(0, 9)) > new Date()) ? '🔴' : '🟢'
                        }
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

Prestamo.propTypes

export default Prestamo;