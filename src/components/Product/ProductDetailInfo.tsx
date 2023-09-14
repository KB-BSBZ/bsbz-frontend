import styled from "styled-components";
import { IProductProps } from "./ProductBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Hood from "../Hood";
import Loading from "../Loading";
const ProgressBar = require("progressbar.js");

const Container = styled.div`
  padding-top: 15vh;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopBar = styled.div`
  height: 190vh;
  width: 80%;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const ImgBox = styled.span<{ url: string | undefined }>`
  width: 50%;
  height: 40%;

  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
`;

const TextBox = styled.span`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const HeadLine = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  font-size: 36px;
  font-weight: bold;
`;

const InfoBox = styled.div`
  height: 85%;
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

  gap: 6vh;
`;

const StatisticsBar = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.highlightColor};
`;

const Line = styled.div`
  margin: 0 5%;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 2px solid ${(props) => props.theme.backgroundColor};
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; /* 프로그레스 바의 너비를 조절 */

  position: relative;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 6px solid ${(props) => props.theme.textColor};
  padding-top: 12px;
`;

const Info = styled.div`
  margin-top: 12px;

  background-color: ${(props) => props.theme.blurColor2};
  padding: 12px;
  border-radius: 24px;
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
              <Box>
                <h3>조각모집 현황</h3>
                <Info>
                  <Line>
                    <p>현재 모집금액</p>
                    <p>{data?.productCost}</p>
                  </Line>
                  <Line>
                    <p>남은 로얄</p>
                    <p>{data?.left_royal} ROYAL</p>
                  </Line>
                </Info>
              </Box>

              <Line>
                <ProgressBarContainer>
                  <div ref={progressBarRef} />
                </ProgressBarContainer>
              </Line>

              <Box>
                <h3>수익화 분석</h3>
                <Info>
                  <Line>
                    <p>1년 후 예상 수익률</p>
                    <p>10%</p>
                  </Line>
                  <Line>
                    <p>수익화 예상 기간</p>
                    <p>12개월</p>
                  </Line>
                  <Line>
                    <p>구매 상품 위험도</p>
                    <p>안정적</p>
                  </Line>
                </Info>
              </Box>

              <Box>
                <h3>조각 모집 정보</h3>
                <Info>
                  <Line>
                    <p>모집 기간</p>
                    <p>
                      {data?.registerDate.slice(0, 4) !==
                      data?.endDate.slice(0, 4)
                        ? `${data?.registerDate.slice(
                            0,
                            10
                          )} ~ ${data?.endDate.slice(0, 10)}`
                        : `${data?.registerDate.slice(
                            0,
                            10
                          )} ~ ${data?.endDate.slice(5, 10)}`}
                    </p>
                  </Line>
                  <Line>
                    <p>모집 가격</p>
                    <p>{data?.productCost} 원</p>
                  </Line>
                  <Line>
                    <p>조각당 가격</p>
                    <p>10,000 원</p>
                  </Line>
                </Info>
              </Box>

              {/* <Box>
                <h3>조각모집 현황</h3>
                <Info>
                  <Line>
                    <p>현재 모집금액</p>
                    <p>{data?.}</p>
                  </Line>
                  <Line>
                    <p>남은 로얄</p>
                    <p>{data?.left_royal} ROYAL</p>
                  </Line>
                </Info>
              </Box> */}
              <h2>{data?.description}</h2>
            </TextLines>

            <ButtonBox>
              <Button
                width={"40%"}
                height={"20%"}
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
