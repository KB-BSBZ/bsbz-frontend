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
  z-index: 99;
  margin: 10px; /* 간격 추가 */
  position: absolute;
  right: 5rem;
  bottom: 1%;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  border-top-left-radius: 12px; /* 상단 좌측 테두리만 둥글게 */
  border-top-right-radius: 12px; /* 상단 우측 테두리만 둥글게 */
  background-color: #e2dfdf; /* 배경색 변경 */
  border: 1px solid #ccc; /* 테두리 추가 */
  /* border-bottom: 1px solid #dedede; */
`;

const Title = styled.div`
  width: 80%;
  height: 100%;
  font-size: 40px;
  font-weight: 700;
  color: #ebd407;
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
  width: 20px; /* 변경할 너비 설정 */
  height: 20px; /* 변경할 높이 설정 */
  margin: 25px;
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
`;

const StartBox = styled.div`
  width: 100%;
  display: flex;

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
  display: flex;
  flex-direction: column;
  align-items: left;
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

  padding: 5px;
  border-radius: 5px;

  background-color: #e2dfdf;

  span {
    display: block;
    background-color: #cccccc;
    border-radius: 5px;

    font-size: 15px;
    font-weight: 400;

    margin-top: 5px;

    text-align: center;
  }
`;

const Message = styled.div<MessageProps>`
  /* background-color: ${(props) => (props.isUser ? "#FFCE0B" : "#ebebeb")};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: inline-block;
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};

  font-size: 18px; */
  font-size: 15px;
  background-color: ${(props) =>
    props.isUser
      ? "#007bff"
      : "#e2dfdf"}; /* 사용자와 봇 메시지에 다른 배경색 적용 */
  color: ${(props) =>
    props.isUser ? "white" : "black"}; /* 텍스트 색상 변경 */
  padding: 8px;
  border-radius: 5px;
  margin: 5px;
  max-width: 70%; /* 최대 너비 설정 */
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const InputBox = styled.div`
  /* width: 100%;
  height: 12%;

  display: flex;
  justify-content: center;
  align-items: center; */
  width: 90%;
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 5px;
  background-color: #ffffff; /* 입력 상자 배경색 설정 */
  border: 1px solid #ccc; /* 상단 테두리 추가 */
  border-radius: 12px;
`;

const UserInput = styled.input`
  border: none;
  width: 85%;
  height: 80%;
  font-size: 18px;
  margin-right: 1%;
  &::placeholder {
    text-align: center; // 오른쪽 정렬
  }
`;

const SendImg = styled.div`
  cursor: pointer;
  background-image: url("../images/honey.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 15%;
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
          "제가 대답하기에 어려운 질문이에요🥹 보기에 있는 질문을 해주세요! ㅎㅎ";
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

  return (
    <Container>
      <TitleBox>
        <CloseButton onClick={handleChatbotFalse}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
        <Title>BSBZ</Title>
      </TitleBox>
      <ChatContainer ref={chatContainerRef}>
        <StartBox>
          <StartImg />
          <StartTextBox>
            <StartContents>
              안녕하세요!
              <br />
              <br />
              'BSBZ'에 관해 궁금한 것은
              <br />
              <br />
              무엇이든 저에게 물어보세요!
              <br />
              <br />
              아래와 같은 질문이 가능해요!
              <span>조각 투자란?</span>
              <span>회원 관련 문의</span>
              <span>상품 관련 문의</span>
              <span>구매/환불 관련 문의</span>
              <span>1:1 고객센터 전화번호</span>
            </StartContents>
          </StartTextBox>
        </StartBox>
        {messages.map((message, index) => (
          <Message
            key={index}
            isUser={message.isUser}
            role={message.role} // 역할(role) 추가
          >
            {message.isUser ? message.content : `${message.content}`}
          </Message>
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
