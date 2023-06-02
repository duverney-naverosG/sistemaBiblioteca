import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'

import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Registro from './pages/Register.jsx'

import HomeUser from './pages/users/Home.jsx'
import Perfil from './pages/users/Perfil.jsx'
import Prestamos from './pages/users/Prestamos.jsx'

import HomeAdmin from './pages/admin/Home.jsx'
import Admin from './pages/admin/Admin.jsx'
import PerfilAdmin from './pages/admin/Perfil.jsx'
import Autores from './pages/admin/Autores.jsx'
import Generos from './pages/admin/Genenos.jsx'
import LibroEdit from './pages/admin/LibroEdit.jsx'
import Libros from './pages/admin/Libros.jsx'
import PrestamoEdit from './pages/admin/PrestamoEdit.jsx'
import PrestamosAdmin from './pages/admin/Prestamos.jsx'
import ProtectedRouteUse from "./components/users/ProtectedRouteUser.jsx";
import ProtectedRouteAdmin from "./components/admin/ProtectedRouteAdmin.jsx";

function App() {

  Cookies.set('SistemaBibliotecaUser', JSON.stringify({'id': null, 'rol': null, 'identificacion': null}));

  return (
    <div>
      <Toaster  position="bottom-left" reverseOrder={false}/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registro' element={<Registro/>}/>

        <Route element={<ProtectedRouteUse/>}>
          <Route exact path='/user' element={<HomeUser />} />
          <Route exact path='/user/perfil' element={<Perfil />} />
          <Route exat path='/user/prestamos' element={<Prestamos />} />
        </Route>

        <Route element={<ProtectedRouteAdmin/>}>
          <Route path='/admin/' element={<HomeAdmin />} />
          <Route exact path='/admin/perfil' element={<PerfilAdmin />} />
          <Route path='/admin/admins' element={<Admin />} />
          <Route path='/admin/autores' element={<Autores />} />
          <Route path='/admin/generos' element={<Generos />} />
          <Route path='/admin/libroEdit/:id' element={<LibroEdit />} />
          <Route path='/admin/libroEdit' element={<LibroEdit />} />
          <Route path='/admin/libros' element={<Libros />} />
          <Route path='/admin/prestamosIdit/:id' element={<PrestamoEdit />} />
          <Route path='/admin/prestamosIdit' element={<PrestamoEdit />} />
          <Route path='/admin/prestamos' element={<PrestamosAdmin />} />
          <Route path='*' element={<NotFound />} />
          </Route>

      </Routes>
    </div>
  )
}

export default App
