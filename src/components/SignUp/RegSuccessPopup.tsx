import React from "react";
import styled from "styled-components";
import useScrollReset from "../../utils/useScrollReset";
import Button from "../Button";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 팝업이 화면 위에 오도록 설정합니다. */
`;

const ModalContent = styled.div`
  height: 30%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const RegSuccessPopup = () => {
  const reset = useScrollReset();
  return (
    <ModalBackground>
      <ModalContent>
        <h2>회원가입 성공</h2>
        <p>회원가입이 성공적으로 완료되었습니다.</p>
        <Button width={"40%"} height={"12%"} hover={"mint"} text={"확 인"} />
      </ModalContent>
    </ModalBackground>
  );
};

export default RegSuccessPopup;
