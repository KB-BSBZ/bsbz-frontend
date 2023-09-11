import styled from "styled-components";
import Navigation from "../components/Navigation";
import Hood from "../components/Hood";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import { useEffect, useState } from "react";

import { imgList } from "../jsons/imgList";
import { newsList } from "../jsons/newsList";
import { chartList } from "../jsons/chartList";

import News from "../components/Research/News";
import Loading from "../components/Loading";
import Chart from "../components/Research/Chart";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Recommandation = styled.div`
  /* background-color: ${(props) => props.theme.highlightColor}; */

  height: 100vh;
  width: 100%;

  padding-top: 10vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.textColor};

  h1 {
    margin: 10vh 0;
  }
`;

const BottomBar = styled.div`
  background-color: ${(props) => props.theme.highlightColor2};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;

  margin-top: 12vh;
  width: 90%;
  gap: 6%;
`;

const NewsTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 44%;
`;

const Charts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  background-color: white;
`;

const NewsList = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  font-size: 48px;
`;

const ChartTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 90%;
  width: 44%;
`;

interface ISliderProps {
  url: string;
  text: string;
  price: string;
  productId: string;
}

export default function Research() {
  const [sliderData, setSliderData] = useState<ISliderProps[]>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetch("/src/jsons/imgList.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSliderData(data);
  //       // 데이터 주입
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("ERROR: fetching slider-data error.");
  //     });
  // }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Hood title={"RESEARCH"} />
      <Navigation />
      <Container>
        <Recommandation>
          <h1>지금. 이 투자상품을 만나보세요.</h1>
          <Slider data={imgList} />
        </Recommandation>
        <BottomBar>
          <NewsTap>
            <Title>Hello</Title>
            <NewsList>
              {newsList.map((news) => (
                <News
                  key={news.postNumber}
                  title={news.title}
                  paragraph={news.paragraph}
                  postNumber={news.postNumber}
                  url={news.url}
                />
              ))}
            </NewsList>
          </NewsTap>

          <ChartTap>
            <Title>HELLO</Title>
            <Charts>
              {chartList.map((chart) => (
                <Chart />
              ))}
            </Charts>
          </ChartTap>
        </BottomBar>
      </Container>
      <Footer />
    </>
  );
}
