import section1 from "../../svgs/section1.svg";
import section2 from "../../svgs/section2.svg";
import section3 from "../../svgs/section3.svg";

import styled from "styled-components";
import Pentagon from "../Pentagon";
import { theme } from "../../utils/theme";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Container = styled.div`
  width: 100vw;

  flex-direction: row;
`;

const Box = styled.div<{ bgtype: string; url?: string }>`
  height: 100vh;
  width: 100%;

  background-color: ${(props) =>
    props.bgtype === "yellow"
      ? props.theme.highlightColor
      : props.bgtype === "mint"
      ? props.theme.highlightColor2
      : null};
  //#fbe9b7ff

  background-image: url(${(props) => props.url});

  background-position: center;
  background-size: cover;
  object-fit: cover;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6vw;
  align-items: center;
`;

const TextBox = styled.div`
  width: 90%;
  height: 85%;

  /* background-color: aliceblue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const Text = styled.div`
  width: 60%;
  height: 90%;

  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  p {
    font-size: 48px;
  }
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function HomeInfo() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);
  return (
    <>
      <Container>
        <Box bgtype={"null"} url={`${section1}`}>
          <TextBox>
            <Text>
              <p>
                <b>모든 사람</b>을 위한
              </p>
              <p>
                <b>손쉽게</b> 경험하는
              </p>
              <p>
                <b>조각투자의 시작, 벌써부자</b>
              </p>
            </Text>
          </TextBox>
        </Box>

        <Box bgtype={"white"} url={"../../images/background_10.png"}>
          <TextBox
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "60vw",
              }}
            >
              <h2
                style={{
                  fontSize: "36px",
                  marginBottom: "12px",
                }}
              >
                벌써부자는 . . .
              </h2>
              <Line>
                <b
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  Story
                </b>
                <p
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  여러분의 투자 스토리를 기록
                </p>
              </Line>
              <Line>
                <b
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  Share
                </b>
                <p
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  하나의 상품을 나눠서 소유
                </p>
              </Line>
              <Line>
                <b
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  Speciality
                </b>
                <p
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  빅데이터와 AI를 기반으로 한 전문성
                </p>
              </Line>
            </Text>
          </TextBox>
        </Box>

        <Box bgtype={"none"} url={`${section3}`}></Box>

        <Box bgtype={"none"} url={"../../images/background_02.png"}></Box>
        {/* <Pentagon reverse={"false"} color={"mint"} bgColor={"bg"} /> */}

        <Box bgtype={"none"} url={"../../images/background_04.png"}></Box>
      </Container>
    </>
  );
}
