import {Navigate, Outlet} from 'react-router-dom'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

function ProtectedRouteAdmin() {

    if(Cookies.get('SistemaBibliotecaUser')){
        let dataUser = JSON.parse(Cookies.get('SistemaBibliotecaUser'));
        if(dataUser.rol ==='admin'){
            return <Outlet/>
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'SIN PERMISOS!'
        })
        return <Navigate to={'/'}/>
        
    }else{
        return <Navigate to={'/'}/>
    }
}

export default ProtectedRouteAdmin;