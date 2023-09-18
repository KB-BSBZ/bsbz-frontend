import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components"; // styled-components 추가
import axios from "axios";
import Loading from "../Loading";

const Container = styled.div`
  /* border: 1px solid; */
  background-image: url("https://png.pngtree.com/png-vector/20200423/ourmid/pngtree-cute-bee-cartoon-illustration-png-image_2191783.jpg"); // 배경 이미지 URL을 설정하세요.
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 50%; // 그래프의 높이를 조정하세요.
`;

export interface RoyalLog {
  dates: string[];
  royals: number[];
  sumRoyal: number;
  tradeDate: string;
}

export default function LineChart({
  dates,
  royals,
}: {
  dates: string[];
  royals: number[];
}) {
  const [chartData, setChartData] = useState([
    10, 41, 35, 51, 49, 62, 69, 91, 148, 11, 11,
  ]);
  const [categories, setCategories] = useState(["1일"]);
  const [series, setSeries] = useState([
    {
      name: "ROYAL",
      data: chartData,
    },
  ]);
  useEffect(() => {
    setChartData(royals);
    setSeries([
      {
        name: "ROYAL",
        data: royals,
      },
    ]);
    const monthAndDayStrings = dates.map((dateString) => {
      const dateObject = new Date(dateString);
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      return `${month}/${day}`;
    });

    // 결과 출력
    console.log("날짜 데이터 파싱");
    console.log(monthAndDayStrings);
    setCategories(monthAndDayStrings);
    // console.log(processedDates[1]);

    // console.log("로얄 수 확인");
    // console.log(royals);
  }, [dates]);
  return (
    <Container>
      <ReactApexChart
        type="line"
        series={series}
        options={{
          chart: {
            width: 50,
            height: 50,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          colors: ["#FFD700", "#545454"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            // text: "Average High & Low Temperature",
            align: "left",
          },
          grid: {
            // row: {
            //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            //   opacity: 0.5,
            // },
            show: false,
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            // 여기에 Y 축 설정을 추가합니다.
            min: 0, // Y 축의 최소 값 설정
            max: 2000, // Y 축의 최대 값 설정
            tickAmount: 10, // Y 축의 눈금 간격 설정
          },
        }}
      />
    </Container>
  );
}
