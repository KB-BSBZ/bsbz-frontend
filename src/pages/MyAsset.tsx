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
import LogListBox from "../components/MyAsset/LogListBox";
import MyAssetListBox, {
  LogData,
  LogProduct,
} from "../components/MyAsset/MyAssetListBox";
import Loading from "../components/Loading";
import useScrollReset from "../utils/useScrollReset";

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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 56px;
  width: 62%;
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

  h4 {
    text-align: center;
    font-size: 13px;
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
  padding: 5%;

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

const AssetImg = styled.div<{ url: string }>`
  background: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center;
  object-fit: scale-down;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;

  width: 1rem;
  height: 1rem;
`;

const TotalBox = styled.div`
  margin-top: 5%;
  height: 30%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: start;
`;

interface IAssetsProps {
  music: number;
  estate: number;
  luxury: number;
}

export default function MyAsset() {
  const isLogin = localStorage.getItem("userData") ? true : false;
  const reset = useScrollReset();
  useEffect(() => {
    const isLogin = localStorage.getItem("userData") ? true : false;
    if (!isLogin) {
      reset("/login");
    }
  }, [isLogin]);

  const [username, setUsername] = useState("");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState<IAssetsProps>();
  const [bonus, setBonus] = useState(0);
  const [LineChartData, setLineChartData] = useState<RoyalLog[]>([]);
  const [datesArray, setdatesArray] = useState<string[]>([]);
  const [royalsArray, setroyalsArray] = useState<number[]>([]);
  const [ranking, setRanking] = useState(0);
  const [logData, setLogData] = useState<LogData[]>([]);
  const [assetData, setAssetData] = useState<LogData[]>([]);

  const [tab, setTab] = useState("royal");

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData")!).userId;
    const total_url = "http://localhost:9999/user/totalroyals?" + userId;
    const assets_url = "http://localhost:9999/user/ownproducts/graph?" + userId;
    const bonus_url = "http://localhost:9999/user/bonus?" + userId;
    const totalroyalsDaily_url =
      "http://localhost:9999/user/ownproducts/totalroyalsDaily?" + userId;

    const ranking_url = "http://localhost:9999/user/ranking?" + userId;
    const userTradeLog_url =
      "http://localhost:9999/user/usertradeLog?" + userId;
    const ownProducts_url = "http://localhost:9999/user/ownproducts?" + userId;

    const total_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const asset_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const bonus_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const totalroyalsDaily_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const ranking_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const userTradeLog_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const ownProducts_options = {
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
      try {
        setIsLoading(true);

        const [
          total_response,
          assets_response,
          bonus_response,
          totalroyalsDaily_response,
          ranking_response,
          userTradeLog_response,
          ownProducts_response,
        ] = await Promise.all([
          axios.get(total_url, total_options),
          axios.get(assets_url, asset_options),
          axios.get(bonus_url, bonus_options),
          axios.get(totalroyalsDaily_url, totalroyalsDaily_options),
          axios.get(ranking_url, ranking_options),
          axios.get(userTradeLog_url, userTradeLog_options),
          axios.get(ownProducts_url, ownProducts_options),
        ]);

        setTotal(total_response.data);
        setAssets(assets_response.data);
        setBonus(bonus_response.data);
        setLineChartData(totalroyalsDaily_response.data);
        setRanking(ranking_response.data);
        setLogData(userTradeLog_response.data);
        setAssetData(ownProducts_response.data);

        const tempDatesArray: string[] = [];
        const tempRoyalsArray: number[] = [];

        totalroyalsDaily_response.data.forEach((lineData: any) => {
          tempDatesArray.push(lineData.tradeDate);
          tempRoyalsArray.push(lineData.sumRoyal);
        });
        setdatesArray(tempDatesArray);
        setroyalsArray(tempRoyalsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        console.log("유저 아이디 ::");
        console.log(JSON.parse(localStorage.getItem("userData")!).userId);
        console.log("총 로얄 수 :: ");
        console.log(total);
        console.log("자산 비중 :: ");
        console.log(assets?.luxury);
        console.log(assets?.estate);
        console.log(assets?.music);
        console.log("배당금 :: ");
        console.log(bonus);
        console.log("랭킹 :: ");
        console.log(ranking);
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
      <Container>
        <Main>
          <UserBox>
            <UserHeader>
              <UserImg>
                <ProfileImg url={"../../images/profile.png"} />
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
                <h2>총 자산</h2>
                <h3>{total * 10000} 원</h3>
              </Total>

              <Total>
                <h2>배당금</h2>
                <h3>{bonus} 원</h3>
              </Total>
            </TotalBox>
            <Ranking ranking={ranking} />
            <AssetDoughnutChart
              estate={assets?.estate}
              luxury={assets?.luxury}
              music={assets?.music}
            ></AssetDoughnutChart>
            <Assets>
              <AssetPart bgcolor={"yellow"}>
                <AssetHeader>
                  <AssetImg url={"../../images/luxury-icon2.png"} />
                  <h5>쥬 얼 리</h5>
                </AssetHeader>

                <h5>{assets?.luxury ? assets.luxury : 0} ROYAL</h5>
              </AssetPart>

              <AssetPart bgcolor={"green"}>
                <AssetHeader>
                  <AssetImg url={"../../images/estate-icon.png"} />
                  <h5>부 동 산</h5>
                </AssetHeader>

                <h5>{assets?.estate ? assets.estate : 0} ROYAL</h5>
              </AssetPart>

              <AssetPart bgcolor={"blue"}>
                <AssetHeader>
                  <AssetImg url={"../../images/music-icon.png"} />
                  <h5>음악 저작권</h5>
                </AssetHeader>
                <h5>{assets?.music ? assets.music : 0} ROYAL</h5>
              </AssetPart>
            </Assets>
          </UserBox>
          {tab === "royal" ? (
            <InfoBox>
              <h2>보유 ROYAL 추이</h2>
              {LineChartData && (
                <LineChart dates={datesArray} royals={royalsArray} />
              )}
              {/* 그래프 옮기려면 여기 위에 코드 그대로 옮기면 됨 */}
            </InfoBox>
          ) : tab === "product" ? (
            <InfoBox>
              <h2>보유 항목</h2>
              <MyAssetListBox AssetLogDataArray={assetData}></MyAssetListBox>
            </InfoBox>
          ) : tab === "log" ? (
            <InfoBox>
              <h2>거래 로그</h2>
              <LogListBox LogDataArray={logData}></LogListBox>
            </InfoBox>
          ) : null}
        </Main>
        <Tabs>
          <Tab onClick={onTab} id="royal">
            <h4>
              보유
              <br />
              ROYAL
            </h4>
          </Tab>
          <Tab onClick={onTab} id="product">
            <h4>
              보유
              <br />
              항목
            </h4>
          </Tab>
          <Tab onClick={onTab} id="log">
            <h4>
              거래
              <br />
              로그
            </h4>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
}
