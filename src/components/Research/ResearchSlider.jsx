import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../Slider/Slider.css";

import { styled } from "styled-components";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import NewsBox from "./NewsBox";
import ResearchBox from "./ResearchBox";

const Container = styled.div`
  background-repeat: no-repeat;
  background-color: transparent;

  height: 100%;
  width: 100%;
`;

export default function ResearchSlider({ data }) {
  return (
    <Container>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true, // 페이징 버튼을 클릭 가능하게 함
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((product) => (
          <SwiperSlide
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "36px",
              overflow: "hidden",
              // backgroundColor: product.productId % 2 === 0 ? "black" : "white",
              width: "calc(100% - 20px)", // 슬라이드 요소의 폭을 간격 포함 크기로 조절
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", // box-shadow 적용
              height: "90%",
            }}
          >
            <ResearchBox
              key={product.id}
              imageUrl={product.imageUrl}
              productName={product.productName}
              productCost={product.productCost}
              productId={product.productId}
              productType={product.productType}
              leftRoyal={product.leftRoyal}
              profileUrl={product.profileUrl}
              endDate={product.endDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
