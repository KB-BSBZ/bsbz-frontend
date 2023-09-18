import styled from "styled-components";
import Navigation from "../components/Navigation";
import Hood from "../components/Hood";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import { useEffect, useState } from "react";

import { imgList } from "../jsons/imgList";
import { newsList } from "../jsons/newsList";
import { chartList } from "../jsons/chartList";

import Loading from "../components/Loading";
import Chart from "../components/Research/Chart";
import axios from "axios";
import ScrollTop from "../components/ScrollTop";
import NewsSlider from "../components/Research/NewsSlider";

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

const NewsTap = styled.div`
  height: 75vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.textColor};

  h1 {
    margin-bottom: 10vh;
  }
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

export interface INewsProps {
  title: string;
  pubDate: string;
  originallink: string;
  link: string;
  description: string;
}

export default function Research() {
  const [sliderData, setSliderData] = useState<ISliderProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<INewsProps[]>([]);
  useEffect(() => {
    setNews(newsList);
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
        // setNews(response.data);
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
        <NewsTap>
          <h1>지금. 이 투자상품을 만나보세요.</h1>
          <NewsSlider data={newsList} />
        </NewsTap>
      </Container>
      <ScrollTop />
      <Footer />
    </>
  );
}
