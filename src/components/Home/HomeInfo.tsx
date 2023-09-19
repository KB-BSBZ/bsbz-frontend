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

const Box = styled.div<{ bgtype: string }>`
  height: 100vh;

  background-color: ${(props) =>
    props.bgtype === "yellow"
      ? props.theme.highlightColor
      : props.bgtype === "mint"
      ? props.theme.highlightColor2
      : "#fbe9b7ff"};

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
    font-weight: bold;
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
      duration: 2000,
    });
  }, []);
  return (
    <>
      <Container>
        <Box bgtype={"white"}>
          <TextBox>
            <Header fontcolor={"default"}>
              <h3
                style={{
                  color: "#40E0D0ff",
                }}
                data-aos="fade-down"
              >
                조각투자 통합 플랫폼
              </h3>
              <h2 data-aos="fade-down">
                벌써 부자
                <FontAwesomeIcon
                  icon={faForumbee}
                  style={{
                    marginLeft: "12px",
                  }}
                  color={"#ffd700ff"}
                  data-aos="fade-down"
                />
              </h2>
            </Header>
            <p
              style={{
                color: "darkGray",
              }}
              data-aos="fade-down"
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
          <ImgBox url={"../../images/phone.png"} />
        </Box>
        <Pentagon reverse={"false"} color={"bg"} bgColor={"yellow"} />

        <Box bgtype={"yellow"}>
          <ImgBox
            data-aos="fade-down"
            url={"../../images/resource_img_01.png"}
          />
          <TextBox>
            <Header fontcolor={"black"}>
              <h2 data-aos="fade-down">🎹 음원 투자</h2>
            </Header>
            <p data-aos="fade-down">
              음악 저작권료 참여 청구권을 조각투자형태로 발행해 거래합니다.
            </p>
            <p
              style={{
                backgroundColor: "#ffe657",
                padding: "20px 12px",
                fontSize: "16px",
                border: "16px",
              }}
              data-aos="fade-down"
            >
              👆 음악 저작권료 참여 청구권이란? <br />
              해당 음악의 저작권으로부터 발생하는 수익을 구매한 지분 비율로
              지급받을 수 있는 권리를 의미합니다.
            </p>

            <Line>
              <Button
                width={"180px"}
                height={"42px"}
                hover={"mint"}
                text={"음악 저작권 보러가기  ▶"}
              />
            </Line>
          </TextBox>
        </Box>
        <Pentagon reverse={"false"} color={"yellow"} bgColor={"bg"} />

        <Box bgtype={"white"}>
          <TextBox>
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
        <Pentagon reverse={"false"} color={"bg"} bgColor={"mint"} />

        <Box bgtype={"mint"}>
          <TextBox>
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
                  조각투자 시장
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
            <p>
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            </p>

            <p
              style={{
                backgroundColor: "#93f1e8",
                padding: "20px 12px",
                fontSize: "16px",
                border: "16px",
              }}
            >
              👆 부동산 조각투자란? <br />
              부동산은 다른 금융 상품 대비 변동성이 적고, 기대 수익이 높아 가장
              매력적인 투자 상품으로 꼽히는데요. 소액으로도 고가의 건물에 투자할
              수 있어 부동산 투자에 관심 있는 고객에게 호응을 받고 있습니다.
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
          <ImgBox url={"../../images/resource_img_01.png"} />
        </Box>
        <Pentagon reverse={"false"} color={"mint"} bgColor={"bg"} />

        <Box bgtype={"white"}>
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
          <ImgBox url={"../../images/resource_img_01.png"} />
        </Box>
      </Container>
    </>
  );
}
