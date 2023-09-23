import styled from "styled-components";
import Loading from "../components/Loading";
import { SetStateAction, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import Pentagon from "../components/Pentagon";
import Hood from "../components/Hood";
import axios from "axios";
import useScrollReset from "../utils/useScrollReset";
import React from "react";
import RegSuccessPopup from "../components/SignUp/RegSuccessPopup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  padding-top: 12vh;
  /* background-color: ${(props) => props.theme.backgroundColor}; */

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled.div`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  padding: 2% 0;
  width: 32%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 24px;

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
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    // 입력 폼

    input {
      // 데이터 입력 폼
      border: none;
      padding: 1vh;
      border-radius: 8px;
      width: 100%;
    }

    button {
      border: none;
      width: 100%;
      padding: 1vh;
      border-radius: 6px;

      cursor: pointer;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  margin-bottom: 12px;

  width: 100%;

  border-radius: 8px;

  overflow: hidden;

  transition: background-color ease 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  button {
    width: 100%;
    background-color: ${(props) => props.theme.highlightColor};
    font-weight: bold;
  }
`;

const InputBox = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  border: 3px solid ${(props) => props.theme.blurColor2};
  border-radius: 8px;
  width: 100%;

  margin-bottom: 18px;
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
  }
`;

const Lines = styled.div`
  color: ${(props) => props.theme.highlightColor};
  font-size: 24px;
  h2 {
    font-size: 32px;
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

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 6px;
  margin-bottom: 2vh;

  img {
    width: 8%;
    height: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  font-size: 24px;
  color: ${(props) => props.theme.highlightColor};
  h4 {
    color: ${(props) => props.theme.textColor};
  }

  img {
    width: 36px;
  }
`;

interface IFormData {
  userId: string;
  password: string;
  email: string;
  userName: string;
  ssn: string;
  phoneNum: string;
}

export default function Signup() {
  const reset = useScrollReset();
  const [isLoading, setIsLoading] = useState(false);
  const [ssnResult, setSsnResult] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

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
      console.log("회원 가입 폼");
      // console.log(data);
      // console.log(ssnResult);
      data.ssn = ssnResult;
      console.log(data);
      const response = await axios.post(`${BASE_URL}/user/register`, data);

      //회원가입 성공 시 isSignUpSuccess 를 true로 설정
      setIsSignUpSuccess(true);

      // reset("/login");
    } catch (error) {}
    // console.log(errors);
  };

  const formatSSN = (ssn: string) => {
    // 입력값에서 숫자 이외의 문자를 제거

    let numericSSN = ssn;
    setSsnResult(numericSSN);
    numericSSN = ssn
      .replace(/\D/g, "")
      .replace(/(\d{6})(\d{1})(\d{6})/, "$1$2******");
    // 주민등록번호 형식에 맞게 "-" 추가
    if (numericSSN.length >= 7) {
      return `${numericSSN.slice(0, 6)}-${numericSSN.slice(6)}`;
    } else {
      return numericSSN;
    }
  };

  const formatPhone = (phone_num: string) => {
    // 입력값에서 숫자 이외의 문자를 제거
    const numericPhone = phone_num.replace(/\D/g, "");

    // 핸드폰번호 형식에 맞게 "-" 추가 예시) 010-1234-1234
    if (numericPhone.length >= 4 && numericPhone.length <= 7) {
      return `${numericPhone.slice(0, 3)}-${numericPhone.slice(3)}`;
    } else if (numericPhone.length >= 8) {
      return `${numericPhone.slice(0, 3)}-${numericPhone.slice(
        3,
        7
      )}-${numericPhone.slice(7)}`;
    } else {
      return numericPhone;
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isSignUpSuccess && <RegSuccessPopup />}
      <Navigation />
      <Hood title={"회원가입"} />
      <Container>
        <Main>
          <TextBox>
            <Lines>
              {/* <Line>
                <h2>환영합니다!</h2>
              </Line> */}
              {/* <Line>
                <h3>투자의 세계로 떠나보세요.</h3>
              </Line> */}
            </Lines>
            <Forms>
              <Header>
                <h4>회원 가입</h4>
                <img src="../../../images/bsbz-bee.png" />
              </Header>
              <form onSubmit={handleSubmit(onValid)}>
                <InputBox>
                  <label htmlFor="userId">아이디</label>
                  <input
                    {...register("userId", {
                      required: "아이디를 입력하세요.",
                      minLength: {
                        value: 5,
                        message: "아이디가 너무 짧습니다.",
                      },
                    })}
                    type="text"
                    placeholder="최소 5글자"
                    autoComplete="username"
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="password">비밀번호</label>
                  <input
                    {...register("password", {
                      required: "비밀번호를 입력하세요.",
                      minLength: {
                        value: 8,
                        message: "비밀번호가 너무 짧습니다.",
                      },
                      maxLength: {
                        value: 16,
                        message: "비밀번호가 너무 깁니다.",
                      },
                      pattern: {
                        value: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
                        message:
                          "비밀번호는 숫자, 특수문자가 각각 최소 1개이상이어야 합니다.",
                      },
                    })}
                    type="password"
                    autoComplete="current-password"
                    placeholder="숫자와 특수문자를 섞은 8-16 자리 숫자"
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="email">이메일</label>
                  <input
                    {...register("email", {
                      required: "이메일을 입력하세요.",
                      pattern: {
                        value:
                          /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                        message: "이메일 형식만 가능합니다.",
                      },
                    })}
                    placeholder="이메일 형식"
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="userName">이 름</label>
                  <input
                    {...register("userName", {
                      required: "이름을 입력하세요.",
                    })}
                    placeholder="이 름"
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="ssn">주민번호</label>
                  <input
                    {...register("ssn", {
                      required: "주민등록번호를 입력하세요.",
                      // pattern: {
                      //   value: /^[0-9]{6}-[0-9]{7}$/,
                      //   message: "주민등록번호 형식이 맞지 않습니다.",
                      // },
                      pattern: {
                        value: /^[0-9]{6}-[0-9]{1}[*]{6}$/,
                        message: "주민등록번호 형식이 맞지 않습니다.",
                      },
                      onChange: (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        event.target.value = formatSSN(event.target.value);
                      },
                    })}
                    placeholder="( - ) 없이 입력"
                    maxLength={14}
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="phoneNum">전화번호</label>
                  <input
                    {...register("phoneNum", {
                      required: "전화번호를 입력해 주세요.",
                      pattern: {
                        value: /^\d{3}-\d{4}-\d{4}$/,
                        message: "전화번호 형식이 맞지 않습니다.",
                      },
                      onChange: (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        event.target.value = formatPhone(event.target.value);
                      },
                    })}
                    placeholder="( - ) 없이 입력"
                    maxLength={13}
                  />
                </InputBox>
                <ButtonBox>
                  <button>가입 하기</button>
                </ButtonBox>
              </form>
            </Forms>

            <span>
              {errors?.userId?.message
                ? errors?.userId?.message
                : errors?.password?.message
                ? errors?.password?.message
                : errors?.email?.message
                ? errors?.email?.message
                : errors?.userName?.message
                ? errors?.userName?.message
                : errors?.ssn?.message
                ? errors?.ssn?.message
                : errors?.phoneNum?.message
                ? errors?.phoneNum?.message
                : " "}
            </span>
          </TextBox>

          {/* <Pentagon reverse={"true"} color={"border"} bgColor={"bg"} /> */}
        </Main>
      </Container>
      <Footer />
    </>
  );
}
