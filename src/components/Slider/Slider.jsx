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

export default function Slider({ data }) {
  return (
    <Container>
      <Swiper
        slidesPerView={3}
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
              borderRadius: "36px",
              overflow: "hidden",
              // backgroundColor: product.productId % 2 === 0 ? "black" : "white",
              width: "calc(100% - 20px)", // 슬라이드 요소의 폭을 간격 포함 크기로 조절
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", // box-shadow 적용
              height: "95%",
            }}
          >
            <ImgBox
              url={product.url}
              name={product.name}
              price={product.price}
              productid={product.productId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
