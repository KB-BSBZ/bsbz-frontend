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

const TextBox = styled.span`
  width: 35%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;

  p {
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
  }
`;

const Header = styled.div<{ fontcolor: string }>`
  color: ${(props) =>
    props.fontcolor === "default"
      ? props.theme.textColor
      : props.fontcolor === "mint"
      ? props.theme.highlightColor2
      : props.fontcolor === "yellow"
      ? theme.highlightColor1
      : props.fontcolor === "white"
      ? theme.backgroundColor
      : null};
  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 36px;
  }

  p {
    font-size: 56px;
  }
`;

const ImgBox = styled.span<{ url: string }>`
  width: 30%;
  height: 50%;

  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function HomeInfo() {
  useEffect(() => {
    AOS.init({
      duration: 5000,
    });
  }, []);
  return (
    <>
      <Container>
        <Box bgtype={"null"} url={`${section1}`}>
          <TextBox data-aos="fade-right">
            <Header fontcolor={"default"}>
              <h3
                style={{
                  color: "#40E0D0ff",
                }}
              ></h3>
              <p>
                <b>모든 사람</b>을 위한
              </p>
              <p>
                <b>손쉽게</b> 경험하는
              </p>
              <p>
                <b>조각투자의 시작, 벌써부자</b>
              </p>
            </Header>
            <p
              style={{
                color: "darkGray",
              }}
            ></p>

            {/* <Button
              width={"180px"}
              height={"42px"}
              hover={"mint"}
              text={"HELLO"}
            /> */}
          </TextBox>
          <ImgBox url={"../../images/phone.png"} />
        </Box>

        {/* <Pentagon reverse={"false"} color={"bg"} bgColor={"yellow"} /> */}
        <Box bgtype={"white"} /*url={`${section2}`}*/>
          <TextBox data-aos="fade-left">
            <Header
              fontcolor={"black"}
              style={{
                width: "50vw",
                marginLeft: "20vw",
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
              <p
                style={{
                  fontSize: "36px",
                  marginBottom: "12px",
                }}
              >
                <b
                  style={{
                    marginRight: "36px",
                  }}
                >
                  Story
                </b>
                여러분의 투자 스토리를 기록
              </p>

              <p
                style={{
                  fontSize: "36px",
                  marginBottom: "12px",
                }}
              >
                <b
                  style={{
                    marginRight: "36px",
                  }}
                >
                  Share
                </b>
                하나의 상품을 나눠서 소유
              </p>

              <p
                style={{
                  fontSize: "36px",
                  marginBottom: "12px",
                }}
              >
                <b
                  style={{
                    marginRight: "36px",
                  }}
                >
                  Speciality
                </b>
                빅데이터와 AI를 기반으로 한 전문성
              </p>
            </Header>

            {/* <Line>
              <Button
                width={"180px"}
                height={"42px"}
                hover={"mint"}
                text={"음악 저작권 보러가기  ▶"}
              />
            </Line> */}
          </TextBox>
        </Box>

        {/* <Pentagon reverse={"false"} color={"yellow"} bgColor={"bg"} /> */}

        <Box bgtype={"none"} url={`${section3}`}>
          <TextBox data-aos="fade-right">
            <Header fontcolor={"default"}>
              <h2
                style={{
                  fontSize: "24px",
                }}
              >
                이젠
                <b
                  style={{
                    color: "#ffd700ff",
                    marginLeft: "12px",
                  }}
                >
                  명품
                </b>
                도 안정적인
                <b
                  style={{
                    color: "#ffd700ff",
                    marginLeft: "12px",
                  }}
                >
                  자산
                </b>
              </h2>
              <h3
                style={{
                  color: "black",
                }}
              >
                👜 명품 시장
              </h3>
            </Header>
            <p
              style={{
                color: "darkGray",
              }}
            >
              고가의 명품을 자산으로 소유권을 분할 판매 할 수 있습니다. 롤렉스
              시계, 샤넬 가방 등 하이엔드 명품부터 고급 와인이나 위스키 등
              고가의 물품이 주요 자산입니다.
            </p>

            <Line>
              <Button
                width={"180px"}
                height={"42px"}
                hover={"yellow"}
                text={"럭셔리 자산 보러가기  ▶"}
              />
            </Line>

            {/* <Button
              width={"180px"}
              height={"42px"}
              hover={"mint"}
              text={"HELLO"}
            /> */}
          </TextBox>
          <ImgBox url={"../../images/resource_img_01.png"} />
        </Box>

        {/* <Pentagon reverse={"false"} color={"bg"} bgColor={"mint"} /> */}

        <Box bgtype={"none"} url={"../../images/background_02.png"}>
          <ImgBox url={"../../images/resource_img_01.png"} />

          <TextBox data-aos="fade-left">
            <Header fontcolor={"white"}>
              <h2
                style={{
                  fontSize: "24px",
                }}
              >
                가장 활발한
                <b
                  style={{
                    color: "#ffd700ff",
                    marginLeft: "12px",
                  }}
                >
                  조각투자
                  <br /> 시장
                </b>
                도 안정적인
                <b
                  style={{
                    color: "#ffd700ff",
                    marginLeft: "12px",
                  }}
                >
                  자산
                </b>
              </h2>
              <h3>🏢 부동산</h3>
            </Header>
            {/* <p>
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            </p> */}

            <p
              style={{
                backgroundColor: "#93f1e8",
                padding: "20px 12px",
                fontSize: "16px",
                borderRadius: "16px",
              }}
            >
              👆 부동산 조각투자란? <br />
              부동산은 다른 금융 상품 대비 변동성이 적고, 기대 수익이 높아 가장
              매력적인 투자 상품으로 꼽히며, 소액으로도 고가의 건물에 투자할 수
              있어 부동산 투자에 관심 있는 고객에게 호응을 받고 있습니다.
            </p>

            <Line>
              <Button
                width={"180px"}
                height={"42px"}
                hover={"yellow"}
                text={"부동산 자산 보러가기  ▶"}
              />
            </Line>
          </TextBox>
        </Box>

        {/* <Pentagon reverse={"false"} color={"mint"} bgColor={"bg"} /> */}

        <Box bgtype={"none"} url={"../../images/background_04.png"}>
          <TextBox>
            <Header fontcolor={"default"}>
              <h3
                style={{
                  color: "#40E0D0ff",
                }}
              >
                조각투자 통합 플랫폼
              </h3>
              <h2>
                벌써 부자
                <FontAwesomeIcon
                  icon={faForumbee}
                  style={{
                    marginLeft: "12px",
                  }}
                  color={"#ffd700ff"}
                />
              </h2>
            </Header>
            <p
              style={{
                color: "darkGray",
              }}
            >
              저희 벌써부자에서는 음원 저작권, 명품 그리고 부동산에 대한
              조각투자 서비스를 제공합니다.
            </p>

            {/* <Button
              width={"180px"}
              height={"42px"}
              hover={"mint"}
              text={"HELLO"}
            /> */}
          </TextBox>
        </Box>
      </Container>
    </>
  );
}
