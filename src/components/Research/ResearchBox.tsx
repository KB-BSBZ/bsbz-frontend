import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useScrollReset from "../../utils/useScrollReset";
import { INewsProps } from "../../pages/Research";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProductProps } from "../Product/ProductBox";
// import { ISliderData } from "./Slider";

const Container = styled.span<{ url: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  object-fit: cover;

  cursor: pointer;

  a {
    text-decoration: none;
  }
`;

// const Image = styled.span<{ url: string }>`
//   width: 100%;
//   height: 100%;

//   background-image: linear-gradient(
//       to right,
//       rgba(0, 0, 0, 0.6),
//       rgba(0, 0, 0, 0)
//     ),
//     url(${(props) => props.url});
//   background-position: center;
//   background-size: cover;
//   object-fit: cover;
// `;

const TextBox = styled.div`
  /* background-color: ${(props) => props.theme.borderColor}; */

  padding-top: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.textColor};

  overflow: hidden;

  h2 {
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    margin: 0 8px 12px 8px;
  }

  h3 {
    font-size: 16px;
    margin: 0 8px 12px 8px;
    color: ${(props) => props.theme.textColor};
  }

  p {
    font-size: 16px;
    margin: 0 8px 12px 8px;
    color: ${(props) => props.theme.textColor};
  }
`;

const HeadLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;

  p {
    margin-bottom: 32px;
  }
`;

export default function ResearchBox({
  imageUrl,
  productName,
  productCost,
  productId,
  productType,
  leftRoyal,
  profileUrl,
  endDate,
}: IProductProps) {
  const reset = useScrollReset();

  const onMove = () => {
    reset(`/product/detail/${productId}`);
  };

  // console.log(profileUrl);
  return (
    <Container url={profileUrl} onClick={onMove}>
      <HeadLine></HeadLine>
    </Container>
  );
}
