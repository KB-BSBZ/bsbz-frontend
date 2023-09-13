import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  background-image: url(${(props) => props.url});
  background-position: center;
  object-fit: cover;
`;

const TextBox = styled.span`
  margin: 5%;

  p {
    color: ${(props) => props.theme.textColor};
  }

  h3 {
    color: ${(props) => props.theme.highlightColor};
  }
`;

interface IProductProps {
  url: string;
  name: string;
  price: string;
  productid: number;
  type: string;
}

export default function ProductBox({
  url,
  name,
  price,
  productid,
  type,
}: IProductProps) {
  const nav = useNavigate();

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    nav(`/product/detail/${productid}`);
  };

  return (
    <Container onClick={onMove}>
      <ImgBox url={url} />
      <TextBox>
        <p>{type}</p>
        <h3>{name}</h3>
        <p>{price}</p>
        <p>{price}</p>
        <p>{price}</p>
      </TextBox>
    </Container>
  );
}
