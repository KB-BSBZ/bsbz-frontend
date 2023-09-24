import styled, { keyframes } from "styled-components";
import Navigation from "../components/Navigation";
import Hood from "../components/Hood";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import { useEffect, useState } from "react";

// import { imgList } from "../jsons/imgList";

import Loading from "../components/Loading";
import Chart from "../components/Research/Chart";
import axios from "axios";
import ScrollTop from "../components/ScrollTop";
import NewsSlider from "../components/Research/NewsSlider";
import ResearchSlider from "../components/Research/ResearchSlider";
import { chartList } from "../jsons/chartList";
import { IProductProps } from "../components/Product/ProductBox";
import useScrollReset from "../utils/useScrollReset";
import { useNavigate, useNavigation } from "react-router-dom";
import ResearchList from "../components/Research/ResearchList";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 95%;
`;

const Recommandation = styled.div`
  /* background-color: ${(props) => props.theme.highlightColor}; */

  height: 90vh;
  width: 100%;

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
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.textColor};
  gap: 2%;

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

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 58%;
  height: auto;
`;

const RightBox = styled.div`
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: auto;
  justify-content: start;
  align-items: start;
  margin-bottom: 10vh;
`;

const TabBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 10%;
`;

const Tab = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease-in-out;

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.highlightColor};
  }
`;

const News = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 32vh;
  margin-bottom: 2%;
  /* background-color: red; */
  position: relative;

  cursor: pointer;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.6);
`;

const NewsImg_01 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/images/news_background_01.png");
  background-position: center;
  object-fit: scale-down;
  background-size: cover;
`;

const NewsImg_02 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/images/news_background_02.png");
  background-position: center;
  object-fit: scale-down;
  background-size: cover;
`;

const NewsImg_03 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/images/news_background_03.png");
  background-position: center;
  object-fit: scale-down;
  background-size: cover;
`;

const NewsImg_04 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/images/news_background_04.png");
  background-position: center;
  object-fit: scale-down;
  background-size: cover;
`;

const NewsImg_05 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/images/news_background_05.png");
  background-position: center;
  object-fit: scale-down;
  background-size: cover;
`;

const NewsInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #353535;

  color: white;

  transition: opacity 0.3s ease-in-out;

  p {
    width: 90%;
  }

  &:hover {
    opacity: 1;
  }
`;

const NewsText = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 24px;
    color: white;
  }
`;

const Belt = styled.div`
  padding-top: 10vh;
  width: 100%;
  height: 56px;

  display: flex;
  white-space: nowrap;
  overflow: hidden;
`;

const beltScroll = keyframes`
  0% {
    transform: translateX(1200%);
  }
  100% {
    transform: translateX(-1200%);
  }
`;

const ScrollingText = styled.div`
  padding: 10px;
  margin-right: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  animation: ${beltScroll} 150s linear infinite;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface IPortfolioProps {
  product_name: string;
  price: number;
}

interface ICloudProps {
  word: string;
  frequency: number;
}

export default function ResearchTest() {
  const [sliderData, setSliderData] = useState<ISliderProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<INewsProps[]>([]);
  const [rank, setRank] = useState<IProductProps[]>([]);
  const [deadline, setDeadline] = useState<IProductProps[]>([]);
  const [recent, setRecent] = useState<IProductProps[]>([]);
  const [recommend, setRecommend] = useState<IProductProps[]>([]);
  const [cloud_01, setCloud_01] = useState<ICloudProps[]>([]);
  const [cloud_02, setCloud_02] = useState<ICloudProps[]>([]);

  const [tab, isTab] = useState("rank");

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollSpeed = 2; // 움직이는 속도

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prevPosition) => prevPosition + scrollSpeed);
    }, 16); // 60fps

    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    const cloud_01_url = "http://localhost:8000/pricelog/luxury_cloud_word/";
    const cloud_02_url = "http://localhost:8000/pricelog/estate_cloud_word/";
    const news_url = "http://localhost:8000/pricelog/news/";
    const product_url = "http://localhost:9999/product/allproducts";
    const allproduct_url = `${product_url}`;
    const recommend_url = "http://localhost:9999/product/recommend";

    const recommend_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        orderType: "그냥",
      },
    };

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
          recommend_response,
        ] = await Promise.all([
          axios(news_url, news_options),
          axios(allproduct_url, allproduct_options),
          axios(allproduct_url, deadline_options),
          axios(allproduct_url, recent_options),
          axios(recommend_url, recommend_options),
        ]);

        setNews(news_response.data);
        setRank(allproduct_response.data);
        setDeadline(deadline_response.data);
        setRecent(recent_response.data);
        setRecommend(recommend_response.data);
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

  const onTab = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.id);
    isTab(event.currentTarget.id);
  };

  // const nav = useNavigate();

  return (
    <>
      {isLoading && <Loading />}
      <Hood title={"리서치"} />
      <Navigation />
      <Belt style={{ transform: `translateX(-${scrollPosition}px)` }}></Belt>

      <Container>
        <LeftBox>
          <Recommandation>
            <h1>지금. 이 투자상품을 만나보세요.</h1>
            <Slider data={recommend} />
          </Recommandation>
          <TabBox>
            <Tab onClick={onTab} id={"rank"}>
              실시간 급상승
            </Tab>
            <Tab onClick={onTab} id={"deadline"}>
              마감 임박
            </Tab>
            <Tab onClick={onTab} id={"recent"}>
              실시간 거래
            </Tab>
          </TabBox>
          {tab === "rank" ? (
            <SoaringTap>
              <h1>실시간 급상승 품목 📈</h1>
              <ResearchList data={rank} />
            </SoaringTap>
          ) : tab === "deadline" ? (
            <SoaringTap>
              <h1>마감 임박 품목 ⌛</h1>
              <ResearchList data={deadline} />
            </SoaringTap>
          ) : (
            <SoaringTap>
              <h1>실시간 거래 품목 ⚡</h1>
              <ResearchList data={recent} />
            </SoaringTap>
          )}
        </LeftBox>

        <RightBox>
          <NewsTap>
            <h1>최신 소식을 알아보세요.</h1>
            {news &&
              news.map((newsData, index) => (
                <News
                  key={index}
                  onClick={() =>
                    (window.location.href = `${newsData.originallink}`)
                  }
                >
                  <NewsInfo>
                    <p>{newsData.description}</p>
                  </NewsInfo>
                  {index === 0 ? (
                    <NewsImg_01>
                      <NewsText>
                        <h3>{newsData.title}</h3>
                      </NewsText>
                    </NewsImg_01>
                  ) : index === 1 ? (
                    <NewsImg_02>
                      <NewsText>
                        <h3>{newsData.title}</h3>
                      </NewsText>
                    </NewsImg_02>
                  ) : index === 2 ? (
                    <NewsImg_03>
                      <NewsText>
                        <h3>{newsData.title}</h3>
                      </NewsText>
                    </NewsImg_03>
                  ) : index === 3 ? (
                    <NewsImg_04>
                      <NewsText>
                        <h3>{newsData.title}</h3>
                      </NewsText>
                    </NewsImg_04>
                  ) : index === 4 ? (
                    <NewsImg_05>
                      <NewsText>
                        <h3>{newsData.title}</h3>
                      </NewsText>
                    </NewsImg_05>
                  ) : null}
                </News>
              ))}
          </NewsTap>
        </RightBox>

        {/* <SoaringTap>
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
        </RecentTap> */}
      </Container>
      <ScrollTop />
      <Footer />
    </>
  );
}
