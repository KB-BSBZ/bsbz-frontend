import { useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { predictData } from "../jsons/predictData";

const Container = styled.div`
  width: 100%;
`;

export default function PredictedRangeChart() {
  // y축 깔끔하게 표시용
  function floorToThousand(num: number): number {
    return Math.floor(num / 1000) * 1000;
  }
  const minDataValue = floorToThousand(
    Math.min(...predictData.map((item) => item.lower))
  );
  const maxDataValue = floorToThousand(
    Math.max(...predictData.map((item) => item.upper))
  );

  return (
    <Container>
      <ApexChart
        type="rangeArea"
        series={[
          {
            type: "rangeArea",
            name: "예측 구간",
            data: predictData.map((item) => ({
              x: new Date(item.date).getTime(), // 올바른 형식의 날짜로 변환
              y: [item.lower, item.upper],
            })),
          },
          {
            type: "line",
            name: "예측 가격",
            data: predictData.map((item) => ({
              x: new Date(item.date).getTime(),
              y: item.predict,
            })),
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "rangeArea",
            animations: {
              speed: 500,
            },
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            defaultLocale: "kor",
            locales: [
              {
                name: "kor",
                options: {
                  months: [
                    "1월",
                    "2월",
                    "3월",
                    "4월",
                    "5월",
                    "6월",
                    "7월",
                    "8월",
                    "9월",
                    "10월",
                    "11월",
                    "12월",
                  ],
                  shortMonths: [
                    "1월",
                    "2월",
                    "3월",
                    "4월",
                    "5월",
                    "6월",
                    "7월",
                    "8월",
                    "9월",
                    "10월",
                    "11월",
                    "12월",
                  ],
                },
              },
            ],
          },

          colors: ["#74ddd0", "#74ddd0"],

          dataLabels: {
            enabled: false,
          },

          fill: {
            opacity: [0.2, 1],
          },

          stroke: {
            curve: "straight",
            width: [0, 3],
          },

          legend: {
            show: false,
            customLegendItems: ["가격 예측"],
            inverseOrder: true,
          },

          markers: {
            size: 2,
            hover: {
              sizeOffset: 4,
            },
          },

          yaxis: {
            show: true,
            tickAmount: 5,
            min: minDataValue - 1000,
            max: maxDataValue + 1000,
            labels: {
              formatter: (value) =>
                `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`, // 천원 단위로 ',' 추가
            },
            axisBorder: {
              show: true,
            },
          },

          xaxis: {
            axisBorder: {
              show: true,
            },
            labels: {
              show: true, // 가로축 값 보이게 하는 설정
              datetimeFormatter: {
                year: "yyyy",
                month: "MM.dd",
                day: "MM.dd",
              },
            },
            type: "datetime",
          },

          tooltip: {
            enabled: true,
            x: { format: "MMM dd" + "일" },
            y: {
              formatter: (value) =>
                `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`, // 원화로 표시
            },
          },
        }}
      />
    </Container>
  );
}
