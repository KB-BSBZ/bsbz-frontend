import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useScrollReset from "../../utils/useScrollReset";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 12px;

  /* background-color: red; */
`;

const List = styled.div`
  overflow: hidden;
  width: 94%;
  height: 14vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  border-radius: 8px;
  /* background-color: blue; */
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.6);
`;

const Head = styled.div`
  padding: 0 2%;
  width: 96%;
  height: 20%;
  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.backgroundColor};
  justify-content: space-between;
`;

const Body = styled.div`
  width: 98%;
  height: 80%;
  margin-right: 2%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    width: 18%;
    height: 100%;
  }
`;

interface IResearchProps {
  imageUrl: string;
  productName: string;
  productCost: string;
  productId: string;
  productType: string;
  leftRoyal: string;
  profileUrl: string;
  endDate: string;
}

export default function ResearchList({ data }: any) {
  const reset = useScrollReset();

  return (
    <Container>
      {data.slice(0, 5).map((product: IResearchProps) => (
        <List onClick={() => reset(`/product/detail/${product.productId}`)}>
          <Head>
            <p>{product.productType}</p>
            <p>{product.endDate.split(" ")[0]}</p>
          </Head>
          <Body>
            <img src={product.profileUrl} />
            <h3>
              {product.productName.length < 24
                ? product.productName
                : product.productName.slice(0, 24) + " ..."}
            </h3>
            <p>{product.leftRoyal} ROYAL</p>
          </Body>
        </List>
      ))}
    </Container>
  );
}
