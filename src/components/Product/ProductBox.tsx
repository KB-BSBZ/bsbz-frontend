import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useScrollReset from "../../utils/useScrollReset";
import { useEffect, useRef } from "react";
const ProgressBar = require("progressbar.js");

const Container = styled.div`
  width: 100%;
  height: 48vh;
  border-radius: 24px;

  cursor: pointer;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5); // box-shadow 적용

  margin-bottom: 8vh;
`;

const ImgBox = styled.div<{ url: string }>`
  width: 100%;
  height: 48vh;
  background-position: center;
  object-fit: cover;
  background-repeat: no-repeat;

  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.url});
`;

const TextBox = styled.span`
  margin: 5%;

  p {
    color: ${(props) => props.theme.textColor};
  }

  h3 {
    color: ${(props) => props.theme.textColor};
  }

  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  text-overflow: ellipsis; /* '...'을 표시합니다. */
`;

const InnerBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: stretch;

  padding: 5%;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const DetailBox = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 12px;

  padding: 1px 4px;
  border: 1px solid
    ${(props) =>
      props.color === "mint"
        ? props.theme.highlightColor2
        : props.color === "white"
        ? props.theme.backgroundColor
        : props.theme.highlightColor};

  width: fit-content;
  background-color: ${(props) => props.theme.blurColor};
  color: ${(props) =>
    props.color === "mint"
      ? props.theme.highlightColor2
      : props.color === "white"
      ? props.theme.backgroundColor
      : props.theme.highlightColor};

  margin-right: 2px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%; /* 프로그레스 바의 너비를 조절 */

  position: relative;
`;

export interface IProductProps {
  bonus: number;
  description: string | null;
  endDate: string;
  extra: string | null;
  imageUrl: string;
  left_royal: number;
  productCost: number;
  productId: number;
  productName: string;
  productType: string;
  profileUrl: string;
  registerDate: string;
  totalRoyal: number;
  views: number;
}

export default function ProductBox({
  imageUrl,
  productName,
  productCost,
  productId,
  productType,
  left_royal,
  profileUrl,
}: IProductProps) {
  let reset = useScrollReset();

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    reset(`/product/detail/${productId}`);
  };

  const progressBarRef = useRef(null);

  useEffect(() => {
    // ProgressBar.js 초기화
    const bar = new ProgressBar.Line(progressBarRef.current, {
      strokeWidth: 6,
      easing: "easeInOut",
      duration: 3000, // 애니메이션 지속 시간 (2초)
      color: "#ffd700ff", // 프로그레스 바 색상
      trailColor: "#f0f0f0", // 빈 공간 색상
      trailWidth: 1, // 빈 공간 너비
      svgStyle: { width: "100%", height: "100%" },
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: "#fafafaff",
          position: "absolute",
          right: "12px",
          bottom: "30px",
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      from: { color: "#FFEA82" },
      to: { color: "#ED6A5A" },
      step: (state: any, bar: any) => {
        // 여기서 퍼센테이지 텍스트를 업데이트합니다.
        bar.setText(Math.round(bar.value() * 100) + " %");
      },
    });

    // 예를 들어, 50% 진행 상태로 업데이트
    // bar.animate((productCost / 10000 - left_royal) / productCost);
    bar.animate(0.8);

    // 컴포넌트 언마운트 시 ProgressBar.js 해제
    return () => {
      bar.destroy();
    };
  }, []);
  return (
    <Container onClick={onMove}>
      <ImgBox url={profileUrl}>
        <InnerBar>
          <Line>
            <DetailBox color="white">
              {productType === "estate"
                ? "부동산"
                : productType === "luxury"
                ? "럭셔리"
                : productType === "music"
                ? "음악"
                : ""}
            </DetailBox>
            {left_royal < 1000 ? <DetailBox>마감임박</DetailBox> : null}
          </Line>

          <Line>
            <ProgressBarContainer>
              <div ref={progressBarRef} />
            </ProgressBarContainer>
          </Line>
        </InnerBar>
      </ImgBox>
      <TextBox>
        <h3>
          {productName.length > 16
            ? productName.slice(0, 16) + " ..."
            : productName}
        </h3>
        <p>{left_royal}</p>
        <p>{productCost}</p>
      </TextBox>
    </Container>
  );
}