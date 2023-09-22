import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useScrollReset from "../../utils/useScrollReset";
// import { ISliderData } from "./Slider";

const Container = styled.span<{ url: string }>`
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;

  border-radius: 12px;

  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  object-fit: scale-down;
  background-size: cover;
`;

// const Image = styled.span<{ url: string }>`
//   width: 100%;
//   height: 100%;

//   background-image: linear-gradient(
//       to right,
//       rgba(0, 0, 0, 0.6),
//       rgba(0, 0, 0, 0)
//     ),
//     url(${(props) => props.url});
//   background-position: center;
//   background-size: cover;
//   object-fit: cover;
// `;

const TextBox = styled.div`
  /* background-color: ${(props) => props.theme.borderColor}; */

  padding-top: 48px;
  padding-left: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  color: ${(props) => props.theme.textColor};

  h2 {
    font-size: 18px;
    color: ${(props) => props.theme.highlightColor};
    margin: 0 0 8px 12px;
  }

  h3 {
    font-size: 16px;
    margin: 0 0 8px 12px;
    color: ${(props) => props.theme.textColor};
  }

  p {
    font-size: 16px;
    margin: 0 0 12px 24px;
    color: ${(props) => props.theme.textColor2};
  }
`;

export default function ImgBox({ url, productid }: any) {
  // const nav = useNavigate();
  let reset = useScrollReset();

  const onMoveDetail = (event: React.MouseEvent<HTMLSpanElement>) => {
    console.log(event.currentTarget.id);
    let target = event.currentTarget.id;
    reset(`/product/detail/${target}`);
  };

  return (
    <Container url={url} onClick={onMoveDetail} id={productid}>
      {/* <Image /> */}
    </Container>
  );
}
