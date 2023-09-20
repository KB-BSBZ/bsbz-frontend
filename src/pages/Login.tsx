import styled from "styled-components";
import Loading from "../components/Loading";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import Pentagon from "../components/Pentagon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import Hood from "../components/Hood";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";
import { useRecoilState } from "recoil";
import {
  logInFailState,
  popupState,
  userIdState,
  userNameState,
} from "../utils/atoms";
import LogInFailPopup from "../components/LogOut/LogInFailPopup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 12vh;
  width: 100%;
  /* background-color: ${(props) => props.theme.backgroundColor}; */
  background-image: url("../../images/background_05.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Main = styled.div`
  height: 76vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const TextBox = styled.div`
  height: 68vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    // 회원가입 텍스트
    margin-bottom: 2vh;
  }
`;

const Forms = styled.div`
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
      width: 180px;
      padding: 1vh;
      border-radius: 6px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.borderColor};

  overflow: hidden;
  background-color: ${(props) => props.theme.borderColor};
  padding: 0 1px 6px 1px;

  transition: background-color ease 0.3s;

  button {
    background-color: ${(props) => props.theme.backgroundColor};
    transition: color ease 0.3s, background-color ease 0.3s;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
    button {
      color: ${(props) => props.theme.borderColor};
      background-color: ${(props) => props.theme.highlightColor};
      cursor: pointer;
    }
  }
`;

const InputBox = styled.div`
  background-color: ${(props) => props.theme.borderColor};
  margin-bottom: 2vh;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  padding: 0 1px 6px 1px;
`;

const LeftBox = styled.div`
  color: ${(props) => props.theme.highlightColor};
  font-size: 24px;

  h2 {
    font-size: 48px;
    color: ${(props) => props.theme.highlightColor2};
  }

  h3 {
    font-size: 24px;
    color: ${(props) => props.theme.textColor};
  }

  h4 {
    font-size: 24px;
    color: ${(props) => props.theme.textColor};
  }
`;

const Lines = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 6px;
  margin-bottom: 2vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 24px;
  color: ${(props) => props.theme.highlightColor};
  h4 {
    color: ${(props) => props.theme.textColor};
  }
`;

const Quote = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 12px;

  b {
    cursor: pointer;
    transition: color ease 0.3s;
    &:hover {
      color: ${(props) => props.theme.highlightColor};
    }
  }
`;

const Error = styled.span`
  margin-top: 6px;

  color: ${(props) => props.theme.errorColor};
  font-weight: bold;
`;

interface IFormData {
  userId: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [popup, setPopup] = useRecoilState(popupState);
  const [logInFail, setlogInFailState] = useRecoilState(logInFailState);
  const nav = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const BASE_URL = "http://localhost:9999"; // 서버 주소 설정
  const onValid = async (data: IFormData) => {
    try {
      setIsLoading(true);

      // 서버로 요청을 보내는 부분
      const response = await axios.post(`${BASE_URL}/user/login`, data);
      if (response.data !== "로그인 실패") {
        localStorage.setItem("userData", JSON.stringify(response.data));
        console.log(response.data); // 서버 응답 데이터 출력
        nav("/");
        setPopup(true);
      } else {
        setlogInFailState(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    console.log(data);
    console.log(errors);
  };

  const onSignup = () => {
    nav("/signup");
  };

  return (
    <>
      {isLoading && <Loading />}
      {logInFail && <LogInFailPopup />}
      <Navigation />
      <Hood title={"로그인"} />
      <Container>
        <Main>
          <LoginBox>
            <LeftBox>
              <Lines>
                <Line>
                  <h2>환영합니다!</h2>
                </Line>
                <Line>
                  <h3>투자의 세계로 떠나보세요.</h3>
                </Line>
              </Lines>
            </LeftBox>
            <TextBox>
              <Forms>
                <Header>
                  <h4>벌써부자</h4>
                  <FontAwesomeIcon icon={faForumbee} />
                </Header>

                <form onSubmit={handleSubmit(onValid)}>
                  <InputBox>
                    <input
                      {...register("userId", {
                        required: "아이디를 입력하세요.",
                      })}
                      type="text"
                      placeholder="아이디"
                      autoComplete="username"
                    />
                  </InputBox>
                  <InputBox>
                    <input
                      {...register("password", {
                        required: "비밀번호를 입력하세요.",
                      })}
                      type="password"
                      placeholder="비밀번호"
                      autoComplete="current-password"
                    />
                  </InputBox>

                  <ButtonBox>
                    <button>로 그 인</button>
                  </ButtonBox>
                </form>
              </Forms>
              <Quote>
                <p>아직 회원이 아니신가요?</p>
                <b onClick={onSignup}>회원 가입</b>
              </Quote>
              <Error>
                {errors?.userId?.message
                  ? errors?.userId?.message
                  : errors?.password?.message
                  ? errors?.password?.message
                  : " "}
              </Error>
            </TextBox>
          </LoginBox>

          {/* <Pentagon reverse={"true"} color={"border"} bgColor={"bg"} /> */}
        </Main>
      </Container>
      <Footer />
    </>
  );
}
