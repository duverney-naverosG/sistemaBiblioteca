import Typography from '@mui/material/Typography';

function Footer(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            || desarrollado 💻🖱👾 por Duverney Naveros G
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Footer;