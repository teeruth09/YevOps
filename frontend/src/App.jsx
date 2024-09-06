import { Route, Routes } from "react-router-dom"
import HomePage from './pages/Homepage'
import Viewshoppage from './pages/Viewshoppage'
import ClientProfileEditPage from './pages/ClientProfileEditpage'
import ClientProfileFavoritePage from './pages/ClientProfileFavoritepage'
import ClientProfileHistoryPage from "./pages/ClientProfileHistorypage"
import ClientProfileChangePsPage from "./pages/ClientProfileChangePSpage"
import LoginPage from './pages/Loginpage'
import RegisterPage from './pages/Register'
import ViewOrderPage from "./pages/ViewOrderPage"
import ShowShopAfterSearch from './pages/ShowShopAfterSearch'
import ClientProfileBankPage from "./pages/ClientProfileBankPage"
import ClientProfilePostPage from "./pages/ClientProfilePostPage"
function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/viewshop" element={<Viewshoppage/>} />
        <Route path="/client/profile" element={<ClientProfileEditPage/>} />
        <Route path="/client/profile/favorites" element={<ClientProfileFavoritePage/>} />
        <Route path="/client/profile/history" element={<ClientProfileHistoryPage/>} />
        <Route path="/client/profile/password" element={<ClientProfileChangePsPage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/viewshop' element={<Viewshoppage />} />
        <Route path='/order/1' element={<ViewOrderPage />} />
        <Route path="/search" element={<ShowShopAfterSearch />} />
        <Route path="/client/profile/bank" element={<ClientProfileBankPage/>} />
        <Route path="/client/profile/post" element={<ClientProfilePostPage/>} />

      </Routes>
   
  )
}

export default App
