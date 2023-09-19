import { useState, ChangeEvent, useRef, useEffect } from "react";
// import { getLocalstorage } from "../util/localStorage";

import styled from "styled-components";
// import clonseButton from "../../public/images/svg/clonseButton.svg";
// import startImg from "../../public/images/svg/profile2.svg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface MessageProps {
  isUser?: boolean;
}

interface MessageType {
  content: string;
  isUser: boolean;
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

  width: 500px;
  height: 700px;
  z-index: 99;

  position: absolute;
  right: 5rem;
  bottom: 5rem;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-bottom: 1px solid #dedede; */
  position: relative;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #ffce0b;
`;

const CloseButton = styled.div`
  cursor: pointer;

  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 4rem;
  height: 4rem;

  position: absolute;
  left: 5rem;
`;

const ChatContainer = styled.div`
  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;

  height: 300px;
  width: 94%;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StartBox = styled.div`
  width: 100%;
  display: flex;

  margin-bottom: 20px;
`;

const StartImg = styled.div`
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  margin-right: 2rem;

  width: 8rem;
  height: 8rem;
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
  font-size: 20px;
  font-weight: 400;

  padding: 20px;
  border-radius: 10px;

  background-color: #ebebeb;

  span {
    display: block;
    background-color: white;

    font-size: 20px;
    font-weight: 400;

    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
  }
`;

const Message = styled.div<MessageProps>`
  background-color: ${(props) => (props.isUser ? "#FFCE0B" : "#ebebeb")};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: inline-block;
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};

  font-size: 24px;
`;

const InputBox = styled.div`
  width: 100%;

  margin-top: 20px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const UserInput = styled.input`
  border: none;
  width: 50%;

  padding: 1rem;
`;

const SendImg = styled.div`
  cursor: pointer;

  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 6px;
  height: 6px;

  transition: 0.3s;

  &:hover {
    filter: brightness(0.7) hue-rotate(180deg);
  }
`;

// const Button = styled.button`
//   margin-top: 10px;
// `;

const Chatbot = ({ handleChatbotFalse }: ChatbotProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // const userName = getLocalstorage("username");

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

      const fetchData = async () => {
        try {
          const response = await axios.post(
            "/dialogflow",
            { content: userInput },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(
            "There was an error fetching data from the server:",
            error
          );
        }
        return null;
      };

      fetchData().then((data) => {
        if (data) {
          const updatedMessages = [
            ...newMessages,
            { content: data, isUser: false },
          ];
          setMessages(updatedMessages);
        }
      });
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
            <StartTitle>BSBZ</StartTitle>
            <StartContents>
              안녕하세요!
              {/* <span>{userName}</span>
              님! */}
              <br />
              <br />
              'BSBZ'에 관해 궁금한 것은
              <br />
              <br />
              무엇이든 저에게 물어보세요!
              <br />
              <br />
              아래와 같은 질문이 가능해요!
              <span>조각 투자는 뭔가요?</span>
              <span>회원 탈퇴는 어디서 하나요?</span>
            </StartContents>
          </StartTextBox>
        </StartBox>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.isUser ? message.content : `MADE: ${message.content}`}
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
          placeholder="MONEYMADE Copilot에게 메시지 보내기."
        />
        <SendImg onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendImg>
      </InputBox>
    </Container>
  );
};

export default Chatbot;
