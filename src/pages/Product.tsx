import { useState } from "react";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import Button from "../components/Button";
import { productList } from "../jsons/productList";
import ProductBox from "../components/Product/ProductBox";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState();
  const nav = useNavigate();

  let orderType = "";

  const onPush = (event: React.MouseEvent<HTMLSpanElement>) => {
    let destination = `/product/${event.currentTarget.id}`;
    console.log(destination);
    window.history.pushState({}, "", `${destination}`);
  };

  const onTabClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    // console.log(event.currentTarget.clicked);
    console.log(event.currentTarget.id);
    let destination = event.currentTarget.id;
    orderType = "";

    destination === "latest"
      ? (orderType = "")
      : destination === "views"
      ? (orderType = "조회수")
      : destination === "deadline"
      ? (orderType = "마감")
      : (orderType = "");
  };

  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      <Container>
        <Info>
          <ButtonBox>
            <span onClick={onPush} id={"allproduct"}>
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

            <span onClick={onPush} id={"musiccopylight"}>
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
              <Tab clicked={"false"} onClick={onTabClick} id="latest">
                <h3>등록순</h3>
              </Tab>
              <Tab clicked={"false"} onClick={onTabClick} id="views">
                <h3>조회순</h3>
              </Tab>
              <Tab clicked={"false"} onClick={onTabClick} id="deadline">
                <h3>마감순</h3>
              </Tab>
            </TabBox>

            <Products>
              {productList.map((product) => (
                <ProductBox
                  key={product.productid}
                  url={product.url}
                  name={product.name}
                  price={product.price}
                  productid={product.productid}
                  type={product.type}
                />
              ))}
            </Products>
          </MainBox>
        </Info>
      </Container>
    </>
  );
}
