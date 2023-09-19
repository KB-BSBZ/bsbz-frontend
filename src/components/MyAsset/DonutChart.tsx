import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";

const Container = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function DonutChart() {
  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        data: [30, 70], // 데이터 비율 설정
        backgroundColor: ["red", "blue"], // 색상 설정
      },
    ],
  };

  return (
    <Container>
      <Doughnut data={data} />
    </Container>
  );
}
