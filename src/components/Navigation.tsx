import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useScrollReset from "../utils/useScrollReset";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState, userIdState, userNameState } from "../utils/atoms";

const Container = styled.div`
  background-color: ${(props) => props.theme.navColor};
  color: ${(props) => props.theme.textColor};
  height: 10vh;

  position: fixed;
  width: 100%;
  z-index: 10;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.1);
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 12px;
  width: 55%;
  margin-left: 20%;

  span {
    color: ${(props) => props.theme.textColor};
    padding: 12px 18px;
    border: 2px solid ${(props) => props.theme.navColor};
    transition: border-top ease-in-out 0.3s, border-right 0.3s ease-in-out 0.1s,
      border-bottom 0.3s ease-in-out 0.2s, border-left 0.3s ease-in-out 0.3s;
  }

  span:hover {
    border-top: 2px solid ${(props) => props.theme.highlightColor};
    border-right: 2px solid ${(props) => props.theme.highlightColor};
    border-bottom: 2px solid ${(props) => props.theme.highlightColor};
    border-left: 2px solid ${(props) => props.theme.highlightColor};
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  img {
    height: 30%;
  }
`;

const UserTap = styled.span`
  width: 10%;
  height: 90%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 12px;

  b {
    margin-right: 10px;
  }

  p {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default function Navigation() {
  const nav = useNavigate();
  let reset = useScrollReset();
  let cookie = localStorage.getItem("userData");

  const [isLogin, setIsLogin] = useRecoilState(loginState);
  // recoil 의 loginState 가져오기
  const [userName, setUserName] = useRecoilState(userNameState);
  const [userId, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    if (cookie !== null) {
      setIsLogin(true);
      // setUserId(cookie);
    }
  }, [cookie]);

  const onMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    // console.log(event);
    let destination = String(event.currentTarget.id);
    // console.log(destination);

    destination === "home" ? reset("/") : reset(`/${destination}`);
  };

  const onLogout = (event: React.MouseEvent<HTMLSpanElement>) => {
    setIsLogin(false);
    setUserName("");
    setUserId("");
    localStorage.removeItem("userData");
    reset("/");
  };

  // const test = (event: React.MouseEvent<HTMLSpanElement>) => {
  //   setIsLogin(true);
  //   setUserName("이준모");
  //   setUserId("1");
  // };

  const onMoveUserInfo = (event: React.MouseEvent<HTMLSpanElement>) => {
    nav(`/user/${userId}`);
  };

  return (
    <Container>
      <Logo>
        <img
          onClick={onMove}
          id="home"
          src="../../images/bsbz-icon.png"
          alt="logo"
        />
      </Logo>
      <NavBar>
        <span onClick={onMove} id="home">
          홈
        </span>
        <span onClick={onMove} id="product/allproducts">
          투자 상품
        </span>
        <span onClick={onMove} id="research">
          리 서 치
        </span>

        <span
          onClick={() => {
            localStorage.setItem("userData", "123");
          }}
        >
          TEST
        </span>

        <span onClick={onMove} id="myasset">
          나의 자산
        </span>
        {/* <span onClick={test} id="test">
          test
        </span> */}
        <span onClick={onMove} id="banking">
          뱅 킹
        </span>
        {isLogin ? (
          <span onClick={onMove} id="mypage">
            마이 페이지
          </span>
        ) : (
          <span onClick={onMove} id="login">
            로 그 인
          </span>
        )}
      </NavBar>
      {cookie !== null ? (
        <UserTap>
          <b>{JSON.parse(localStorage.getItem("userData")!).userName} 님,</b>
          <p onClick={onLogout} id="logout">
            로그아웃
          </p>
        </UserTap>
      ) : (
        <UserTap></UserTap>
      )}
    </Container>
  );
}
