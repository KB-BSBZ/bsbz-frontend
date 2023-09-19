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

const Container = styled.div`
  padding-top: 20vh;

  width: 100%;
  height: 105vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Main = styled.div`
  height: 70%;
  width: 80%;

  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3%;
  /* background-color: blue; */
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
  justify-content: center;
  align-items: center;
`;

const UserHeader = styled.div`
  margin-top: 5%;

  width: 100%;
  height: 20%;
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

  height: 40%;
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

  font-size: 24px;
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
  height: 50%;
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

export default function Test() {
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState<IAssetsProps>();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData")!).userId;
    const total_url = "http://localhost:9999/user/totalroyals?" + userId;
    const assets_url = "http://localhost:9999/user/ownproducts/graph?" + userId;

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

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [total_response, assets_response] = await Promise.all([
          axios.get(total_url, total_options),
          axios.get(assets_url, asset_options),
        ]);

        setTotal(total_response.data);
        setAssets(assets_response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);

        console.log(JSON.parse(localStorage.getItem("userData")!).userId);
        console.log(assets);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        <Main>
          <UserBox>
            <UserHeader>
              <UserImg>
                <ProfileImg url={"../../images/bsbz-icon.png"} />
              </UserImg>
              <UserName>
                <b>
                  {JSON.parse(localStorage.getItem("userData")!).userName} 님,
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
                <h3>{total * 10000} 원</h3>
              </Total>
            </TotalBox>

            <Assets>
              <AssetPart bgcolor={"yellow"}>
                <AssetHeader>
                  <FontAwesomeIcon icon={faGem} />
                  <h5>쥬 얼 리</h5>
                </AssetHeader>

                <h5>{assets?.luxury ? assets.luxury : 0} ROYAL</h5>
              </AssetPart>

              <AssetPart bgcolor={"green"}>
                <AssetHeader>
                  <FontAwesomeIcon icon={faBuilding} />
                  <h5>부 동 산</h5>
                </AssetHeader>

                <h5>{assets?.estate ? assets.estate : 0} ROYAL</h5>
              </AssetPart>

              <AssetPart bgcolor={"blue"}>
                <AssetHeader>
                  <FontAwesomeIcon icon={faCompactDisc} />
                  <h5>음악 저작권</h5>
                </AssetHeader>
                <h5>{assets?.music ? assets.music : 0} ROYAL</h5>
              </AssetPart>
            </Assets>
          </UserBox>
          <InfoBox></InfoBox>
        </Main>
      </Container>
      <Footer />
    </>
  );
}
