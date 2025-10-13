import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import VendorStorePage from "./pages/VendorStorePage";
import StoresPage from "./pages/StoresPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import WishlistPage from "./pages/WishlistPage";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";
import BrandDocs from "./pages/seller/BrandDocs";
import APIKeys from "./pages/seller/APIKeys";
export default createBrowserRouter([
  { path: "/", element: <HomePage/> },
  { path: "/list/:slug", element: <ProductListPage/> },
  { path: "/p/:slug", element: <ProductDetailPage/> },
  { path: "/vendor/:slug", element: <VendorStorePage/> },
  { path: "/stores", element: <StoresPage/> },
  { path: "/cart", element: <CartPage/> },
  { path: "/checkout", element: <CheckoutPage/> },
  { path: "/account", element: <AccountPage/> },
  { path: "/wishlist", element: <WishlistPage/> },
  { path: "/admin", element: <AdminDashboard/> },
  { path: "/seller", element: <SellerDashboard/> },
  { path: "/seller/products", element: <SellerProducts/> },
  { path: "/seller/brand-docs", element: <BrandDocs/> },
  { path: "/seller/api-keys", element: <APIKeys/> }
]);