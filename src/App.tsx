import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading";
import Signup from "./pages/Signup";
import Banking from "./pages/Banking";
import Research from "./pages/Research";
import Product from "./pages/Product";
import MyPage from "./pages/MyPage";
import ProductDetail from "./pages/ProductDetail";
import MyAsset from "./pages/MyAsset";
import ProductEstate from "./pages/ProductEstate";
import ProductLuxuries from "./pages/ProductLuxuries";
import ProductMusic from "./pages/ProductMusic";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/banking" element={<Banking />} />
      <Route path="/research" element={<Research />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/allproducts" element={<Product />} />
      <Route path="/product/realestate" element={<ProductEstate />} />
      <Route path="/product/luxuries" element={<ProductLuxuries />} />
      <Route path="/product/musiccopyright" element={<ProductMusic />} />
      <Route path="/product/detail/:productId" element={<ProductDetail />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myasset" element={<MyAsset />} />
    </Routes>
  );
}
