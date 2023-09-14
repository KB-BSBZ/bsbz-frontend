import styled from "styled-components";
import { IProductProps } from "./ProductBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Hood from "../Hood";
import Loading from "../Loading";
const ProgressBar = require("progressbar.js");

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
  background-repeat: no-repeat;
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

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; /* 프로그레스 바의 너비를 조절 */

  position: relative;
`;

interface IDetailProps {
  productid: string;
}

export default function ProductDetailInfo({ productid }: IDetailProps) {
  const [data, setData] = useState<IProductProps>();
  const [isLoading, setIsLoading] = useState(false);

  const progressBarRef = useRef(null);

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

    // ProgressBar.js 초기화
    const bar = new ProgressBar.Line(progressBarRef.current, {
      strokeWidth: 12,
      easing: "easeInOut",
      duration: 3000, // 애니메이션 지속 시간 (2초)
      color: "#ffd700ff", // 프로그레스 바 색상
      trailColor: "#f0f0f0", // 빈 공간 색상
      trailWidth: 12, // 빈 공간 너비
      svgStyle: { width: "100%", height: "100%" },
      text: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "24px",
          // Text color.
          // Default: same as stroke color (options.color)
          color: "#343434ff",
          position: "absolute",
          top: "0",
          right: "45%",
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      from: { color: "#FFEA82" },
      to: { color: "#ED6A5A" },
      step: (state: any, bar: any) => {
        // 여기서 퍼센테이지 텍스트를 업데이트합니다.
        bar.setText(Math.round(bar.value() * 100) + " %");
      },
    });

    // 예를 들어, 50% 진행 상태로 업데이트
    // bar.animate((productCost / 10000 - left_royal) / productCost);
    bar.animate(0.8);

    // 컴포넌트 언마운트 시 ProgressBar.js 해제
    return () => {
      bar.destroy();
    };
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

            <Line>
              <ProgressBarContainer>
                <div ref={progressBarRef} />
              </ProgressBarContainer>
            </Line>
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
