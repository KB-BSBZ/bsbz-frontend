import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Hood from "../components/Hood";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import useScrollReset from "../utils/useScrollReset";
import CardSlider from "../components/Banking/CardSlider";

const Container = styled.div`
  padding: 10vh 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.span`
  margin-top: 10vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  h2 {
    margin-left: 10vh;
    font-size: 48px;
    border-bottom: 6px solid;
  }
`;

const CardBox = styled.div`
  height: 75vh;
  width: 22%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Banking() {
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = localStorage.getItem("userData") ? true : false;
  const reset = useScrollReset();
  useEffect(() => {
    if (!isLogin) {
      reset("/login");
    }
  }, [isLogin]);
  return (
    <>
      <Hood title={"입출금"} />
      {isLoading && <Loading />}
      <Navigation />
      <Container>
        <Header>
          <h2>입출금 페이지</h2>
        </Header>

        <CardBox>
          <CardSlider></CardSlider>
          <h2>카드를 선택해주세요.</h2>
        </CardBox>
      </Container>
      <Footer />
    </>
  );
}
