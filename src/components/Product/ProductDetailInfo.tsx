import styled from "styled-components";
import { IProductProps } from "./ProductBox";

const Container = styled.div`
  padding-top: 10vh;
`;

interface IDetailProps {
  productid?: string;
}

export default function ProductDetailInfo({ productid }: IDetailProps) {
  const id = Number(productid);

  return (
    <Container>
      <h2>DETAIL {id}</h2>
    </Container>
  );
}
