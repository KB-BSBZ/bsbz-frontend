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
import ScrollTop from "../components/ScrollTop";
import { useRecoilState } from "recoil";
import { popupState } from "../utils/atoms";
import PreferencePopup from "../components/LoginHome/PreferencePopUp";
import Popup from "./Popup";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useRecoilState(popupState);

  return (
    <>
      <Hood title={"홈페이지"} />
      {isLoading && <Loading />}
      {popup && <Popup />}
      <Navigation />
      {/* <Slider data={imgList} /> */}
      {/* <MainInfo /> */}
      <HomeInfo />
      <ScrollTop />
      <Footer />
    </>
  );
}
