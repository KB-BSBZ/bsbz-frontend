import styled from "styled-components";

const Container = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.color};
`;
export default function Card(color: string) {
  return (
    <Container color={color}>
      <h2>HELLO</h2>
    </Container>
  );
}
