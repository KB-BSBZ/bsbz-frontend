import styled from "styled-components";
import Loading from "../components/Loading";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import Pentagon from "../components/Pentagon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 12vh;
  background-color: ${(props) => props.theme.backgroundColor};
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

  span {
    color: ${(props) => props.theme.errorColor};
    font-weight: bold;
  }

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

interface IFormData {
  user_id: string;
  password: string;
}

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onValid = (data: IFormData) => {
    console.log(data);
    // console.log(errors);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      <Container>
        <Main>
          <LoginBox>
            <LeftBox>
              <Lines>
                <Line>
                  <h4>벌써부자</h4>
                  <FontAwesomeIcon icon={faForumbee} />
                </Line>
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
                <h2>로 그 인</h2>

                <form onSubmit={handleSubmit(onValid)}>
                  <InputBox>
                    <input
                      {...register("user_id", {
                        required: "아이디를 입력하세요.",
                      })}
                      type="text"
                      placeholder="아이디"
                    />
                  </InputBox>
                  <InputBox>
                    <input
                      {...register("password", {
                        required: "비밀번호를 입력하세요.",
                      })}
                      type="password"
                      placeholder="비밀번호"
                    />
                  </InputBox>

                  <ButtonBox>
                    <button>가입 하기</button>
                  </ButtonBox>
                </form>
              </Forms>

              <span>
                {errors?.user_id?.message
                  ? errors?.user_id?.message
                  : errors?.password?.message
                  ? errors?.password?.message
                  : " "}
              </span>
            </TextBox>
          </LoginBox>

          <Pentagon reverse={"true"} color={"border"} bgColor={"bg"} />
        </Main>
      </Container>
      <Footer />
    </>
  );
}
