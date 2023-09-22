import { faComments, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import Chatbot from "../container/ChatBotContainer";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div<{ visible: string }>`
  border-radius: 18px;
  position: fixed;
  right: 3%;
  bottom: 12%;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.borderColor};
`;

const Inner = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 30%;

  width: 100%;
  height: 100%;
  transition: margin-bottom ease-in-out 0.3s;
`;

const ChatbotIcon = styled.div`
  cursor: pointer;
  background-image: url("../../public/images/bsbz-icon.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 2rem;
  width: 48px;
  height: 48px;
  position: absolute;
  right: 20rem;
  bottom: 20rem;
`;

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState("false");
  const [chatbotClick, setChatbotClick] = useState(false);

  const handleChatbotTrue = () => {
    setChatbotClick(true);
  };
  const handleChatbotFalse = () => {
    setChatbotClick(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // 페이지 스크롤이 100px 이상 되면 버튼을 보이게 함
      setIsVisible("true");
    } else {
      setIsVisible("false");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container visible={isVisible}>
        <FontAwesomeIcon
          icon={faComments}
          fontSize={48}
          onClick={handleChatbotTrue}
          style={{
            cursor: "pointer",
          }}
        />
        <Inner>
          <FontAwesomeIcon
            icon={faSquareCaretUp}
            fontSize={48}
            onClick={scrollToTop}
            style={{
              cursor: "pointer",
            }}
          />
          <h4>TOP</h4>

          {chatbotClick && <Chatbot handleChatbotFalse={handleChatbotFalse} />}
        </Inner>
      </Container>
      {/* {chatbotClick && <Chatbot handleChatbotFalse={handleChatbotFalse} />} */}
    </>
  );
}
