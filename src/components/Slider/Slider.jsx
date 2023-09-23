import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import ImgBox from "./ImgBox";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Slider.css";

import { styled } from "styled-components";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import useScrollReset from "../../utils/useScrollReset";

const Container = styled.div`
  background-repeat: no-repeat;
  background-color: transparent;

  height: 95%;
  width: 100%;
`;

const DataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 42px;
  cursor: pointer;
`;

const TextBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  position: relative;
`;

const Head = styled.div`
  height: 10%;
  width: 50%;
  position: absolute;

  top: 30px;
  left: 12px;

  opacity: 0.6;
  transform: rotate(330deg);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${(props) => props.theme.highlightColor};
`;

const Body = styled.div`
  width: 80%;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  background-color: ${(props) => props.theme.blurColor3};
  padding: 12px;

  color: ${(props) => props.theme.textColor};
`;

const Main = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Last = styled.div`
  width: 80%;
  height: 20%;

  background-color: ${(props) => props.theme.blurColor};
  border-radius: 12px;
  color: ${(props) => props.theme.textColor2};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Slider({ data }) {
  const reset = useScrollReset();

  return (
    <Container>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((product) => (
          <SwiperSlide
            key={product.productId}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: product.productId % 2 === 0 ? "black" : "white",
              width: "calc(90% - 20px)", // 슬라이드 요소의 폭을 간격 포함 크기로 조절
              height: "95%",
            }}
          >
            <DataContainer
              onClick={() => reset(`/product/detail/${product.productId}`)}
            >
              <TextBox>
                <Head>
                  <h3>
                    {product.productType === "luxury"
                      ? "럭 셔 리"
                      : product.productType === "estate"
                      ? "부 동 산"
                      : product.productType === "music"
                      ? "음 악"
                      : null}
                  </h3>
                </Head>
                <Body>
                  {/* <p>{product.registerDate.split(" ")[0]}</p> */}

                  <Main>
                    <h2>
                      {product.productName.length < 36
                        ? product.productName
                        : product.productName.slice(0, 36) + " ..."}
                    </h2>
                  </Main>
                  <Last>
                    <p>{product.leftRoyal} ROYAL</p>
                  </Last>
                </Body>
              </TextBox>
              <ImgBox url={product.profileUrl} productid={product.productId} />
              {/* <Img url={product.url} /> */}
            </DataContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

/*
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
*/
