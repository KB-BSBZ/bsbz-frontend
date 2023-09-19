import styled from "styled-components";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "right",
      labels: {
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      titleFont: {
        size: 12,
      },
      bodyFont: {
        size: 12,
      },
      footerFont: {
        // size: 10, // there is no footer by default
      },
      callbacks: {
        title: () => {
          return "보유 자산 비중";
        },
        label: (context) => {
          const count: number = context.dataset.data[
            context.dataIndex
          ] as number;
          const total: number = (context.dataset.data as number[]).reduce(
            (acc, cur) => acc + cur,
            0
          );
          const percentage: string = ((count / total) * 100).toFixed(2);
          const label: string = context.label;
          const info = `${label}: ${count} ROYAL (${percentage}%)`;
          return info;
        },
      },
    },
  },
};

export const DoughnutContainer = styled.div`
  width: 100%;
  height: 100%;
  /* max-width: 35rem;
  max-height: 30rem; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export interface asset {
  estate: number | undefined;
  luxury: number | undefined;
  music: number | undefined;
}
export default function AssetDoughnutChart({ luxury, estate, music }: asset) {
  const data = {
    labels: ["럭 셔 리", "부 동 산", "음 원"],
    datasets: [
      {
        label: "test",
        data: [luxury, estate, music],
        backgroundColor: ["#ffeb9b", "#c5f2ba", "#b5f2ff"],
        borderColor: ["#ffeb9b", "#c5f2ba", "#b5f2ff"],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  return (
    <Main>
      <DoughnutContainer>
        <ChartWrapper>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
      </DoughnutContainer>
    </Main>
  );
}
