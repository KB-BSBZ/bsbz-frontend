import styled from "styled-components";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import useScrollReset from "../../utils/useScrollReset";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const Content = styled.div`
  width: 40%;
  height: 60%;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

interface IPurchaseProps {
  onModal: () => void;
}

const ButtonBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;
`;

const WriteField = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h1 {
    text-align: center;
  }
`;

const Line = styled.div`
  padding: 0 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    width: 60%;
    height: 50%;
    border: none;
    font-size: 48px;
    text-align: center;
  }

  input:focus {
    outline: none;
  }
`;

const PurchaseButton = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IPurchaseData {
  quantity: string;
}

export default function Purchase({ onModal }: IPurchaseProps) {
  const [amount, setAmount] = useState(0);
  const [money, setMoney] = useState(100000);
  const reset = useScrollReset();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IPurchaseData>();

  const onMinus = () => {
    if (0 < amount) {
      setAmount((current) => {
        const temp = current - 1;
        setValue("quantity", String(temp));
        return temp;
      });
    }
  };

  const onPlus = () => {
    if (amount * 10000 < money) {
      // 구매량이 잔액을 초과하지 않을 때
      setAmount((current) => {
        const temp = current + 1;
        setValue("quantity", String(temp));
        return temp;
      });
    }
  };

  const onValid = (data: IPurchaseData) => {
    if (!localStorage.getItem("userData")) {
      // 로그인 되어있지 않으면 로그인 창으로
      reset("/login");
    }

    if (data.quantity === "0") {
      // 구매하지 않았을 경우
    } else {
      console.log(data);
      onModal();
    }
  };

  return (
    <Container>
      <Content>
        <h3>구매하기</h3>
        <WriteField>
          <h3>계좌 잔액</h3>
          <h1>{money} &#8361;</h1>

          <h3>구매 수량</h3>
          <form onSubmit={handleSubmit(onValid)}>
            <Line>
              <PurchaseButton onClick={onMinus}>
                <FontAwesomeIcon icon={faCircleMinus} fontSize={48} />
              </PurchaseButton>
              <input
                {...register("quantity")}
                type="text"
                value={amount}
                readOnly
              />

              <PurchaseButton onClick={onPlus}>
                <FontAwesomeIcon icon={faCirclePlus} fontSize={48} />
              </PurchaseButton>
            </Line>
          </form>
        </WriteField>
        <ButtonBox>
          <Button
            width={"40%"}
            height={"75%"}
            hover={"red"}
            color={"red"}
            text={"취 소"}
            border={"15px"}
            onclick={onModal}
          />

          <Button
            width={"40%"}
            height={"75%"}
            hover={"yellow"}
            color={"yellow"}
            text={"구 매"}
            border={"15px"}
            onclick={handleSubmit(onValid)}
          />
        </ButtonBox>
      </Content>
    </Container>
  );
}
