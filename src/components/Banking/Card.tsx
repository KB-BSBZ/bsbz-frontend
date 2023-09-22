import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cardIndexState } from "../../utils/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 95%;
  background-color: red;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 5%;
  display: flex;
  flex-direction: column;
`;
const CardImg = styled.div`
  width: 100%;
  height: 90%;

  padding: 0 0 2% 2%;
  /* border: 1px solid; */

  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const TobBar = styled.div`
  width: 100%;
  height: 15%;

  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const DeleteButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 18%;
  height: 100%;

  /* background-color: blue; */
  color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;

export interface ICardProps {
  userId: string;
  exAccount: string;
}
export interface ExternalAccount {
  externalAccountId: number | undefined;
  userId: string | undefined;
  exAccount: string | undefined;
}
export default function Card({ userId, exAccount }: ICardProps) {
  const [cardIndex, setCardIndex] = useRecoilState(cardIndexState);
  const delet_url = "http://localhost:9999/user/update/account/delete";
  const total_options = {
    method: "DELET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      userId: userId,
      exAccount: exAccount,
    },
  };
  const onSetCard = async () => {
    await Promise.all([setCardIndex(exAccount)]);
  };
  const deleteAccount = async (userId: string, exAccount: string) => {
    const add_url = "http://localhost:9999/user/update/account/delete";
    const add_options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        exAccount: exAccount,
        userId: userId,
      },
    };

    const [add_response] = await Promise.all([axios(add_url, add_options)]);
    console.log(add_response);
    window.location.reload();
  };

  const deleteBtn = () => {
    console.log("버튼 함수 실행했음");
    deleteAccount(userId, exAccount);
  };

  return (
    <Container>
      <TobBar>
        <DeleteButton onClick={deleteBtn}>
          <FontAwesomeIcon icon={faX} />
        </DeleteButton>
      </TobBar>
      <CardImg onClick={onSetCard}>
        {/* <h4>외부 계좌</h4> */}
        <h4>{exAccount.split(" ")[0]}</h4>
        <h4>{exAccount.split(" ")[1]}</h4>
      </CardImg>
    </Container>
  );
}
