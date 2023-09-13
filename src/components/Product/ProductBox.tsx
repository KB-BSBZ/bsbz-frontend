import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useScrollReset from "../../utils/useScrollReset";

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

  return (
    <Container onClick={onMove}>
      <ImgBox url={profileUrl} />
      <TextBox>
        <p>{productType}</p>
        <h3>{productName}</h3>
        <p>{left_royal}</p>
        <p>{productCost}</p>
        <p>{productId}</p>
      </TextBox>
    </Container>
  );
}
