import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Divider from '@mui/material/Divider';
import { Link as LinkRouter } from "react-router-dom";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


export default function Menu() {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const salir = () =>{
    Cookies.remove('SistemaBibliotecaUser');
    navigate("/");
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar position="static" color="error" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }} >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Link component={LinkRouter} underline='none' to="../user" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            SISTEMA BIBLIOTECA
          </Link>
          <Link variant="button" underline='none' component={LinkRouter} color="inherit" to="../user/prestamos" sx={{ my: 1, mx: 1.5 }} >
            prestamos
          </Link>
          <Button ref={anchorRef} onClick={handleToggle} >
            <Avatar src="/broken-image.jpg" sx={{ m: 1, width: 35, height: 35 }} />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList autoFocusItem={open}>
                      <MenuItem component={LinkRouter} to="../user/perfil">Mi cuenta</MenuItem>
                      <Divider />
                      <MenuItem component={Button} onClick={salir} >SALIR</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
