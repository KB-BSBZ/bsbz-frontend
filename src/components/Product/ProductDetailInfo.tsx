import styled from "styled-components";
import { IProductProps } from "./ProductBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Hood from "../Hood";
import Loading from "../Loading";

const Container = styled.div`
  padding-top: 10vh;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopBar = styled.div`
  height: 90vh;
  width: 80%;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImgBox = styled.span<{ url: string | undefined }>`
  width: 50%;
  height: 80%;

  background-image: url(${(props) => props.url});
  background-position: center;
  object-fit: cover;
`;

const TextBox = styled.span`
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const HeadLine = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  font-size: 36px;
  font-weight: bold;
`;

const InfoBox = styled.div`
  height: 80%;
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextLines = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const StatisticsBar = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.highlightColor};
`;

interface IDetailProps {
  productid: string;
}

export default function ProductDetailInfo({ productid }: IDetailProps) {
  const [data, setData] = useState<IProductProps>();
  const [isLoading, setIsLoading] = useState(false);

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
        productId: Number(productid),
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
    <Container>
      {isLoading && <Loading />}
      <Hood title={data?.productName || ""} />
      <TopBar>
        <ImgBox url={data?.profileUrl} />
        <TextBox>
          <b>{data?.registerDate.slice(0, 10)}</b>
          <b>{data?.productType}</b>
          <HeadLine>{data?.productName}</HeadLine>

          <InfoBox>
            <TextLines>
              <h2>총 {data?.productCost} 원</h2>
              <h2>총 {data?.totalRoyal} ROYAL</h2>
              <h2>남은 {data?.left_royal} ROYAL</h2>
              <h2>{data?.description}</h2>
              <h2>{data?.endDate}</h2>
            </TextLines>
            <ButtonBox>
              <Button
                width={"40%"}
                height={"100%"}
                hover={"yellow"}
                text={"구매 하기"}
              />
            </ButtonBox>
          </InfoBox>
        </TextBox>
      </TopBar>
      <StatisticsBar></StatisticsBar>
    </Container>
  );
}
