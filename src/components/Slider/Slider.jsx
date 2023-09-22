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

const Container = styled.div`
  background-repeat: no-repeat;
  background-color: transparent;

  height: 80%;
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
`;

const TextBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

export default function Slider({ data }) {
  console.log(data);

  return (
    <Container>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
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
              overflow: "hidden",
              // backgroundColor: product.productId % 2 === 0 ? "black" : "white",
              width: "calc(90% - 20px)", // 슬라이드 요소의 폭을 간격 포함 크기로 조절
              height: "95%",
            }}
          >
            <DataContainer>
              <TextBox>
                <h2>{product.name}</h2>
                <h3>{product.price} ROYAL</h3>
              </TextBox>
              <ImgBox url={product.url} productid={product.productId} />
              {/* <Img url={product.url} /> */}
            </DataContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
