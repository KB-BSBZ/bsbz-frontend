import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import ProductDetailInfo from "../components/Product/ProductDetailInfo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProductProps } from "../components/Product/ProductBox";

export default function ProductDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  const [data, setData] = useState<IProductProps>();

  useEffect(() => {
    const url = "http://localhost:9999/product/detail/";

    const options = {
      method: "GET",
      headers: {
        // 'headers' 올바른 이름으로 수정
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        productId: Number(productId),
      },
    };

    axios(url, options)
      .then((response) => {
        setIsLoading(true);
        // console.log("로딩 시작");

        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        // console.log("로딩 끝");
      }); // 오류 처리 추가
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      <ProductDetailInfo productid={productId} />
      <Footer />
    </>
  );
}
