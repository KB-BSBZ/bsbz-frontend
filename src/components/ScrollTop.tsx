import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ visible: string }>`
  border-radius: 18px;
  position: fixed;
  right: 3%;
  bottom: 12%;
  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  color: ${(props) => props.theme.borderColor};

  &:hover {
    span {
      margin-bottom: 12px;
    }
  }
`;

const Inner = styled.span`
  width: 100%;
  height: 100%;
  transition: margin-bottom ease-in-out 0.3s;
`;

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState("false");

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // 페이지 스크롤이 100px 이상 되면 버튼을 보이게 함
      setIsVisible("true");
    } else {
      setIsVisible("false");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container visible={isVisible} onClick={scrollToTop}>
        <Inner>
          <FontAwesomeIcon icon={faSquareCaretUp} fontSize={48} />
        </Inner>

        <h4>TOP</h4>
      </Container>
    </>
  );
}
