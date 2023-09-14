import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components"; // styled-components 추가
import axios from "axios";
import Loading from "./Loading";

const Container = styled.div`
  /* 원하는 스타일을 적용하세요 */
`;

export interface AllProductGraphProps {
  estate: number;
  music: number;
  luxury: number;
}

export default function ApexChart({
  estate,
  music,
  luxury,
}: AllProductGraphProps) {
  const [series, setSeries] = useState<number[]>([44, 55, 100]);
  useEffect(() => {
    setSeries([estate, music, luxury]);
  }, []);
  return (
    <Container>
      <ReactApexChart
        type="pie"
        series={series}
        options={{
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          labels: ["부동산", "럭셔리", "음원"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
      />
    </Container>
  );
}
