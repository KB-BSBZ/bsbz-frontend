import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* 배경을 어둡게 만듭니다. */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 다른 요소 위에 표시하기 위한 z-index 설정 */
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

function PreferencePopup({ onClose, onSelectPreference }) {
  const handlePreferenceSelect = (preference) => {
    onSelectPreference(preference); // 선택한 취향을 부모 컴포넌트로 전달
    onClose(); // 팝업 닫기
  };

  return (
    <PopupContainer>
      <PopupContent>
        <h3>취향을 선택하세요</h3>
        <button onClick={() => handlePreferenceSelect("부동산")}>부동산</button>
        <button onClick={() => handlePreferenceSelect("럭셔리")}>럭셔리</button>
        <button onClick={() => handlePreferenceSelect("음악 저작권")}>
          음악 저작권
        </button>
      </PopupContent>
    </PopupContainer>
  );
}

export default PreferencePopup;
