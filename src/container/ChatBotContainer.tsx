import { useState, ChangeEvent, useRef, useEffect } from "react";
// import { getLocalstorage } from "../util/localStorage";

import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface MessageProps {
  isUser?: boolean;
  role?: string; // 역할(role) 추가
}

interface MessageType {
  content: string;
  isUser: boolean;
  role?: string; // 역할(role) 추가
}

interface ChatbotProps {
  chatbotClick?: boolean;
  handleChatbotFalse?: () => void;
  handleChatbotClick?: () => void;
}

const Container = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 2px solid #e2e0e0; /* 테두리 추가 */
  border-radius: 12px;
  width: 330px; /* 변경할 너비 설정 */
  height: 500px; /* 변경할 높이 설정 */
  overflow: hidden;
  z-index: 99;
  margin: 10px; /* 간격 추가 */
  position: absolute;
  right: 5rem;
  bottom: 1%;
`;

const TitleBox = styled.div`
  width: 80%;
  height: 15%;
  padding: 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px; /* 상단 좌측 테두리만 둥글게 */
  border-top-right-radius: 12px; /* 상단 우측 테두리만 둥글게 */
  background-color: ${(props) => props.theme.backgroundColor}; /* 배경색 변경 */

  z-index: 50;
  box-shadow: 0px 6px 2px rgba(0, 0, 0, 0.1); /* 그림자 스타일 설정 */

  /* border-bottom: 1px solid #dedede; */
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: ${(props) => props.theme.highlightColor};
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const CloseButton = styled.div`
  /* background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 20%;
  height: 100%;
  display: flex;
  justify-content: end;

  img {
    margin: 5%;
    cursor: pointer;
    width: 40%;
    height: 30%;
  } */
  cursor: pointer;
`;

const ChatContainer = styled.div`
  /* border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;

  height: 80%;
  width: 94%;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; */
  flex-grow: 1; /* 컨테이너가 화면을 꽉 채우도록 설정 */
  overflow-y: auto; /* 스크롤이 필요한 경우 스크롤 바를 표시합니다. */
  padding: 10px;

  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
`;

const StartBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
`;

const StartImg = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  /* border: 1px solid; */

  width: 20%;
  height: 15%;

  img {
    width: 100%; // img의 너비를 부모 요소의 너비와 같게 만듭니다.
    height: 100%; // 높이는 자동으로 설정하여 비율을 유지합니다.
  }
`;

const StartTextBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 10%;
`;

const StartTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;

  margin-bottom: 20px;

  span {
    margin-left: 2rem;

    font-size: 3rem;
    font-weight: 300;
    color: black;
  }
`;

const StartContents = styled.div`
  font-size: 15px;
  font-weight: 400;

  padding: 15px;
  border-radius: 5px;

  background-color: ${(props) => props.theme.blurColor2};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2); /* 그림자 스타일 설정 */

  span {
    cursor: pointer;
    display: block;
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 5px;

    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2); /* 그림자 스타일 설정 */

    font-size: 15px;
    font-weight: 400;

    margin-top: 8px;

    text-align: center;
  }
`;

const Message = styled.div<MessageProps>`
  min-width: 5%;
  max-width: 70%;

  font-size: 15px;
  background-color: ${(props) =>
    props.isUser ? props.theme.highlightColor : props.theme.blurColor2};
  color: ${(props) =>
    props.isUser ? props.theme.textColor : props.theme.textColor};
  padding: 8px;
  border-radius: ${(props) =>
    props.isUser ? "12px 0px 12px 12px" : "0px 12px 12px 12px"};
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: end;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2); /* 그림자 스타일 설정 */
`;

const InputBox = styled.div`
  padding: 0 5%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 5px;
  background-color: #ffffff; /* 입력 상자 배경색 설정 */
  border: 1px solid #ccc; /* 상단 테두리 추가 */
  border-radius: 12px;
`;

const UserInput = styled.input`
  border: none;
  width: 80%;
  height: 80%;
  font-size: 18px;
  margin-right: 1%;
  &::placeholder {
    text-align: center; // 오른쪽 정렬
  }

  &:focus {
    outline: none;
  }
`;

const SendImg = styled.div`
  cursor: pointer;
  background-image: url("../../images/honey.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 10%;
  height: 100%;

  transition: 1s;
  margin-right: 1%;
  &:hover {
    transform: scale(1.1); /* 호버 시 이미지 확대 효과 추가 */
  }
`;
const Input = styled.div`
  width: 90%;
  height: 80%;
  /* border: 1px solid; */
  display: flex;
  justify-content: end;
  align-items: center;
`;

// const Button = styled.button`
//   margin-top: 10px;
// `;

const Line = styled.div<{ position: string }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.position === "end" ? "end" : "start")};
`;

const Chatbot = ({ handleChatbotFalse }: ChatbotProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (userInput.trim() !== "") {
      const newMessages = [...messages, { content: userInput, isUser: true }];
      setMessages(newMessages);

      // 역할(role)에 따라 응답 생성
      const role = "EchoMe";
      let botResponse = "";

      // user의 질문에 따라 응답 작성
      if (userInput.includes("조각 투자란?")) {
        botResponse =
          "조각 투자는 작은 금액을 투자하여 다양한 자산에 투자하는 방법입니다.";
      } else if (userInput.includes("회원 관련 문의")) {
        botResponse =
          "회원 관련 규정은 다음과 같습니다\n" +
          "-회원 정보 : 로그인->마이페이지 접속 시 회원정보 확인 및 수정이 가능합니다.\n" +
          "-회원 순위 : 회원의 순위는 나의 자산 페이지에서 확인 가능합니다.";
      } else if (userInput.includes("상품 관련 문의")) {
        botResponse =
          "상품 관련 규정은 다음과 같습니다\n" +
          "-상품 정보 : 상품은 궁금하면 500원?\n" +
          "-상품 가격 : 상품은 가격은 한 번 사보시징~";
      } else if (userInput.includes("구매/환불 관련 문의")) {
        botResponse =
          "구매/환불 관련 규정은 다음과 같습니다\n" +
          "-구매 정보 : 구매해주셔서 감사합니다.\n" +
          "-환불 정보 : 한 번 사면 끝이지롱 ㅎㅎ.";
      } else if (userInput.includes("1:1 고객센터 전화번호")) {
        botResponse = "1:1 고객센터 전화번호는 123-456-7890 입니다.";
      } else {
        botResponse =
          "제가 대답하기에 어려운 질문이에요🥹 보기에 있는 질문을 해주세요!";
      }

      // 역할(role)을 포함한 메시지 생성
      const updatedMessages = [
        ...newMessages,
        { content: botResponse, isUser: false, role: role },
      ];
      setMessages(updatedMessages);

      setUserInput("");
    }
  };

  const onPut = (event: React.MouseEvent<HTMLSpanElement>) => {
    let target = event.currentTarget.innerText;
    setUserInput(target);
  };

  return (
    <Container>
      <TitleBox>
        <Title>BSBZ</Title>

        <CloseButton onClick={handleChatbotFalse}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
      </TitleBox>
      <ChatContainer ref={chatContainerRef}>
        <StartBox>
          <StartImg>
            <img src="../../images/bee.png" />
          </StartImg>
          <StartTextBox>
            <StartContents>
              <p
                style={{
                  marginBottom: "12px",
                }}
              >
                안녕하세요!
              </p>
              <p>'BSBZ'에 관해 궁금한 것은</p>
              <p>무엇이든 저에게 물어보세요!</p>
              <p>아래와 같은 질문이 가능해요!</p>
              <span onClick={onPut}>조각 투자란?</span>
              <span onClick={onPut}>회원 관련 문의</span>
              <span onClick={onPut}>상품 관련 문의</span>
              <span onClick={onPut}>구매/환불 관련 문의</span>
              <span onClick={onPut}>1:1 고객센터 전화번호</span>
            </StartContents>
          </StartTextBox>
        </StartBox>
        {messages.map((message, index) => (
          <Line position={message.isUser ? "end" : "start"}>
            <Message
              key={index}
              isUser={message.isUser}
              role={message.role} // 역할(role) 추가
            >
              {message.isUser ? message.content : `${message.content}`}
            </Message>
          </Line>
        ))}
      </ChatContainer>
      <InputBox>
        <UserInput
          type="text"
          value={userInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="메시지를 입력하세요"
        />
        <SendImg onClick={sendMessage}></SendImg>
      </InputBox>
    </Container>
  );
};

export default Chatbot;
