import styled from "styled-components";
import { IProductProps } from "./ProductBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Hood from "../Hood";
import Loading from "../Loading";

import PredictedRangeChart from "../PredictedRangeChart";
import PriceLogLineChart from "../PriceLogLineChart";

import WordClouds from "../WordClouds";
import { render } from "react-dom";
import { useRecoilState } from "recoil";
import {
  PurchasePopupState,
  // leftRoyalsState,
  // prductCostState,
  productIdState,
} from "../../utils/atoms";
import Purchase from "./Purchase";
import { useSetRecoilState, useRecoilValue } from "recoil";
import PurchasePopup from "./PurchasePopup";

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
  height: 120vh;
  width: 75%;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const ImgBox = styled.span<{ url: string | undefined; isblur: string }>`
  width: 100%;
  height: 60%;

  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  /* object-fit: cover; */

  /* object-fit: cover; */
  object-fit: scale-down;
  /* background-position: center; */
  /* position: absolute; */
  background-size: cover;

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
  height: 50%;
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
  margin-top: 10vh;
  width: 90%;
  height: 240vh;
  background-color: ${(props) => props.theme.blurColor2};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 10vh 12vh 10vh;
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

const LeftBox = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

interface IDetailProps {
  productId: string;
}

export interface ILogProps {
  ymd: string;
  price: number;
}

const Static = styled.div`
  background-image: url("../../../images/BSBZ_PREMIUM_LUXURY_.png");
  width: 100%;
  /* height: 100%; */
  height: 240vh;

  background-position: center;
  background-repeat: no-repeat;
  /* object-fit: cover; */

  /* object-fit: cover; */
  object-fit: scale-down;
  /* background-position: center; */
  /* position: absolute; */
  background-size: cover;
`;

const CloudBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50%;
  height: 100%;
  svg {
    width: 120%;
    height: 140%;
  }
`;

const ChartBar = styled.div`
  width: 75%;
  /* background-color: red; */
  height: 60vh;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChartData = styled.div`
  width: 45%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  /* background-color: blue; */
`;

const TextBox = styled.span`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

export default function ProductDetailInfo({ productId }: IDetailProps) {
  const [remainingTime, setRemainingTime] = useState(0);
  const [data, setData] = useState<IProductProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isBlur, setIsBlur] = useState("true");
  const [logData, setLogData] = useState<ILogProps[]>([]);
  const [isType, setIsType] = useState(0);

  const [datesArray, setdatesArray] = useState<string[]>([]);
  const [royalsArray, setroyalsArray] = useState<number[]>([]);
  const [isModal, setIsModal] = useState(false);

  const [buyProductId, setBuyProductId] = useRecoilState(productIdState);

  const progressBarRef = useRef(null);

  const [purchasePopupState, setPurchasePopupState] =
    useRecoilState(PurchasePopupState);

  let bar: any = null;

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRefresh(true);
    }, 1000); // 10초(10000밀리초) 후에 리랜더링

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:9999/product/detail/";

        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            productId: Number(productId),
          },
        };
        const response = await axios(url, options);
        setData(response.data);
        console.log("아이디이이이이이이ㅣ");
        console.log(data?.productId);
        setBuyProductId(data?.productId);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        let currentDate = new Date();
        let targetDate = new Date(data?.endDate!);

        if (currentDate < targetDate) {
          const timeDiff = targetDate.getTime() - currentDate.getTime();
          const dayRemaining = Math.ceil(timeDiff / 1000 / (24 * 60 * 60));
          setRemainingTime(dayRemaining);
        } else {
          setRemainingTime(0);
        }
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

        // console.log(isType);

        bar = new ProgressBar.Line(progressBarRef.current, {
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
            // bar.setText(Math.floor(bar.value() * 100) + " %");
            if (data) {
              bar.setText(
                Math.floor(
                  ((parseFloat(String(data?.productCost)) / 10000 -
                    parseFloat(String(data?.leftRoyal))) /
                    (parseFloat(String(data?.productCost)) / 10000)) *
                    100
                ) + " %"
              );
            }
          },
        });

        if (data) {
          bar.animate(
            (data?.productCost - data?.leftRoyal * 10000) / data?.productCost
            // 0.2
          );
        }
      }
    };

    fetchData();

    return () => {
      bar.destroy();
    };
  }, [refresh]);

  const onModal = () => {
    setIsModal((current) => !current);
  };

  return (
    <>
      {isLoading && <Loading />}
      {purchasePopupState && <PurchasePopup productId={data?.productId} />}
      <Container>
        <Hood title={data?.productName || ""} />
        <TopBar>
          <LeftBox>
            <ImgBox url={data?.profileUrl} isblur={isBlur} />
            {/* {logData && <LineChart dates={datesArray} royals={royalsArray} />} */}
            {/* <h4>가격 변동 추이</h4>
            {data && (
              <PriceLogLineChart
                productType={data?.productType}
                productId={data?.productId}
              />
            )}

            <h4>예측 가격</h4>
            <PredictedRangeChart /> */}
          </LeftBox>
          <TextBox>
            <b>
              {remainingTime > 0 ? (
                <p>목표 날짜까지 {remainingTime} 일 남았습니다.</p>
              ) : (
                <p>목표 시간이 이미 지났습니다.</p>
              )}
            </b>
            <b>{data?.endDate.slice(0, 10)}</b>
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
                      <p>{data?.leftRoyal} ROYAL</p>
                    </Line>
                  </Info>
                </Box>

                <Line>
                  <ProgressBarContainer>
                    <div ref={progressBarRef} />
                  </ProgressBarContainer>
                </Line>

                {/* <Box>
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
                </Box> */}

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
                    <p>{data?.leftRoyal} ROYAL</p>
                  </Line>
                </Info>
              </Box> */}
                <h2>{data?.description}</h2>
              </TextLines>
            </InfoBox>

            <ButtonBox>
              {isBlur === "true" ? (
                <Button
                  width={"40%"}
                  height={"40%"}
                  hover={"red"}
                  color={"red"}
                  text={"마감 되었습니다"}
                />
              ) : (
                <Button
                  width={"40%"}
                  height={"40%"}
                  hover={"yellow"}
                  text={"구매 하기"}
                  onclick={onModal}
                />
              )}
              {isModal && <Purchase onModal={onModal} />}
            </ButtonBox>
          </TextBox>
        </TopBar>

        <ChartBar>
          <ChartData>
            <h4>가격 변동 추이</h4>
            {data && (
              <PriceLogLineChart
                productType={data?.productType}
                productId={data?.productId}
              />
            )}
          </ChartData>
          {data?.productType === "music" ? (
            <CloudBar>
              <h4>워드클라우드</h4>
              <WordClouds productId={data?.productId} />
            </CloudBar>
          ) : (
            <ChartData>
              <h4>예측 가격</h4>
              <PredictedRangeChart />
            </ChartData>
          )}
        </ChartBar>

        <StatisticsBar>
          <Static />
        </StatisticsBar>
      </Container>
    </>
  );
}
