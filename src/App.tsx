import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading";
import Signup from "./pages/Signup";
import Banking from "./pages/Banking";
import Research from "./pages/Research";
import Product from "./pages/Product/Product";
import MyPage from "./pages/MyPage";
// import MyAsset from "./pages/MyAsset-dummy";
import ProductEstate from "./pages/Product/ProductEstate/ProductEstate";
import ProductLuxuries from "./pages/Product/ProductLuxuries/ProductLuxuries";
import ProductMusic from "./pages/Product/ProductMusic/ProductMusic";
import ProductDetail from "./pages/Product/ProductDetail";
import ProductEstateViews from "./pages/Product/ProductEstate/ProductEstateViews";
import ProductEstateDeadline from "./pages/Product/ProductEstate/ProductEstateDeadline";
import ProductLuxuriesViews from "./pages/Product/ProductLuxuries/ProductLuxuriesViews";
import ProductLuxuriesDeadline from "./pages/Product/ProductLuxuries/ProductLuxuriesDeadline";
import ProductMusicViews from "./pages/Product/ProductMusic/ProductMusicViews";
import ProductMusicDeadline from "./pages/Product/ProductMusic/ProductMusicDeadline";
import ProductDeadline from "./pages/Product/ProductDeadline";
import ProductViews from "./pages/Product/ProductViews";
import MyAsset from "./pages/MyAsset";
import ResearchTest from "./pages/ResearchTest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/banking" element={<Banking />} />
      <Route path="/research" element={<Research />} />
      <Route path="/product/allproducts" element={<Product />} />
      <Route path="/product/allproducts/views" element={<ProductViews />} />
      <Route
        path="/product/allproducts/deadline"
        element={<ProductDeadline />}
      />
      <Route path="/product/realestate" element={<ProductEstate />} />
      <Route
        path="/product/realestate/views"
        element={<ProductEstateViews />}
      />
      <Route
        path="/product/realestate/deadline"
        element={<ProductEstateDeadline />}
      />
      <Route path="/product/luxuries" element={<ProductLuxuries />} />
      <Route
        path="/product/luxuries/views"
        element={<ProductLuxuriesViews />}
      />
      <Route
        path="/product/luxuries/deadline"
        element={<ProductLuxuriesDeadline />}
      />
      <Route path="/product/musiccopyright" element={<ProductMusic />} />
      <Route
        path="/product/musiccopyright/views"
        element={<ProductMusicViews />}
      />
      <Route
        path="/product/musiccopyright/deadline"
        element={<ProductMusicDeadline />}
      />
      <Route path="/product/detail/:productId" element={<ProductDetail />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myasset" element={<MyAsset />} />
      <Route path="/test" element={<ResearchTest />} />
    </Routes>
  );
}
