import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Genero({item, eliminar}) {
    return ( 
        <TableRow >
            <TableCell align="right">{item.id}</TableCell>
            <TableCell align="right">{item.genero}</TableCell>
            <TableCell align="center">
                <ButtonGroup variant="contained">
                    <Button color="error" onClick={()=> eliminar(item.id)}>eliminar</Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
}

Genero.propTypes

export default Genero;