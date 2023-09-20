import styled from "styled-components";
import Loading from "../components/Loading";
import { SetStateAction, useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import Pentagon from "../components/Pentagon";
import Hood from "../components/Hood";
import axios from "axios";
import useScrollReset from "../utils/useScrollReset";
import React from "react";
import RegSuccessPopup from "../components/SignUp/RegSuccessPopup";
import Navigation from "../components/Navigation";

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

const TextBox = styled.div`
  height: 68vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 3vh 0 3vh 0;

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

  input[readonly] {
    background-color: #ccc; /* 회색 배경색 설정 */
  }
`;

interface IFormData {
  userId: string | undefined;
  password: string | undefined;
  email: string | undefined;
  userName: string | undefined;
  ssn: string | undefined;
  phoneNum: string | undefined;
}

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [checker, setChecker] = useState(false);
  const [ssnResult, setSsnResult] = useState("");
  const [userInfo, setUserInfo] = useState<IFormData>();
  const [ready, setReady] = useState(false);
  let cookie: any = null;
  let userDataString = null;

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormData>();

  const reset = useScrollReset();

  const BASE_URL = "http://localhost:9999"; // 서버 주소 설정

  const onValid = async (data: IFormData) => {
    try {
      setIsLoading(true);
      console.log("회원 가입 폼");
      console.log(data);
      const response = await axios.put(`${BASE_URL}/user/update`, data);
      setIsLoading(false);
      setReady(false);
      window.location.reload();
    } catch (error) {}
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

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData")!).userId;

    const userInfo_url = "http://localhost:9999/user/userInfo?" + userId;
    const userInfo_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        userId,
      },
    };
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [userInfo_response] = await Promise.all([
          axios.get(userInfo_url, userInfo_options),
        ]);
        if (userInfo_response.data) {
          console.log("가져온 데이터");
          console.log(userInfo_response.data);
          setUserInfo(userInfo_response.data);
        }
        console.log("유저 아이디");
        console.log(userInfo?.userId);
        userDataString = localStorage.getItem("userData");
        cookie = userDataString ? JSON.parse(userDataString) : null;

        if (cookie) {
          setValue("userId", userInfo?.userId);
          setValue("password", userInfo?.password);
          setValue("email", userInfo?.email);
          setValue("userName", userInfo?.userName);
          setValue("ssn", userInfo?.ssn);
          setValue("phoneNum", userInfo?.phoneNum);
          setIsLoading(false);
          // getValues();
        }
      } catch (error) {
      } finally {
        setReady(true);
      }
    };
    fetchData();
  }, [ready]);

  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      <Hood title={"회원정보 수정"} />
      <Container>
        <Main>
          <TextBox>
            <Forms>
              <h2>회원정보 수정</h2>
              {userInfo && (
                <form onSubmit={handleSubmit(onValid)}>
                  <InputBox>
                    <input
                      {...register("userId", {
                        required: "아이디를 입력하세요.",
                        minLength: {
                          value: 5,
                          message: "아이디가 너무 짧습니다.",
                        },
                      })}
                      type="text"
                      placeholder="아이디"
                      autoComplete="username"
                      readOnly
                    />
                  </InputBox>
                  <InputBox>
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
                      placeholder="비밀번호"
                    />
                  </InputBox>
                  <InputBox>
                    <input
                      {...register("email", {
                        required: "이메일을 입력하세요.",
                        pattern: {
                          value:
                            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                          message: "이메일 형식만 가능합니다.",
                        },
                      })}
                      placeholder="이메일"
                    />
                  </InputBox>
                  <InputBox>
                    <input
                      {...register("userName", {
                        required: "이름을 입력하세요.",
                      })}
                      placeholder="이 름"
                    />
                  </InputBox>
                  <InputBox>
                    <input
                      {...register("ssn", {
                        required: "주민등록번호를 입력하세요.",
                        // pattern: {
                        //   value: /^[0-9]{6}-[0-9]{7}$/,
                        //   message: "주민등록번호 형식이 맞지 않습니다.",
                        // },

                        onChange: (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          event.target.value = formatSSN(event.target.value);
                        },
                      })}
                      placeholder="주민등록번호"
                      maxLength={14}
                      readOnly
                    />
                  </InputBox>
                  <InputBox>
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
                      placeholder="전화번호"
                      maxLength={13}
                    />
                  </InputBox>
                  <ButtonBox>
                    <button>수정 하기</button>
                  </ButtonBox>
                </form>
              )}
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

          <Pentagon reverse={"true"} color={"border"} bgColor={"bg"} />
        </Main>
      </Container>
      <Footer />
    </>
  );
}
