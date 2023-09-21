import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
// import { logData } from "../jsons/logData";
import axios from "axios";

const Container = styled.div`
  width: 100%;
`;

interface ILogLineProps {
  data: ILogDataProps[];
}

export interface ILogDataProps {
  price: number;
  ymd: string;
}

interface IPriceLogData {
  productType: string;
  productId: number;
}

export default function PriceLogLineChart({
  productType,
  productId,
}: IPriceLogData) {
  const [logData, setLogData] = useState<ILogDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "http://localhost:8000/pricelog/" +
        `${productType}` +
        "_log/" +
        `${productId}/`;

      await axios
        .get(url)
        .then((response) => setLogData(response.data))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

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
            zoom: {
              enabled: false,
            },
            background: "transparent",
          },

          stroke: {
            curve: "smooth",
            width: 2.2,
          },

          legend: {
            show: true,
            showForSingleSeries: true,
            position: "bottom",
            horizontalAlign: "center",
            customLegendItems: ["단위 : 1만원"],
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
