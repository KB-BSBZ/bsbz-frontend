import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cardIndexState } from "../../utils/atoms";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 95%;
  background-color: red;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 5%;
  display: flex;
  justify-content: row;
`;
const CardImg = styled.div`
  width: 90%;
  height: 100%;
  border: 1px solid;
`;
const Delete = styled.div`
  width: 10%;
  height: 10%;
  border: 1px solid;
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
      <CardImg onClick={onSetCard}>
        <h4>{userId}님의 외부 계좌</h4>
        <h4>{exAccount}</h4>
      </CardImg>
      <Delete onClick={deleteBtn}></Delete>
    </Container>
  );
}
