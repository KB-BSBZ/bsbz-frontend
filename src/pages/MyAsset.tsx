import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import Hood from "../components/Hood";
import Donut, { AllProductGraphProps } from "../components/MyAsset/PieChart";
import axios from "axios";
import LineChart, { RoyalLog } from "../components/MyAsset/LineChart";
import Ranking from "../components/MyAsset/Ranking";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 250vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
`;

const Main = styled.div`
  width: 70%;
  height: 90%;
  border-top: 3px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1%;
`;

const BalanceBox = styled.div`
  /* border: 1px solid; */
  width: 100%;
  height: 25%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
`;
const MainGraphBox2 = styled.div`
  border: 1px solid;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const MainGraphBox = styled.div`
  border: 1px solid;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const Title = styled.div`
  /* border: 1px solid; */
  width: 100%;
  height: 10%;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const Title2 = styled.div`
  width: 100%;
  height: 10%;
  /* border: 1px solid; */
  font-size: 18px;
  display: flex;
  align-items: center;
`;
const GraphBox = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid;
`;
const GraphBox2 = styled.div`
  width: 100%;
  height: 90%;
  /* border: 1px solid; */
`;
const GraphBox3 = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogBox = styled.div`
  border: 1px solid;
  width: 100%;
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
const WordBox = styled.div`
  width: 70%;
  height: 5%;
  /* border: 1px solid; */
  font-size: 32px;
`;
const Balance = styled.div`
  width: 50%;
  height: 100%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bonus = styled.div`
  width: 50%;
  height: 100%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BalanceImgBox = styled.div`
  width: 90%;
  height: 70%;
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  .Balance {
    width: 45%;
    height: 100%;
  }
`;
const BalancePrintBox = styled.div`
  width: 90%;
  height: 30%;
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const BonusImgBox = styled.div`
  width: 90%;
  height: 70%;
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  .Bonus {
    width: 45%;
    height: 100%;
  }
`;

const BonusPrintBox = styled.div`
  width: 90%;
  height: 30%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .bonus {
    font-size: 24px;
  }
  .word {
    font-size: 16px;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
          <WordBox>
            <p>보유 자산 전체</p>
          </WordBox>
          <Main>
            <BalanceBox>
              <Balance>
                <BalanceImgBox>
                  <img
                    className="Balance"
                    alt="Balance"
                    src="../../images/free-icon-font-usd-circle-7653682.png"
                  />
                </BalanceImgBox>
                <BalancePrintBox>
                  <p>21,000,000 ROYAL</p>
                </BalancePrintBox>
              </Balance>
              <Bonus>
                <BonusImgBox>
                  <img
                    className="Bonus"
                    alt="Bonus"
                    src="../../images/free-icon-font-usd-circle-7653682.png"
                  />
                </BonusImgBox>
                <BonusPrintBox>
                  <Box>
                    <p className="word">예상 배당금</p>
                  </Box>
                  <Box>
                    <p className="bonus">210,000 원</p>
                  </Box>
                </BonusPrintBox>
              </Bonus>
            </BalanceBox>
            <MainGraphBox2>
              <Title>
                <p>나의 자산 추이</p>
              </Title>
              <GraphBox2>
                {LineChartData && (
                  <LineChart dates={datesArray} royals={royalsArray} />
                )}
              </GraphBox2>
            </MainGraphBox2>
            <MainGraphBox>
              <GraphBox>
                <Title2>
                  <p>나의 자산 비중</p>
                </Title2>
                {data && (
                  <Donut
                    estate={data.estate}
                    music={data.music}
                    luxury={data.luxury}
                  />
                )}
              </GraphBox>
              <GraphBox3>
                <Title2>
                  <p>나의 벌부 랭킹</p>
                </Title2>
                <Ranking></Ranking>
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
