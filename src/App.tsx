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
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}
