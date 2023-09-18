import styled from "styled-components";
import Navigation from "../components/Navigation";
import Hood from "../components/Hood";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import { useEffect, useState } from "react";

import { imgList } from "../jsons/imgList";

import Loading from "../components/Loading";
import Chart from "../components/Research/Chart";
import axios from "axios";
import ScrollTop from "../components/ScrollTop";
import NewsSlider from "../components/Research/NewsSlider";
import ResearchSlider from "../components/Research/ResearchSlider";
import { chartList } from "../jsons/chartList";
import { IProductProps } from "../components/Product/ProductBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  height: 70vh;
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

const SoaringTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;

  h1 {
    margin-bottom: 2vh;
  }
`;

const DeadlineTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;

  h1 {
    margin-bottom: 2vh;
  }
`;

const RecentTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;

  h1 {
    margin-bottom: 2vh;
  }
`;

export default function Research() {
  const [sliderData, setSliderData] = useState<ISliderProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<INewsProps[]>([]);
  const [rank, setRank] = useState<IProductProps[]>([]);
  const [deadline, setDeadline] = useState<IProductProps[]>([]);
  const [recent, setRecent] = useState<IProductProps[]>([]);

  useEffect(() => {
    const news_url = "http://localhost:8000/pricelog/news/";
    const product_url = "http://localhost:9999/product/allproducts";
    const allproduct_url = `${product_url}`;

    const allproduct_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        orderType: "",
      },
    };

    const deadline_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        orderType: "마감",
      },
    };

    const recent_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        orderType: "조회수",
      },
    };

    const news_options = {
      method: "GET",
      headers: {
        // 'headers' 올바른 이름으로 수정
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [
          news_response,
          allproduct_response,
          deadline_response,
          recent_response,
        ] = await Promise.all([
          axios(news_url, news_options),
          axios(allproduct_url, allproduct_options),
          axios(allproduct_url, deadline_options),
          axios(allproduct_url, recent_options),
        ]);

        setNews(news_response.data);
        setRank(allproduct_response.data);
        setDeadline(deadline_response.data);
        setRecent(recent_response.data);
      } catch (error) {
        console.error("에러 발생 : ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("here");
  news?.map(function (element) {
    console.log(element);
  });

  // const nav = useNavigate();

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
          <h1>조각투자. 최신 소식을 알아보세요.</h1>
          <NewsSlider data={news} />
        </NewsTap>

        <SoaringTap>
          <h1>실시간 급상승 품목 📈</h1>
          <ResearchSlider data={rank} />
        </SoaringTap>

        <DeadlineTap>
          <h1>마감 임박 품목 ⌛</h1>
          <ResearchSlider data={deadline} />
        </DeadlineTap>

        <RecentTap>
          <h1>실시간 거래 품목 ⚡</h1>
          <ResearchSlider data={recent} />
        </RecentTap>
      </Container>
      <ScrollTop />
      <Footer />
    </>
  );
}
