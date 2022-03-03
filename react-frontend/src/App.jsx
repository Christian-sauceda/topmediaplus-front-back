import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Auth/Login'
import Registrar from './pages/Auth/Registrar'
import OlvidePassword from './pages/Auth/OlvidePassword'
import ConfirmarCuenta from './pages/Auth/ConfirmarCuenta'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
