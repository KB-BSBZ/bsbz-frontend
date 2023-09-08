import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useScrollReset from "../utils/useScrollReset";

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
  justify-content: center;
  align-items: center;
  gap: 12px;

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

const Logo = styled.div``;

export default function Navigation() {
  const nav = useNavigate();
  let reset = useScrollReset();

  const onMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    // console.log(event);
    let destination = String(event.currentTarget.id);
    // console.log(destination);

    destination === "home" ? reset("/") : reset(`/${destination}`);
  };

  return (
    <Container>
      <Logo>
        <h2 onClick={onMove} id="home">
          LOGO
        </h2>
      </Logo>
      <NavBar>
        <span onClick={onMove} id="home">
          홈
        </span>
        <span onClick={onMove} id="research">
          리 서 치
        </span>
        <span onClick={onMove} id="banking">
          뱅 킹
        </span>
        <span onClick={onMove} id="login">
          로 그 인
        </span>
        <span onClick={onMove} id="signup">
          회원 가입
        </span>
      </NavBar>
    </Container>
  );
}
