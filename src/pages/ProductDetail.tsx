import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import ProductDetailInfo from "../components/Product/ProductDetailInfo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProductProps } from "../components/Product/ProductBox";
import styled from "styled-components";

export default function ProductDetail() {
  const { productId } = useParams();

  return (
    <>
      <Navigation />
      <ProductDetailInfo productid={productId ? productId : "0"} />
      <Footer />
    </>
  );
}
