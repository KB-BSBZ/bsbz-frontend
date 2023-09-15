import styled from "styled-components";
import { IProductProps } from "./ProductBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Hood from "../Hood";
import Loading from "../Loading";
import { PriceLogGraph } from "../PriceLogGraph";
import ReactApexChart from "react-apexcharts";
import LineChart from "../MyAsset/LineChart";
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
  height: 180vh;
  width: 75%;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const ImgBox = styled.span<{ url: string | undefined; isblur: string }>`
  width: 100%;
  height: 40%;

  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;

  filter: ${(props) =>
    props.isblur === "true"
      ? "grayscale(100%)"
      : null}; /* 블러 효과 적용 (픽셀 수 조절 가능) */
  opacity: ${(props) =>
    props.isblur === "true"
      ? 0.6
      : null}; /* 투명도 설정 (0.0에서 1.0 사이의 값) */

  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
`;

const TextBox = styled.span`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const DetailBox = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 12px;

  padding: 1px 4px;
  border: 1px solid
    ${(props) =>
      props.color === "mint"
        ? props.theme.highlightColor2
        : props.color === "white"
        ? props.theme.backgroundColor
        : props.color === "red"
        ? props.theme.errorColor
        : props.theme.highlightColor};

  width: fit-content;
  background-color: ${(props) => props.theme.blurColor};
  color: ${(props) =>
    props.color === "mint"
      ? props.theme.highlightColor2
      : props.color === "white"
      ? props.theme.backgroundColor
      : props.color === "red"
      ? props.theme.errorColor
      : props.theme.highlightColor};

  margin-right: 2px;
`;

const HeadInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

interface IDetailProps {
  productid: string;
}

const LeftBox = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export interface ILogProps {
  ymd: string;
  price: number;
}

const dummy: ILogProps[] = [
  {
    ymd: "",
    price: 0,
  },
  {
    ymd: "",
    price: 0,
  },
  {
    ymd: "",
    price: 0,
  },
];

export default function ProductDetailInfo({ productid }: IDetailProps) {
  const [remainingTime, setRemainingTime] = useState(0);
  const [data, setData] = useState<IProductProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlur, setIsBlur] = useState("true");
  const [logData, setLogData] = useState<ILogProps[]>([]);
  const [isType, setIsType] = useState(0);

  const [datesArray, setdatesArray] = useState<string[]>([]);
  const [royalsArray, setroyalsArray] = useState<number[]>([]);

  const progressBarRef = useRef(null);
  const [count, setCount] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:9999/product/detail/";

      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          productId: Number(productid),
        },
      };

      const response = await axios(url, options);
      setIsLoading(true);
      setData(response.data);
      console.log(response.data);

      let currentDate = new Date();
      let targetDate = new Date(data?.endDate!);

      if (currentDate > targetDate) {
        setIsBlur("true");
      } else {
        setIsBlur("false");
      }

      let newIsType;
      // 바뀐 장고 서버에 요청할 때 사용될 url
      // let url = "http://127.0.0.1:8000/pricelog/" + {data?.productType} + "_log/"
      if (data?.productType === "estate") {
        newIsType = 1;
      } else if (data?.productType === "luxury") {
        newIsType = 2;
      } else if (data?.productType === "music") {
        newIsType = 3;
      } else {
        newIsType = 0;
      }

      setIsType(newIsType);

      console.log(isType);

      // const intervalId = setInterval(async () => {
      //   const currentTime = new Date();
      //   const timeDifference = Number(data?.endDate) - Number(currentTime);
      //   const secondsRemaining = Math.floor(timeDifference / 1000);
      //   setRemainingTime(secondsRemaining);

      //   if (secondsRemaining <= 0) {
      //     clearInterval(intervalId);
      //   }
      // }, 1000);

      // return () => {
      //   clearInterval(intervalId);
      // };
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      // const options = {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   params: {
      //     productId: Number(productid),
      //   },
      // };
      await axios
        .get(`http://127.0.0.1:8000/pricelog/log/11/2`)
        .then((response) => {
          console.log("전체 데이터");
          console.log(logData);

          const tempDatesArray: string[] = [];
          const tempRoyalsArray: number[] = [];
          // console.log("aaaaaaa");

          response.data.forEach((lineData: any) => {
            tempDatesArray.push(lineData.ymd);
            tempRoyalsArray.push(lineData.price);
          });

          console.log("array 보여줘");
          console.log(tempDatesArray);
          console.log(tempRoyalsArray);

          setdatesArray(tempDatesArray);
          setroyalsArray(tempRoyalsArray);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const bar = new ProgressBar.Line(progressBarRef.current, {
      strokeWidth: 12,
      easing: "easeInOut",
      duration: 3000,
      color: "#ffd700ff",
      trailColor: "#f0f0f0",
      trailWidth: 12,
      svgStyle: { width: "100%", height: "100%" },
      text: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "24px",
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
        bar.setText(Math.round(bar.value() * 100) + " %");
      },
    });

    bar.animate(1.0);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => {
      bar.destroy();
    };
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      <Hood title={data?.productName || ""} />
      <TopBar>
        <LeftBox>
          <ImgBox url={data?.profileUrl} isblur={isBlur} />
          {logData && <LineChart dates={datesArray} royals={royalsArray} />}
        </LeftBox>
        <TextBox>
          <b>
            {remainingTime > 0 ? (
              <p>목표 날짜까지 {remainingTime} 초 남았습니다.</p>
            ) : (
              <p>목표 시간이 이미 지났습니다.</p>
            )}
          </b>
          <b>{data?.registerDate.slice(0, 10)}</b>
          <HeadInfo>
            {data?.productType === "estate" ? (
              <DetailBox>부동산</DetailBox>
            ) : data?.productType === "luxury" ? (
              <DetailBox>럭셔리</DetailBox>
            ) : data?.productType === "music" ? (
              <DetailBox>음악 저작권</DetailBox>
            ) : null}
            {isBlur === "true" ? (
              <DetailBox color="red">마 감</DetailBox>
            ) : null}
          </HeadInfo>

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
              {isBlur === "true" ? (
                <Button
                  width={"40%"}
                  height={"20%"}
                  hover={"red"}
                  text={"마감 되었습니다"}
                />
              ) : (
                <Button
                  width={"40%"}
                  height={"20%"}
                  hover={"yellow"}
                  text={"구매 하기"}
                />
              )}
            </ButtonBox>
          </InfoBox>
        </TextBox>
      </TopBar>
      <StatisticsBar></StatisticsBar>
    </Container>
  );
}
