import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cardIndexState } from "../../utils/atoms";

const Container = styled.div`
  width: 100%;
  height: 95%;
  background-color: red;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 5%;
`;

export interface ICardProps {
  userId: string;
  externalAccountId: string;
}

export default function Card({ userId, externalAccountId }: ICardProps) {
  const [cardIndex, setCardIndex] = useRecoilState(cardIndexState);

  const onSetCard = async () => {
    await Promise.all([setCardIndex(externalAccountId)]);
  };

  return (
    <Container onClick={onSetCard}>
      <h1>HELLO</h1>
    </Container>
  );
}
