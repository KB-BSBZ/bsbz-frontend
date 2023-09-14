import { useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import Hood from "../components/Hood";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function MyAsset() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loading />}
      <Hood title={"나의 자산"} />
      <Navigation />
      <Container>
        <Body></Body>
      </Container>
      <Footer />
    </>
  );
}
