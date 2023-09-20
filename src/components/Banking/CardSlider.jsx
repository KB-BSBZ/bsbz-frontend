import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import AddCard from "./AddCard";

// Import Swiper styles

// import required modules

export default function CardSlider({ userId }) {
  return (
    <Swiper
      slidesPerView={4}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      spaceBetween={30}
    >
      <SwiperSlide>
        <Card userId={userId} externalAccountId={"0"} />
      </SwiperSlide>
      <SwiperSlide>
        <AddCard userId={userId} externalAccountId={"1"} />
      </SwiperSlide>
      <SwiperSlide>
        <AddCard userId={userId} externalAccountId={"2"} />
      </SwiperSlide>
    </Swiper>
  );
}
