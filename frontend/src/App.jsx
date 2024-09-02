import { Route, Routes } from "react-router-dom"
import HomePage from './pages/Homepage'
import Viewshoppage from './pages/Viewshoppage'
import ClientProfileEditPage from './pages/ClientProfileEditpage'
import ClientProfileFavoritePage from './pages/ClientProfileFavoritepage'
import ClientProfileHistoryPage from "./pages/ClientProfileHistorypage"
import ClientProfileChangePsPage from "./pages/ClientProfileChangePSpage"

function App() {

  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/viewshop" element={<Viewshoppage/>} />
        <Route path="/client/profile" element={<ClientProfileEditPage/>} />
        <Route path="/client/profile/favorites" element={<ClientProfileFavoritePage/>} />
        <Route path="/client/profile/history" element={<ClientProfileHistoryPage/>} />
        <Route path="/client/profile/password" element={<ClientProfileChangePsPage/>} />



      </Routes>
  )
}

export default App
