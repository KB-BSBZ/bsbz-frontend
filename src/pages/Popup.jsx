import { SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import { popupState } from "../utils/atoms";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { IProductProps } from "../components/Product/ProductBox";
import Button from "../components/Button";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper/modules";
import useScrollReset from "../utils/useScrollReset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCompactDisc,
  faGem,
} from "@fortawesome/free-solid-svg-icons";

const X = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  position: fixed; /* or absolute */
  z-index: 1000;
`;

const Content = styled.div`
  width: 40%;
  height: 60%;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

const Forms = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // 입력 폼

    input {
      // 데이터 입력 폼
      border: none;
      padding: 1vh;
      width: 240px;
      border-radius: 8px;
    }

    button {
      border: none;
      width: 300px;
      padding: 1vh;
      border-radius: 6px;
    }
  }
`;
const ButtonBox = styled.div`
  margin-top: 18px;
  width: 100%;
  height: 15%;
  display: flex;
  gap: 5%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 75%;
  height: 75%;

  object-fit: scale-down;
  background-position: center;
  border-radius: 3%;
  position: absolute;
  background-size: cover;
`;

const IconBox = styled.div`
  width: 80%;
  height: 80%;

  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 96px;

  p {
    margin-top: 24px;
    font-size: 24px;
    font-weight: bold;
  }

  svg {
    cursor: pointer;
    transition: margin-bottom 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
      margin-bottom: 24px;
      color: ${(props) => props.theme.highlightColor};
    }
  }
`;

export default function Popup() {
  // 팝업 상태 및 선택한 취향 상태 초기화
  const [popup, setPopup] = useRecoilState(popupState);
  const [selectedPreference, setSelectedPreference] = useState("");
  const reset = useScrollReset();

  const [clicked, setClicked] = useState(false);

  // 팝업 열기 함수
  const openPopup = () => {
    setPopup(true);
  };

  // 팝업 닫기 함수
  const closePopup = () => {
    setPopup(false);
  };
  const [data, setData] = useState();
  const [orderType, setOrderType] = useState("");
  // 선택한 취향 처리 함수
  const handlePreferenceSelect = (preference) => {
    // 팝업을 닫지 않고 취향을 선택할 때 서버로 요청을 보냅니다.

    let url = "";
    const fetchData = async () => {
      console.log(preference);
      url = "http://localhost:9999/product/recommend?" + preference;

      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          orderType: preference,
        },
      };

      try {
        const response = await axios(url, options); // axios 요청을 await로 처리
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchData(); // 서버로 요청을 보냅니다.

    setSelectedPreference(preference);
  };

  const onMove = (productId) => {
    reset(`/product/detail/${productId}`);
  };

  return (
    <>
      <Container>
        <Content>
          <Forms>
            <Header>
              <X onClick={closePopup}>
                <CloseIcon
                  style={{
                    cursor: "pointer",
                  }}
                />
              </X>
              <h1>관심 분야를 선택하세요</h1>
            </Header>
            {/* {data && data.map((resource) => <h1>{resource.productName}</h1>)} */}
            {data && (
              <Swiper
                effect={"cube"}
                grabCursor={true}
                cubeEffect={{
                  shadow: false,
                  slideShadows: false,
                }}
                loop={true}
                pagination={true}
                modules={[EffectCube, Pagination]}
                className="mySwiper"
              >
                {data &&
                  data.map((resource) => (
                    <SwiperSlide
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ImgBox
                        style={{
                          backgroundImage: `url(${resource.profileUrl})`,
                        }}
                        onClick={() => onMove(resource.productId)}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}

            {!clicked && (
              <IconBox>
                <Icon>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    onClick={() => {
                      handlePreferenceSelect("부동산");
                      setClicked(true);
                    }}
                  />
                  <p>부 동 산</p>
                </Icon>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCompactDisc}
                    onClick={() => {
                      handlePreferenceSelect("음악 저작권");
                      setClicked(true);
                    }}
                  />

                  <p>음악 저작권</p>
                </Icon>
                <Icon>
                  <FontAwesomeIcon
                    icon={faGem}
                    onClick={() => {
                      handlePreferenceSelect("럭셔리");
                      setClicked(true);
                    }}
                  />

                  <p>럭 셔 리</p>
                </Icon>
              </IconBox>
            )}

            {clicked && (
              <ButtonBox>
                <Button
                  width={"100%"}
                  height={"50%"}
                  hover={"yellow"}
                  text={"부동산"}
                  onclick={() => handlePreferenceSelect("부동산")}
                />

                <Button
                  width={"100%"}
                  height={"50%"}
                  hover={"yellow"}
                  text={"럭셔리"}
                  onclick={() => handlePreferenceSelect("럭셔리")}
                />

                <Button
                  width={"100%"}
                  height={"50%"}
                  hover={"yellow"}
                  text={"음악 저작권"}
                  onclick={() => {
                    handlePreferenceSelect("음악 저작권");
                  }}
                />
              </ButtonBox>
            )}
          </Forms>
        </Content>
      </Container>
    </>
  );
}
