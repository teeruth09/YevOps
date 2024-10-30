// Imports from libraries
import { Route, Routes } from 'react-router-dom'

// Page Imports
import HomePage from './pages/Homepage'
import LoginPage from './pages/Loginpage'
import RegisterPage from './pages/Register'
import ApplyShopPage from './pages/ApplyShopPage'
import Viewshoppage from './pages/Viewshoppage'
import ViewOrderPage from './pages/ViewOrderPage'
import ShowShopAfterSearch from './pages/ShowShopAfterSearch'
import ReportPage from './pages/ReportPage'
import ReviewPage from './pages/ReviewPage'
import ChatPage from './pages/ChatPage'
import OrderInformationPage from './pages/OrderInformationPage'
import PostPage from './pages/PostPage'
import ShopPostPage from './pages/ShopPostPage'
import CreatePostPage from './pages/CreatePostPage'
import ViewClients from './pages/ViewClients'
import Verifyshop from './pages/VerifyShopPage'
import ShopViewClientOrderPage from './pages/ShopViewClientOrderPage'
import ShopProfilePreviewPage from './pages/ShopProfilePreviewpage'

// Shared Layouts
import MainLayout from './shared/layouts/MainLayout'
import ProfileLayout from './shared/layouts/ProfileLayout'

// Shop Components
import ShopReview from './components/ShopReview'
import ShopOrderRequestHistory from './components/ShopOrderRequestHistory'
import ShopEditProfile from './components/ShopEditProfile'

// Client Components
import ClientBankProfile from './components/ClientBankProfile'
import ChangePassword from './components/ChangePassword'
import ClientEditProfile from './components/ClientEditProfile'
import ClientFavoriteShop from './components/ClientFavoriteShop'
import ClientPurchaseHistory from './components/ClientPurchaseHistory'
import ClientPostHistory from './components/ClientPostHistory'
import DesignAIPage from './pages/DesignAIPage'

function App() {
  return (
    <Routes>
      {/* Public Access Routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/applyshop' element={<ApplyShopPage />} />

      {/* Routes with MainLayout */}
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/design' element={<DesignAIPage />} />
        <Route path='/viewshop' element={<Viewshoppage />} />
        <Route path='/viewshop/:id' element={<Viewshoppage />} />
        <Route path='/order/:id' element={<ViewOrderPage />} />
        <Route path='/search' element={<ShowShopAfterSearch />} />
        <Route path='/verifyshop' element={<Verifyshop />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/order/information' element={<OrderInformationPage />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/post2' element={<ShopPostPage />} />
        <Route path='/create-post' element={<CreatePostPage />} />
        <Route path='/admin/clients' element={<ViewClients />} />
        <Route path='/admin/shop/1' element={<ViewClients />} />

        {/* Routes with ProfileLayout */}
        <Route path='/' element={<ProfileLayout />}>
          {/* Client Profile Pages */}
          <Route path='/client/profile' element={<ClientEditProfile />} />
          <Route
            path='/client/profile/favorites'
            element={<ClientFavoriteShop />}
          />
          <Route
            path='/client/profile/history'
            element={<ClientPurchaseHistory />}
          />
          <Route path='/client/profile/password' element={<ChangePassword />} />
          <Route path='/client/profile/bank' element={<ClientBankProfile />} />
          <Route path='/client/profile/post' element={<ClientPostHistory />} />

          {/* Shop Profile Pages */}
          <Route path='/shop/profile' element={<ShopEditProfile />} />
          <Route path='/shop/profile/reviews' element={<ShopReview />} />
          <Route
            path='/shop/profile/order'
            element={<ShopOrderRequestHistory />}
          />
          <Route path='/shop/profile/bank' element={<ClientBankProfile />} />
          <Route path='/shop/profile/password' element={<ChangePassword />} />
          <Route
            path='/shop/profile/post'
            element={<ShopProfilePreviewPage />}
          />
        </Route>

        {/* Order and Report Pages */}
        <Route path='/order/1/report' element={<ReportPage />} />
        <Route path='/order/1/review' element={<ReviewPage />} />
        <Route
          path='/shop/viewrequest/:id'
          element={<ShopViewClientOrderPage />}
        />
      </Route>
    </Routes>
  )
}

export default App
