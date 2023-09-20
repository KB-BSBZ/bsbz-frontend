import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import AddCard from "./AddCard";
import axios from "axios";

// Import Swiper styles

// import required modules

export default function CardSlider({ userId }) {
  const [externalAccounts, setExternalAccounts] = useState([]);
  useEffect(() => {
    const externalAccounts_url =
      "http://localhost:9999/user/getexternalaccounts?" + userId;
    const externalAccounts_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const fetchData = async () => {
      try {
        const [getexternalaccounts_response] = await Promise.all([
          axios.get(externalAccounts_url, externalAccounts_options),
        ]);
        setExternalAccounts(getexternalaccounts_response.data);
        console.log("가져온 외부 계좌");
        console.log(getexternalaccounts_response.data);
        console.log(externalAccounts);
      } catch (error) {
      } finally {
      }
    };
    fetchData();
  }, [userId]);
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
      {
        // 무조건 3번 반복하기 위해 빈 배열 생성 후 map 함수 사용
        [...Array(3)].map((_, index) => (
          <SwiperSlide key={index}>
            {
              // externalAccounts가 존재하고, 현재 index 위치에 데이터가 있는 경우 Card 컴포넌트 출력
              // 그렇지 않은 경우 AddCard 컴포넌트 출력
              externalAccounts && externalAccounts[index] ? (
                <Card
                  userId={userId}
                  exAccount={externalAccounts[index].exAccount}
                />
              ) : (
                <AddCard />
              )
            }
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}
