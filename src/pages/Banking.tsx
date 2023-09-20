import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { async } from "q";
import axios from "axios";
import DonutChart from "../components/MyAsset/DonutChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGem } from "@fortawesome/free-regular-svg-icons";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";
import AssetDoughnutChart from "../components/MyAsset/AssetDoughnutChart";
import LineChart, { RoyalLog } from "../components/MyAsset/LineChart";
import Ranking from "../components/MyAsset/Ranking";
import { LogData } from "../components/MyAsset/LogBox";
import LogListBox from "../components/MyAsset/LogListBox";
import MyAssetListBox from "../components/MyAsset/MyAssetListBox";
import Loading from "../components/Loading";
import useScrollReset from "../utils/useScrollReset";
import Hood from "../components/Hood";

import { Swiper, SwiperSlide } from "swiper/react";
import CardSlider from "../components/Banking/CardSlider";
import { addCardModalState, cardIndexState } from "../utils/atoms";
import { useRecoilState } from "recoil";
import AddCardModal from "../components/Banking/AddCardModal";

const Container = styled.div`
  padding-top: 20vh;

  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  color: ${(props) => props.theme.textColor};
`;

const Main = styled.div`
  height: 70%;
  width: 70%;

  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3%;
  /* background-color: blue; */

  position: relative;
`;

const Tabs = styled.div`
  /* background-color: blue; */
  height: 30%;
  width: 8%;

  position: absolute;
  right: 6%;
  display: flex;
  gap: 5%;

  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Tab = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 56px;
  width: 100%;
  height: 30%;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.2);
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.textColor2};
    background-color: ${(props) => props.theme.highlightColor};
  }
`;

const UserBox = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.blurColor3};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 3%;
  padding: 0 5%;
`;

const InfoBox = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border-radius: 3%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h2 {
    padding-top: 5%;
  }
`;

const UserHeader = styled.div`
  margin-top: 5%;

  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;

  background-color: white;
`;

const ProfileImg = styled.div<{ url: string }>`
  background: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center;
  object-fit: scale-down;

  width: 100%;
  height: 100%;
`;

const UserImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const UserName = styled.div``;

const Total = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Assets = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3%;

  height: 80%;
`;

const AssetPart = styled.div<{ bgcolor: string }>`
  width: 100%;
  border-radius: 48px;
  height: 28%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  background-color: ${(props) =>
    props.bgcolor === "yellow"
      ? props.theme.testColor1
      : props.bgcolor === "blue"
      ? props.theme.testColor2
      : props.bgcolor === "green"
      ? props.theme.testColor3
      : null};

  font-size: 18px;
`;

const AssetHeader = styled.div`
  height: 100%;
  width: 50%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TotalBox = styled.div`
  margin-top: 5%;
  height: 30%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: start;
`;

const Cards = styled.div`
  margin-top: 10%;
  width: 100%;
  height: 42%;
`;

export default function Banking() {
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addCardModal, setAddCardModal] = useRecoilState(addCardModalState);
  const [cardIndex, setcardIndex] = useRecoilState(cardIndexState);

  const [account, setAccount] = useState();
  const [exAccount, setExAccount] = useState();
  const [tab, setTab] = useState("deposit");
  const isLogin = localStorage.getItem("userData") ? true : false;
  const [id, setId] = useState("");

  const reset = useScrollReset();
  if (!isLogin) {
    reset("/login");
  }

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData")!).userId;
    setId(userId);
    const account_url = "http://localhost:9999/account/balance?" + userId;
    const account_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };

    const ex_account_url =
      "http://localhost:9999/user/getexternalaccounts?" + userId;
    const ex_account_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const fetchData = async () => {
      if (!localStorage.getItem("userData")) {
        // 로그인 되어있지 않으면 로그인 창으로
        reset("/login");
      } else {
        try {
          setIsLoading(true);

          const [account_response, ex_account_response] = await Promise.all([
            axios(account_url, account_options),
            axios(ex_account_url, ex_account_options),
          ]);

          console.log(account_response.data);
          console.log(ex_account_response.data);

          setAccount(account_response.data);
          setExAccount(ex_account_response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          console.log("유저 아이디 ::");
          console.log(JSON.parse(localStorage.getItem("userData")!).userId);
        }
      }
    };

    fetchData();
  }, []);

  const onTab = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.id);
    setTab(event.currentTarget.id);
    // 값 전달
  };

  return (
    <>
      <Navigation />
      {isLoading && <Loading />}
      {addCardModal && (
        <AddCardModal userId={id} externalAccountId={cardIndex} />
      )}
      <Container>
        <Hood title={"입출금"} />
        <Main>
          <UserBox>
            <UserHeader>
              <UserImg>
                <ProfileImg url={"../../images/bsbz-icon.png"} />
              </UserImg>
              <UserName>
                <b>
                  {localStorage.getItem("userData") &&
                    JSON.parse(localStorage.getItem("userData")!).userName}{" "}
                  님,
                </b>
                <p>좋은 하루 되세요!</p>
              </UserName>
            </UserHeader>
            <TotalBox>
              <Total>
                <h2>계좌 잔액</h2>
                <h3>{account} 원</h3>
              </Total>
            </TotalBox>
          </UserBox>
          <InfoBox>
            <Cards>
              <CardSlider userId={id} />
            </Cards>
            <h1>{cardIndex}</h1>
          </InfoBox>
        </Main>
        <Tabs>
          <Tab onClick={onTab} id="deposit">
            <h4>입 금</h4>
          </Tab>
          <Tab onClick={onTab} id="withdraw">
            <h4>출 금</h4>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
}
