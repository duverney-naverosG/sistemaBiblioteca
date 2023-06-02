import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Autor({genero, eliminar, editar}) {
    return (  
        <TableRow >
            <TableCell align="center">{genero.id}</TableCell>
            <TableCell align="center">{genero.nombre}</TableCell>
            <TableCell align="center">{genero.apellidos}</TableCell>
            <TableCell align="center">{genero.nacionalidad}</TableCell>
            <TableCell align="center">
                <ButtonGroup variant="contained">
                    <Button color="warning" onClick={()=> editar(genero.id)}>actualizar</Button>
                    <Button color="error" onClick={()=> eliminar(genero.id)} >eliminar</Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
}

Autor.propTypes

export default Autor;