import section1 from "../../svgs/section1.svg";
import section2 from "../../svgs/section2.svg";
import section3 from "../../svgs/section3.svg";
import Pentagon from "../Pentagon";
import { theme } from "../../utils/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled, { keyframes } from "styled-components";
import useScrollReset from "../../utils/useScrollReset";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  animation: ${fadeIn} 1s ease; /* 애니메이션 적용 */
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

const Items = styled.div<{ url: string; text: string }>`
  cursor: pointer;
  width: 24%;
  height: 64%;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.3);
  border-radius: 15px;

  opacity: 0.8;

  background-color: white;
  background-image: url(${(props) => props.url});
  background-size: 50% 50%;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: scale-down;

  transition: opacity 0.2s ease-in-out;
`;

const TextLine = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  h1 {
    font-size: 36px;
    font-weight: 700;
  }
`;

const ItemBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AiBox = styled.div`
  width: 80%;
  height: 70%;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 24px;

  padding: 12px 48px;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.3);
  color: ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.backgroundColor};
  bottom: 80px;
  right: 310px;

  cursor: pointer;
  transition: color 0.3s linear, borderColor 0.3s linear;

  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
    color: ${(props) => props.theme.backgroundColor};
  }
`;

export default function HomeInfo() {
  const reset = useScrollReset();
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);
  return (
    <>
      <Container>
        <Box bgtype={"null"} url={`../../images/background_12.png`}>
          <TextBox data-aos="fade-up">
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

        <Box bgtype={"white"} url={"../../images/background_16.png"}>
          <TextBox
            data-aos="fade-up"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Text
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
            </Text> */}
            <img src="../../images/background_02_image.png" />
          </TextBox>
        </Box>

        <Box
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0",
          }}
          bgtype={"none"}
          url={"../../images/background_03.png"}
        >
          <TextLine data-aos="fade-up">
            <h1>BSBZ만의 핵심 서비스</h1>
            <h2>인생 첫 조각투자를 클릭 한 번으로 시작해보세요 !</h2>
            {/* <h1>짜잔</h1> */}
          </TextLine>
          <ItemBox data-aos="fade-up">
            <Items
              onClick={() => reset("/product/realestate")}
              url={"../../images/home-estate-icon.png"}
              text="부동산"
            />
            <Items
              onClick={() => reset("/product/luxuries")}
              url={"../../images/home-luxury-icon.png"}
              text="부동산"
            />
            <Items
              onClick={() => reset("/product/musiccopyright")}
              url={"../../images/home-music-icon.png"}
              text="부동산"
            />
          </ItemBox>
        </Box>

        <Box bgtype={"none"} url={"../../images/background_04.png"}>
          <AiBox
            style={{
              width: "100%",
              height: "100%",
            }}
            data-aos="fade-up"
          >
            <img
              style={{
                width: "36%",
                height: "72%",

                marginRight: "180px",
                marginBottom: "240px",
              }}
              src="../../images/background_19_text.png"
            />
          </AiBox>
        </Box>
        {/* <Pentagon reverse={"false"} color={"mint"} bgColor={"bg"} /> */}

        <Box
          bgtype={"none"}
          url={"../../images/background_20.png"}
          style={{
            position: "relative",
          }}
        >
          <AiBox
            style={{
              width: "100%",
              height: "100%",
            }}
            data-aos="fade-up"
          >
            <img
              style={{
                width: "60%",
                height: "54%",
                marginRight: "280px",
                marginBottom: "180px",
              }}
              src="../../images/background_20_text.png"
            />

            <Button onClick={() => reset("/product/allproducts")}>
              <h2>투자상품 보러가기</h2>
            </Button>
          </AiBox>
        </Box>
      </Container>
    </>
  );
}
