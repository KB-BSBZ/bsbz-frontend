import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { async } from "q";
import axios from "axios";

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
  margin-top: 10%;

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

const AssetPart = styled.div`
  width: 100%;
  border-radius: 48px;
  height: 28%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  background-color: red;
`;

export default function Test() {
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const total_url = "http://localhost:8000/user/totalroyals";

    const total_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        orderType: "",
      },
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [total_response] = await Promise.all([axios.get(total_url)]);

        setTotal(total_response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
            <Total>
              <h2>총 자산</h2>
              <h2>{total} 원</h2>
            </Total>

            <Assets>
              <AssetPart>
                <h5>원</h5>
              </AssetPart>
              <AssetPart></AssetPart>
              <AssetPart></AssetPart>
            </Assets>
          </UserBox>
          <InfoBox></InfoBox>
        </Main>
      </Container>
      <Footer />
    </>
  );
}
