import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function AdminU({admin, eliminar, editar}) {
    return ( 
        <TableRow >
            <TableCell align="center">{admin.id}</TableCell>
            <TableCell align="center">{admin.identificacion}</TableCell>
            <TableCell align="center">{admin.nombre}</TableCell>
            <TableCell align="center">{admin.apellidos}</TableCell>
            <TableCell align="center">{admin.fechaNacimiento}</TableCell>
            <TableCell align="center">{admin.correo}</TableCell>
            <TableCell align="center">
                <ButtonGroup variant="contained">
                    <Button color="warning" onClick={()=> editar(admin.id)}>actualizar</Button>
                    <Button color="error" onClick={()=> eliminar(admin.id)} >eliminar</Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
}

AdminU.propTypes

export default AdminU;