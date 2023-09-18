import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Main = styled.div`
  height: 100%;
  width: 100%;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: row;
`;
const Img = styled.div`
  height: 50%;
  width: 20%;
  border: 1px solid;
  img {
    object-fit: cover;
    width: 50%;
    height: 50%;
  }
`;
const Data = styled.div`
  height: 100%;
  width: 70%;
  border: 1px solid yellow;
`;
export interface LogData {
  product: LogProduct;
  sumRoyal: number;
  tradeDate: string;
  tradeRoyalCnt: number;
  tradelogId: number;
  userId: string;
}
interface LogProduct {
  bonus: number;
  description: string | null;
  endDate: string;
  extra: string | null;
  imageUrl: string;
  left_royal: number;
  productCost: number;
  productId: number;
  productName: string;
  productType: string;
  profileUrl: string;
  registerDate: string;
  totalRoyal: number;
  views: number;
}

export default function MyProductsListBox({
  product,
  sumRoyal,
  tradeDate,
  tradeRoyalCnt,
  tradelogId,
  userId,
}: LogData) {
  const [type, setType] = useState("타입");
  useEffect(() => {
    if (product.productType === "estate") {
      setType("부 동 산");
    } else if (product.productType === "music") {
      setType(" 음 원 ");
    } else if (product.productType === "luxury") {
      setType("럭 셔 리");
    }
    console.log(product.imageUrl);
    console.log(product);
  }, []);
  return (
    <>
      <Main>
        <Img>
          <img src={product.profileUrl}></img>
        </Img>
        <Data>
          {type}
          <p>{product.productName}</p>
          <p>보유 ROYAL: {tradeRoyalCnt}</p>
        </Data>
      </Main>
    </>
  );
}
