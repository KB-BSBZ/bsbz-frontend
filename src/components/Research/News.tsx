import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const TextBox = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  height: 12vh;
`;

const ImgBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface INewsProps {
  title: string;
  pubDate: string;
  originallink: string;
  link: string;
  description: string;
}

export default function News({
  title,
  pubDate, 
  originallink,
  link,
  description,
}: INewsProps) {
  // console.log("title " + {title});
  // console.log(news?.title);
  return (
    <Container>
      <TextBox>
        <b>{title}</b>
        <p>{description}</p>
      </TextBox>
      <ImgBox>
        <h2>IMG</h2>
      </ImgBox>
    </Container>
  );
}
