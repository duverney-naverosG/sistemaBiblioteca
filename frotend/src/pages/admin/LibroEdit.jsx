import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link, useNavigate, useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { URL_API } from '../../config/URL.js';
import toast from 'react-hot-toast';

import Menu from "../../components/admin/Menu";
import Footer from '../../components/Footer'

function LibroEdit() {
    
    let {id} = useParams() || null;

    const navigate = useNavigate();
    const [libro, setLibro] = useState(
        {
        titulo: '', 
        editorial : '', 
        stock: '', 
        genero: '', 
        imagen: '',
        disponible: 1 ,
        autor: ''}
    );
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    const cargarGeneros = async () => {
        try {
            const { data } = await axios.get(URL_API + '/generos');
            setGeneros(data);
        } catch (error) {
            console.log(error);
        }
    }

    const cargarAutores = async () => {
        try {
            const { data } = await axios.get(URL_API + '/autor');
            setAutores(data);
        } catch (error) {
            console.log(error);
        }
    }

    const cargarLibro = async () => {
        try {
            setIsModif(true);
            const { data } = await axios.get(URL_API + `/libros/${id}`);
            setLibro(data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const hadleChange = (e) => {
        setLibro({ ...libro, [e.target.name]: e.target.value });
    }

    const hadleSubmitForm = async (e) => {
        e.preventDefault();
        if(!id){
            if (libro != null) {
                setLoading(true);
    
                const res = await axios.post(URL_API + '/libros', libro);
    
    
                if (res.status === 500 || res.status === 400) {
                    toast.error('ERROR');
                }
    
                if (res.status === 200) {
                    toast.success('libro agregado');
                    e.target.reset();
                    setLibro({});
                    navigate("../admin/libros");
                }
                setLoading(false);   
            }
        }else{
            if (libro != null) {
                setLoading(true);
    
                const res = await axios.put(URL_API + `/libros/${libro.id}`, libro);
    
    
                if (res.status === 500 || res.status === 400) {
                    toast.error('ERROR');
                }
    
                if (res.status === 200) {
                    toast.success('libro actualizado');
                    e.target.reset();
                    setLibro({});
                    navigate("../admin/libros");
                }
                setLoading(false);   
            }
        }
    }

    useEffect(() => {
        cargarGeneros();
        cargarAutores();
    }, []);

    useEffect(()=>{
        if(id){
            cargarLibro();
        }
    }, [])

    return (
        <Box component="div"  sx={{ display: "flex", flexDirection: "column", height: 700, overflow: "hidden", overflowY: "scroll", }}>
            <Menu />
            <Box sx={{ mx: 'auto', mt: 2, width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                <Avatar sx={{ m: 1, width: 50, height: 50 }}>
                    <AutoStoriesIcon color="error" />
                </Avatar>
                <Typography component="h1" variant="h5">
                    GESTION LIBRO
                </Typography>

                <Box component="form" onSubmit={hadleSubmitForm} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="TITULO" name='titulo' onChange={hadleChange} value={libro.titulo ? libro.titulo : ''} autoComplete='off' autoFocus />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="editorial" required fullWidth label="EDITORIAL" autoComplete='off' value={libro.editorial ? libro.editorial : ''} onChange={hadleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth label="stock" type='number' name="stock" autoComplete='off' value={libro.stock ? libro.stock : ''} onChange={hadleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="imagen" required fullWidth label="Url foto" autoComplete='off' value={libro.imagen ? libro.imagen : ''} onChange={hadleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>AUTOR</InputLabel>
                                <Select name='autor' label="autor" value={libro.autor} onChange={hadleChange}>
                                    {autores.map((autor) =>(
                                        <MenuItem key={autor.id} value={autor.id}>
                                            {`${autor.id} - ${autor.nombre} ${autor.apellidos}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel >GENERO</InputLabel>
                                <Select name='genero' value={libro.genero} label="GENERO" onChange={hadleChange}>
                                    {generos?.map((genero, index)=>(
                                        <MenuItem key={index} value={genero.id}>
                                            {genero.genero}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel >DISPONIBLE</InputLabel>
                                <Select name='disponible' value={libro.disponible} label="DISPONIBLE" onChange={hadleChange}>
                                    <MenuItem  value={1}>SI</MenuItem>
                                    <MenuItem  value={0}>NO</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', }}>
                        {isModif ?
                            (
                                <LoadingButton type="submit" sx={{ mr: 2 }} color="warning" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                    <span>ACTUALIZAR</span>
                                </LoadingButton>
                            ) : (
                                <LoadingButton type="submit" sx={{ mr: 2 }} color="success" loading={loading} loadingIndicator="CARGANDO" variant="contained">
                                    <span>AGREGAR</span>
                                </LoadingButton>
                            )
                        }
                        <Button variant="contained" component={Link} to="../admin/libros" color="error">CANCELAR</Button>
                    </Box>
                </Box>
            </Box>
            <Footer sx={{ mt: 5, mb:2 }} />
        </Box>
    );
}

export default LibroEdit;