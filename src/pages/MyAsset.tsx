import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import Hood from "../components/Hood";
import Donut, { AllProductGraphProps } from "../components/MyAsset/PieChart";
import axios from "axios";
import LineChart, { RoyalLog } from "../components/MyAsset/LineChart";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
`;

const Main = styled.div`
  width: 80%;
  height: 80%;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BalanceBox = styled.div`
  border: 1px solid;
  width: 80%;
  height: 30%;
  margin-bottom: 50px;
`;
const GraphBox = styled.div`
  width: 33.3%;
  height: 100%;
  /* border: 1px solid; */
`;
const GraphBox2 = styled.div`
  width: 33.3%;
  height: 100%;
  /* border: 1px solid; */
`;
const GraphBox3 = styled.div`
  width: 33.3%;
  height: 100%;
  /* border: 1px solid; */
`;

const MainGraphBox = styled.div`
  border: 1px solid;
  width: 80%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const LogBox = styled.div`
  border: 1px solid;
  width: 80%;
  height: 30%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
`;
const AssetList = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid;
`;
const TradeLog = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid;
`;

export default function MyAsset() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<AllProductGraphProps>();
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:9999/user/ownproducts/graph";

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          userId: "cyh",
        },
      };

      try {
        // setIsLoading(true);
        // console.log("로딩 시작");

        const response = await axios(url, options);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        // console.log("로딩 끝");
      }
    };

    fetchData();
  }, []);

  const [LineChartData, setLineChartData] = useState<RoyalLog[]>([]);
  const [datesArray, setdatesArray] = useState<string[]>([]);
  const [royalsArray, setroyalsArray] = useState<number[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:9999/user/ownproducts/totalroyalsDaily";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          userId: "cyh",
        },
      };

      try {
        const response = await axios(url, options);

        setLineChartData(response.data);

        console.log("전체 데이터");
        console.log(response.data);

        const tempDatesArray: string[] = [];
        const tempRoyalsArray: number[] = [];

        response.data.forEach((lineData: any) => {
          tempDatesArray.push(lineData.tradeDate);
          tempRoyalsArray.push(lineData.sumRoyal);
        });

        setdatesArray(tempDatesArray);
        setroyalsArray(tempRoyalsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // fetchData 함수를 호출하여 비동기 작업 수행
  }, [setdatesArray, setroyalsArray]);

  return (
    <>
      {isLoading && <Loading />}
      <Hood title={"나의 자산"} />
      <Navigation />
      <Container>
        <Body>
          <Main>
            <BalanceBox>
              <p>나의 자산 (총 로얄수) / 배당금 정보 출력 칸</p>
            </BalanceBox>
            <MainGraphBox>
              <GraphBox>
                {data && (
                  <Donut
                    estate={data.estate}
                    music={data.music}
                    luxury={data.luxury}
                  />
                )}
              </GraphBox>
              <GraphBox2>
                {LineChartData && (
                  <LineChart dates={datesArray} royals={royalsArray} />
                )}
              </GraphBox2>
              <GraphBox3>
                <p>나의 벌부 랭킹</p>
              </GraphBox3>
            </MainGraphBox>
            <LogBox>
              <AssetList>
                <p>보유중인 나의 자산 리스트 출력 칸</p>
              </AssetList>
              <TradeLog>
                <p>거래 로그 출력 칸</p>
              </TradeLog>
            </LogBox>
          </Main>
        </Body>
      </Container>
      <Footer />
    </>
  );
}
