import { useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { logData } from "../jsons/logData";

const Container = styled.div`
  width: 100%;
`;
export default function PriceLogLineChart() {
  return (
    <Container>
      <ApexChart
        type="line"
        series={[
          {
            name: "가격",
            data: logData.map((item) => ({
              x: new Date(item.ymd).getTime(),
              y: item.price,
            })),
          },
        ]}
        options={{
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },

          // forecastDataPoints: {
          //   count: 12,
          // },

          stroke: {
            curve: "smooth",
            width: 2.2,
          },

          yaxis: {
            show: true,
            labels: {
              formatter: (value) =>
                `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, // 천원 단위로 ',' 추가
            },
            axisBorder: {
              show: true,
            },
            tickAmount: 4,

            title: {
              text: "단위 : 10,000",
              rotate: -90,
              offsetX: 0,
              offsetY: 0,
              style: {
                color: undefined,
                fontSize: "10px",
                fontWeight: 600,
                cssClass: "apexcharts-yaxis-title",
              },
            },
          },

          xaxis: {
            tickAmount: 8,
            axisBorder: {
              show: true,
            },
            labels: {
              show: true, // 가로축 값 보이게 하는 설정
              formatter: function (value) {
                // 날짜 포맷 변경 (YY.mm.DD)
                const date = new Date(value);
                return `${date.getFullYear().toString().slice(-2)}.${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}.${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`;
              },
            },
            type: "datetime",
          },

          // fill: {
          //   type: "gradient",
          //   gradient: {
          //     gradientToColors: ["#6c7b74", "#8c7ae6"],
          //     stops: [0, 100],
          //   },
          // },

          colors: ["#74ddd0"],

          tooltip: {
            enabled: true,
            y: {
              formatter: (value) =>
                `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, // 원화로 표시
            },
          },
        }}
      />
    </Container>
  );
}
