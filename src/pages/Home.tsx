import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
import Slider from "../components/Slider/Slider";
import MainInfo from "../components/Home/MainInfo";
import { styled } from "styled-components";
import Hood from "../components/Hood";
import { title } from "process";
import HomeInfo from "../components/Home/HomeInfo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Hood title={"홈페이지"} />
      {isLoading && <Loading />}
      <Navigation />
      {/* <Slider data={imgList} /> */}
      {/* <MainInfo /> */}
      <HomeInfo />
      <Footer />
    </>
  );
}
