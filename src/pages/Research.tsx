import styled from "styled-components";
import Navigation from "../components/Navigation";
import Hood from "../components/Hood";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import { useEffect, useState } from "react";

import { imgList } from "../jsons/imgList";
import { newsList } from "../jsons/newsList";
import { chartList } from "../jsons/chartList";

import News, { INewsProps } from "../components/Research/News";
import Loading from "../components/Loading";
import Chart from "../components/Research/Chart";
import axios from "axios";
import ScrollTop from "../components/ScrollTop";

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
  const [news, setNews] = useState<INewsProps[]>([]);
  useEffect(() => {
    const url = "http://localhost:8000/pricelog/news/";

    const options = {
      method: "GET",
      headers: {
        // 'headers' 올바른 이름으로 수정
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios(url, options)
      .then((response) => {
        // setIsLoading(true);
        // console.log("로딩 시작");
        console.log(response.data);
        setNews(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // if (data?.estate) {
        //   const estate = data.estate;
        //   const luxury = data.luxury;
        //   const music = data.music;
        // }
        setIsLoading(false);
        // console.log("로딩 끝");
      });
  }, []);
  console.log("here");
  news?.map(function (element) {
    console.log(element.title);
  });
  return (
    <>
      {isLoading && <Loading />}
      <Hood title={"리서치"} />
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
              {news?.map((n, index) => (
                <News
                  title={n.title}
                  pubDate={n.pubDate}
                  originallink={n.originallink}
                  link={n.link}
                  description={n.description}
                />
              ))}
            </NewsList>
          </NewsTap>

          <ChartTap>
            <Title>HELLO</Title>
            <Charts>
              {/* {chartList.map((chart) => (
                <Chart />
              ))} */}
            </Charts>
          </ChartTap>
        </BottomBar>
      </Container>
      <ScrollTop />
      <Footer />
    </>
  );
}
