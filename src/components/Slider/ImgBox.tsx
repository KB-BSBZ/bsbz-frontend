import { styled } from "styled-components";
// import { ISliderData } from "./Slider";

const Container = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
`;

const Image = styled.span<{ url: string }>`
  width: 100%;
  height: 100%;

  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  object-fit: cover;
`;

const TextBox = styled.div`
  background-color: ${(props) => props.theme.borderColor};

  padding-top: 12px;
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

export default function ImgBox({ url, name, price, productid }: any) {
  return (
    <Container>
      <Image url={url} />
      <TextBox>
        <h2>{name}</h2>
        <p>{price}</p>
        <p>{price}</p>
        <p>{price}</p>
      </TextBox>
    </Container>
  );
}
