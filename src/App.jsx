import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Clothes from "./pages/Clothes";
import Accessories from "./pages/Accessories";
import AuthPage from "./pages/AuthPage"; 
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/OrderSuccess";
import orders from "./pages/orders";
import FashionPreference from "./pages/FashionPreference";
import Bodymeasurement from "./pages/Bodymeasurement";
import AvatarSelection from "./pages/AvatarSelection";
import Recommendations from "./pages/Recommendations";
import ProductDetails from "./pages/ProductDetails";
import ARTryOn from "./pages/ARTryOn";
import { Search } from "lucide-react";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/edit/:id" element={<EditProduct />} /> 
        <Route path="/fashionpreference" element={<FashionPreference />} />
        <Route path="/avatarselection" element={<AvatarSelection />} />
        <Route path="/measurements" element={<Bodymeasurement/>} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/ar-tryon/:id" element={<ARTryOn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<Orders />} />
        <Route path="/orders" element={<orders />} />


      </Routes>
    </Router>
  );
}
