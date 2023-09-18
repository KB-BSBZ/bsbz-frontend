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

export interface AllProductGraphProps {
  estate: number;
  luxury: number;
  music: number;
}

export default function ApexChart({
  estate,
  luxury,
  music,
}: AllProductGraphProps) {
  const [series, setSeries] = useState<number[]>([44, 55, 100]);
  useEffect(() => {
    setSeries([estate, luxury, music]);
  }, []);
  return (
    <Container>
      <ReactApexChart
        type="pie"
        series={series}
        options={{
          chart: {
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
