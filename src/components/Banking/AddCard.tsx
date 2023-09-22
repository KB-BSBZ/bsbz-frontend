import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import AddCardModal from "./AddCardModal";
import { useRecoilState } from "recoil";
import { addCardModalState, cardIndexState } from "../../utils/atoms";
import { ICardProps } from "./Card";

const Container = styled.div`
  width: 100%;
  height: 95%;
  background-color: ${(props) => props.theme.blurColor2};
  border: 1px dashed ${(props) => props.theme.borderColor};
  border-radius: 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 48px;

  cursor: pointer;
`;

const InputBox = styled.div``;

export default function AddCard({ userId }: ICardProps) {
  const [addCardModal, setAddCardModal] = useRecoilState(addCardModalState);
  const [cardIndex, setCardIndex] = useRecoilState(cardIndexState);

  const setCard = () => {
    setAddCardModal(true);
    // setCardIndex(exAccount);
  };

  return (
    <Container onClick={setCard}>
      <FontAwesomeIcon icon={faCirclePlus} />
    </Container>
  );
}
