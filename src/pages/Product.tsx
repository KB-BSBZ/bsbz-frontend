import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import Button from "../components/Button";
import { productList } from "../jsons/productList";
import ProductBox, { IProductProps } from "../components/Product/ProductBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hood from "../components/Hood";
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
  width: 90%;
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

export default function Product() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const onPush = (event: React.MouseEvent<HTMLSpanElement>) => {
    let destination = `/product/${event.currentTarget.id}`;
    console.log(destination);
    window.history.pushState({}, "", `${destination}`);
    setType(event.currentTarget.id);
  };

  const [data, setData] = useState<IProductProps[]>([]);
  const [orderType, setOrderType] = useState("");
  const [type, setType] = useState("allproducts");

  const [latestClicked, setLatestClicked] = useState("false");
  const [viewsClicked, setViewsClicked] = useState("false");
  const [deadlineClicked, setDeadlineClicked] = useState("false");

  useEffect(() => {
    const url = "http://localhost:9999/product/" + type;

    const options = {
      method: "GET",
      headers: {
        // 'headers' 올바른 이름으로 수정
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        orderType: orderType,
      },
    };

    axios(url, options)
      .then((response) => {
        setIsLoading(true);
        // console.log("로딩 시작");

        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        // console.log("로딩 끝");
      }); // 오류 처리 추가
  }, [orderType, type]);

  const onLatestClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setLatestClicked("true");
    setViewsClicked("false");
    setDeadlineClicked("false");
    // console.log(event.currentTarget.clicked);
    console.log(event.currentTarget.id);
    let destination = event.currentTarget.id;
    setOrderType("");
    destination === "latest"
      ? setOrderType("")
      : destination === "views"
      ? setOrderType("조회수")
      : destination === "deadline"
      ? setOrderType("마감")
      : setOrderType("");
  };

  const onViewsClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setLatestClicked("false");
    setViewsClicked("true");
    setDeadlineClicked("false");
    // console.log(event.currentTarget.clicked);
    console.log(event.currentTarget.id);
    let destination = event.currentTarget.id;
    setOrderType("");
    destination === "latest"
      ? setOrderType("")
      : destination === "views"
      ? setOrderType("조회수")
      : destination === "deadline"
      ? setOrderType("마감")
      : setOrderType("");
  };

  const onDeadlineClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setLatestClicked("false");
    setViewsClicked("false");
    setDeadlineClicked("true");
    // console.log(event.currentTarget.clicked);
    console.log(event.currentTarget.id);
    let destination = event.currentTarget.id;
    setOrderType("");
    destination === "latest"
      ? setOrderType("")
      : destination === "views"
      ? setOrderType("조회수")
      : destination === "deadline"
      ? setOrderType("마감")
      : setOrderType("");
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
                // border={"36px"}
              />
            </span>

            <span onClick={onPush} id={"realestate"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"부 동 산"}
                // border={"36px"}
              />
            </span>
            <span onClick={onPush} id={"luxuries"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"럭 셔 리"}
                // border={"36px"}
              />
            </span>
            {/* <span onClick={onPush} id={"art"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"미 술 품"}
                // border={"36px"}
              />
            </span> */}

            <span onClick={onPush} id={"musiccopyright"}>
              <Button
                width={"60%"}
                height={"12%"}
                hover={"yellow"}
                text={"음악 저작권"}
                // border={"36px"}
              />
            </span>
          </ButtonBox>
          <MainBox>
            <TabBox>
              {/* <Button
                width={"10%"}
                height={"40%"}
                hover={"yellow"}
                text={"등록 순"}
                border={"36px"}
              />
              <Button
                width={"10%"}
                height={"40%"}
                hover={"yellow"}
                text={"조회 순"}
                border={"36px"}
              />
              <Button
                width={"10%"}
                height={"40%"}
                hover={"yellow"}
                text={"마감 순"}
                border={"36px"}
              /> */}
              <Tab clicked={latestClicked} onClick={onLatestClick} id="latest">
                <h3>등록순</h3>
              </Tab>
              <Tab clicked={viewsClicked} onClick={onViewsClick} id="views">
                <h3>조회순</h3>
              </Tab>
              <Tab
                clicked={deadlineClicked}
                onClick={onDeadlineClick}
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
                  left_royal={product.left_royal}
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
    </>
  );
}
