import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import styled from "styled-components";
import Card from "./Card";

export default function CardSlider() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card color="red" />
        </SwiperSlide>

        <SwiperSlide>
          <Card color="blue" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
