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
  border-radius: 12px;
  width: 30vw;
  height: 75vh;
  z-index: 99;

  position: absolute;
  right: 5rem;
  bottom: 1%;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #dedede; */
`;

const Title = styled.div`
  width: 80%;
  height: 100%;
  font-size: 40px;
  font-weight: 700;
  color: #ffce0b;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const CloseButton = styled.div`
  background-position: center;
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
  }
`;

const ChatContainer = styled.div`
  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;

  height: 80%;
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
  font-size: 20px;
  font-weight: 400;

  padding: 8px;
  border-radius: 10px;

  background-color: #ebebeb;

  span {
    display: block;
    background-color: white;

    font-size: 20px;
    font-weight: 400;

    margin-top: 10px;
    padding: 8px;
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
  height: 12%;

  display: flex;
  justify-content: center;
  align-items: center;
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
  background-size: 70% 70%;
  background-repeat: no-repeat;

  width: 15%;
  height: 100%;

  transition: 1s;
  margin-right: 1%;
  &:hover {
    /* filter: brightness(1); */
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
        <Title>BSBZ</Title>
        <CloseButton>
          <img src="../x-mark.png" onClick={handleChatbotFalse}></img>
        </CloseButton>
      </TitleBox>
      <ChatContainer ref={chatContainerRef}>
        <StartBox>
          <StartTextBox>
            {/* <StartTitle>BSBZ</StartTitle> */}
            <StartImg>
              <img src="../images/bee.png"></img>
            </StartImg>
            <StartContents>
              <p>안녕하세요!</p>
              {/* <span>{userName}</span>
              님! */}
              <p>'BSBZ'에 관해 궁금한 것은</p>
              <p>무엇이든 저에게 물어보세요!</p>
              <p>아래와 같은 질문이 가능해요!</p>
              <span>조각 투자는 뭔가요?</span>
              <span>ROYAL이 뭔가요?</span>
            </StartContents>
          </StartTextBox>
        </StartBox>
        {messages.map((message, index) => (
          <div key={index}>
            <StartImg>
              <img src="../images/bee.png" alt="Bee" />
            </StartImg>
            <Message isUser={message.isUser}>
              {message.isUser ? message.content : `MADE: ${message.content}`}
            </Message>
          </div>
        ))}
      </ChatContainer>
      <InputBox>
        <Input>
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
            placeholder="꿀벌이에게 메시지 보내기."
          />
        </Input>
        <SendImg onClick={sendMessage} />
      </InputBox>
    </Container>
  );
};

export default Chatbot;
