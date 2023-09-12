import { useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 10vh;
  background-color: red;
  height: 100vh;
`;

export default function MyPage() {
  const [isLoading, setIsLoading] = useState();

  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      <Container></Container>
    </>
  );
}
