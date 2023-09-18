import styled from "styled-components";
import { IProductProps } from "../Product/ProductBox";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function PopupBox(data: IProductProps) {
  return <Container></Container>;
}
