import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Viewshoppage from "./pages/Viewshoppage";
import ClientProfileEditPage from "./pages/ClientProfileEditpage";
import ClientProfileFavoritePage from "./pages/ClientProfileFavoritepage";
import ClientProfileHistoryPage from "./pages/ClientProfileHistorypage";
import ClientProfileChangePsPage from "./pages/ClientProfileChangePSpage";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Register";
import ViewOrderPage from "./pages/ViewOrderPage";
import ShowShopAfterSearch from "./pages/ShowShopAfterSearch";
import ClientProfileBankPage from "./pages/ClientProfileBankPage";
import ClientProfilePostPage from "./pages/ClientProfilePostPage";
import ShopProfileEditPage from "./pages/ShopProfileEditPage";
import ShopProfileOrderHistoryPage from "./pages/ShopProfileOrderHistoryPage";
import ShopProfileChangePsPage from "./pages/ShopProfileChangePSpage";
import ShopProfileBankPage from "./pages/ShopProfileBankPage";
import ShopProfileReviewHistoryPage from "./pages/ShopProfileReviewHistoryPage";
import ReportPage from "./pages/ReportPage";
import ReviewPage from "./pages/ReviewPage";
import ShopProfilePreviewPage from "./pages/ShopProfilePreviewpage";
import Verifyshop from "./pages/VerifyShopPage";
import ChatPage from "./pages/ChatPage";
import OrderInformationPage from "./pages/OrderInformationPage";
import ViewClients from "./pages/ViewClients";
import ApplyShopPage from "./pages/ApplyShopPage";
import ShopViewClientOrderPage from "./pages/ShopViewClientOrderPage";
import PostPage from "./pages/PostPage";
import ShopPostPage from "./pages/ShopPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import DesignAIPage from "./pages/DesignAIPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/viewshop" element={<Viewshoppage />} />
      <Route path="/client/profile" element={<ClientProfileEditPage />} />
      <Route
        path="/client/profile/favorites"
        element={<ClientProfileFavoritePage />}
      />
      <Route
        path="/client/profile/history"
        element={<ClientProfileHistoryPage />}
      />
      <Route
        path="/client/profile/password"
        element={<ClientProfileChangePsPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/viewshop/:id" element={<Viewshoppage />} />
      <Route path="/order/:id" element={<ViewOrderPage />} />
      <Route path="/search" element={<ShowShopAfterSearch />} />
      <Route path="/design" element={<DesignAIPage />} />
      <Route path="/client/profile/bank" element={<ClientProfileBankPage />} />
      <Route path="/client/profile/post" element={<ClientProfilePostPage />} />
      <Route path="/shop/profile" element={<ShopProfileEditPage />} />
      <Route
        path="/shop/profile/order"
        element={<ShopProfileOrderHistoryPage />}
      />
      <Route
        path="/shop/profile/password"
        element={<ShopProfileChangePsPage />}
      />
      <Route path="/shop/profile/bank" element={<ShopProfileBankPage />} />
      <Route
        path="/shop/profile/reviews"
        element={<ShopProfileReviewHistoryPage />}
      />
      <Route path="/order/1/report" element={<ReportPage />} />
      <Route path="/order/1/review" element={<ReviewPage />} />
      <Route path="/shop/profile/post" element={<ShopProfilePreviewPage />} />
      <Route
        path="/shop/viewrequest/:id"
        element={<ShopViewClientOrderPage />}
      />
      <Route path="/verifyshop" element={<Verifyshop />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/order/information" element={<OrderInformationPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/post2" element={<ShopPostPage />} />
      <Route path="/create-post" element={<CreatePostPage />} />
      <Route path="/applyshop" element={<ApplyShopPage />} />
      <Route path="/admin/clients" element={<ViewClients />} />
      <Route path="/admin/shop/1" element={<ViewClients />} />
    </Routes>
  );
}

export default App;
