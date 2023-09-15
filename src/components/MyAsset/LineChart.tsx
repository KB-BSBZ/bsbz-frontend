import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components"; // styled-components 추가
import axios from "axios";
import Loading from "../Loading";

const Container = styled.div`
  /* border: 1px solid; */
  width: 100%;
  height: 100%;
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
    // console.log("aa");
    // console.log(royals);
  }, [dates]);
  return (
    <Container>
      <ReactApexChart
        type="line"
        series={series}
        options={{
          chart: {
            height: 350,
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
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: [
              "1일",
              "2일",
              "3일",
              "4일",
              "5일",
              "6일",
              "7일",
              "8일",
              "9일",
              "10일",
              "11일",
              "12일",
              "13일",
              "14일",
              "15일",
              "16일",
              "17일",
              "18일",
              "19일",
              "20일",
              "21일",
              "22일",
              "23일",
              "24일",
              "25일",
              "26일",
              "27일",
              "28일",
              "29일",
              "30일",
              "31일",
            ],
          },
          yaxis: {
            // 여기에 Y 축 설정을 추가합니다.
            min: 0, // Y 축의 최소 값 설정
            max: 200, // Y 축의 최대 값 설정
            tickAmount: 5, // Y 축의 눈금 간격 설정
          },
        }}
      />
    </Container>
  );
}
