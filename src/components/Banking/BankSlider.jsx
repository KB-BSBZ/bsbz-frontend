// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import ImgBox from "../Slider/ImgBox";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
  width: 40%;
`;

export default function BankSlider({ data }) {
  return (
    <Container>
      <Swiper
        effect={"coverflow"}
        // navigation={true}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        s
        pagination={true}
        centeredSlides={true}
        slidesPerView={2}
        grabCursor={true}
        coverflowEffect={{
          rotate: 0, // 회전각도
          stretch: 0,
          depth: 100, // 깊이감도
          modifier: 2, //
          slideShadows: true, //선택한 부분 밝게 나머지는 그늘지게 해준다.
        }}
        className="mySwiper"
      >
        {data.map((product) => (
          <SwiperSlide
            key={product.productId}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffd700ff",
            }}
          >
            <ImgBox
              url={product.url}
              text={product.text}
              price={product.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
