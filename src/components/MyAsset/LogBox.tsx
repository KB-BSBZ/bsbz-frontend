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
  leftRoyal: number;
  productCost: number;
  productId: number;
  productName: string;
  productType: string;
  profileUrl: string;
  registerDate: string;
  totalRoyal: number;
  views: number;
}

export default function LogBoxDetail({
  product,
  sumRoyal,
  tradeDate,
  tradeRoyalCnt,
  tradelogId,
  userId,
}: LogData) {
  const [type, setType] = useState("타입");
  const [imgType, setImgType] = useState("img");
  useEffect(() => {
    if (product.productType === "estate") {
      setType("부 동 산");
      setImgType("../../images/home01.png");
    } else if (product.productType === "music") {
      setType(" 음 원 ");
      setImgType("../../images/itunes.png");
    } else if (product.productType === "luxury") {
      setType("럭 셔 리");
      setImgType("../../images/premium.png");
    }
  }, []);
  return (
    <>
      <Main>
        <Img>
          <img src={imgType}></img>
        </Img>
        <Data>
          <p>{type}</p>
          <p>{product.productName}</p>
          <p>거래 ROYAL: {tradeRoyalCnt}</p>
          <p>거래 일: {tradeDate}</p>
        </Data>
      </Main>
    </>
  );
}
