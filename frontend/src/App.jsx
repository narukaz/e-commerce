import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Auth-Layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/Layout";
import PageNotFound from "./components/not-Found";
import ShopAccount from "./pages/shopping-view/Account";
import ShopHome from "./pages/shopping-view/Home";
import ShopListing from "./pages/shopping-view/Listing";
import ShopCheckout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/checkAuth";
import { Check } from "lucide-react";
import UnAuthPage from "./components/unAuth";

function App() {
  const isAuthenticated = false;
  const user =null;
  //  {
  //   name: "John Doe",
  //   role:'user'
  // };

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route index element={<AuthLogin />} />
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>

      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="features" element={<AdminFeatures />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>

      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route index element={<ShopHome />} />
        <Route path="home" element={<ShopHome />} />
        <Route path="listing" element={<ShopListing />} />
        <Route path="checkout" element={<ShopCheckout />} />
        <Route path="account" element={<ShopAccount />} />
      </Route>
      <Route path="/unauth-page" element={<UnAuthPage/>}></Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
