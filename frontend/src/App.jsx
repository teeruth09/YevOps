import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage'
import Viewshoppage from './pages/Viewshoppage'
import LoginPage from './pages/Loginpage'
import RegisterPage from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/viewshop' element={<Viewshoppage />} />
    </Routes>
  )
}

export default App
