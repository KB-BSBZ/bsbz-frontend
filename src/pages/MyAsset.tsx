import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import Hood from "../components/Hood";
import Donut, { AllProductGraphProps } from "../components/Donut";
import axios from "axios";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function MyAsset() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<AllProductGraphProps>();
  useEffect(() => {
    const url = "http://localhost:9999/user/ownproducts/graph";

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        userId: "lcy923",
      },
    };
    axios(url, options)
      .then((response) => {
        // setIsLoading(true);
        // console.log("로딩 시작");

        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (data?.estate) {
          const estate = data.estate;
          const luxury = data.luxury;
          const music = data.music;
        }
        // setIsLoading(false);
        // console.log("로딩 끝");
      }); // 오류 처리 추가
  }, []);
  const GraphBox = styled.div`
    width: 50%;
    height: 50%;
  `;

  return (
    <>
      {isLoading && <Loading />}
      <Hood title={"나의 자산"} />
      <Navigation />
      <Container>
        <Body>
          <GraphBox>
            {data && (
              <Donut
                estate={data.estate}
                music={data.music}
                luxury={data.luxury}
              />
            )}
          </GraphBox>
        </Body>
      </Container>
      <Footer />
    </>
  );
}
