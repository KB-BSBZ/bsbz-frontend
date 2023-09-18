import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Navigation from "../../../components/Navigation";
import styled from "styled-components";
import Button from "../../../components/Button";
import { productList } from "../../../jsons/productList";
import ProductBox, {
  IProductProps,
} from "../../../components/Product/ProductBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hood from "../../../components/Hood";
import { option } from "yargs";
import useScrollReset from "../../../utils/useScrollReset";
import ScrollTop from "../../../components/ScrollTop";
const Container = styled.div`
  padding-top: 10vh;
  /* background-color: wheat; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Info = styled.div`
  /* background-color: blue; */
  width: 82%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;
const ButtonBox = styled.div`
  margin-left: 5vw;
  width: 18%;
  height: 60%;
  /* background-color: gainsboro; */
  position: fixed;
  left: 0;
`;
const MainBox = styled.div`
  width: 80%;
  height: 100vh;
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
`;
const TabBox = styled.div`
  margin-top: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  gap: 24px;
`;

const Tab = styled.span<{ clicked: string }>`
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 2px solid
    ${(props) =>
      props.clicked === "true"
        ? props.theme.highlightColor
        : props.theme.backgroundColor};
`;

const Products = styled.div`
  margin-top: 12vh;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2vh;
  flex-direction: column;
`;

export default function ProductLuxuries() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCounter, setCounter] = useState(0);
  const reset = useScrollReset();
  const onPush = (event: React.MouseEvent<HTMLSpanElement>) => {
    let destination = `/product/${event.currentTarget.id}`;
    console.log(destination);
    // window.history.pushState({}, "", `${destination}`);
    // setType(event.currentTarget.id);
    // setCounter((currentValue) => currentValue + 1);
    reset(destination);
  };

  const [data, setData] = useState<IProductProps[]>([]);
  const [orderType, setOrderType] = useState("");
  const [type, setType] = useState("allproducts");

  const [latestClicked, setLatestClicked] = useState("true");
  const [viewsClicked, setViewsClicked] = useState("false");
  const [deadlineClicked, setDeadlineClicked] = useState("false");

  let url = "";

  useEffect(() => {
    const fetchData = async () => {
      url = "http://localhost:9999/product/luxuries";

      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          orderType: orderType,
        },
      };

      try {
        setIsLoading(true);

        const response = await axios(url, options); // axios 요청을 await로 처리

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [orderType, type, isCounter, url]);

  const onMoveClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    let destination = event.currentTarget.id;
    destination === "latest"
      ? reset("/product/luxuries")
      : destination === "views"
      ? reset("/product/luxuries/views")
      : destination === "deadline"
      ? reset("/product/luxuries/deadline")
      : reset("product/luxuries");
  };

  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      <Hood title={"투자 상품"} />
      <Container>
        <Info>
          <ButtonBox>
            <span onClick={onPush} id={"allproducts"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"전 체"}
              />
            </span>

            <span onClick={onPush} id={"realestate"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"부 동 산"}
              />
            </span>
            <span onClick={onPush} id={"luxuries"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"럭 셔 리"}
              />
            </span>

            <span onClick={onPush} id={"musiccopyright"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"음악 저작권"}
              />
            </span>
          </ButtonBox>
          <MainBox>
            <TabBox>
              <Tab clicked={latestClicked} onClick={onMoveClick} id="latest">
                <h3>등록순</h3>
              </Tab>
              <Tab clicked={viewsClicked} onClick={onMoveClick} id="views">
                <h3>조회순</h3>
              </Tab>
              <Tab
                clicked={deadlineClicked}
                onClick={onMoveClick}
                id="deadline"
              >
                <h3>마감순</h3>
              </Tab>
            </TabBox>

            <Products>
              {data?.map((product, index) => (
                <ProductBox
                  key={index}
                  profileUrl={product.profileUrl}
                  productName={product.productName}
                  productCost={product.productCost}
                  productId={product.productId}
                  productType={product.productType}
                  bonus={product.bonus}
                  endDate={product.endDate}
                  imageUrl={product.imageUrl}
                  leftRoyal={product.leftRoyal}
                  registerDate={product.registerDate}
                  totalRoyal={product.totalRoyal}
                  views={product.views}
                  description={product.description}
                  extra={product.extra}
                />
              ))}
            </Products>
          </MainBox>
        </Info>
      </Container>
      <ScrollTop />
    </>
  );
}
