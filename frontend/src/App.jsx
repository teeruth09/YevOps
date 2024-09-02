import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage'
import Viewshoppage from './pages/Viewshoppage'
import LoginPage from './pages/Loginpage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/viewshop' element={<Viewshoppage />} />
    </Routes>
  )
}

export default App
