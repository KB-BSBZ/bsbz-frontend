import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { addCardModalState, cardIndexState } from "../../utils/atoms";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 50%;

  padding: 1% 2%;

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.blurColor2};
`;

const HeadLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  h1 {
    cursor: pointer;
  }
`;

const Forms = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // 입력 폼

    input {
      // 데이터 입력 폼
      border: none;
      padding: 1vh;
      width: 240px;
      border-radius: 8px;
    }

    button {
      border: none;
      width: 180px;
      padding: 1vh;
      border-radius: 6px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.borderColor};

  overflow: hidden;
  background-color: ${(props) => props.theme.borderColor};
  padding: 0 1px 6px 1px;

  transition: background-color ease 0.3s;

  button {
    background-color: ${(props) => props.theme.backgroundColor};
    transition: color ease 0.3s, background-color ease 0.3s;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
    button {
      color: ${(props) => props.theme.borderColor};
      background-color: ${(props) => props.theme.highlightColor};
      cursor: pointer;
    }
  }
`;

const InputBox = styled.div`
  background-color: ${(props) => props.theme.borderColor};
  margin-bottom: 2vh;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  padding: 0 1px 6px 1px;

  display: flex;
  width: 100%;
  gap: 2%;
`;

interface ICardProps {
  userId: string;
}

interface IAccountData {
  bankName: string;
  accountNumber: string;
}

export default function AddCardModal({ userId }: ICardProps) {
  const [addCardModal, setAddCardModal] = useRecoilState(addCardModalState);
  const [cardIndex, setCardIndex] = useRecoilState(cardIndexState);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccountData>();

  const onAddCard = async (account: string) => {
    const add_url = "http://localhost:9999/user/update/account/add";
    const add_options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        exAccount: account,
        userId: userId,
      },
    };

    const [add_response] = await Promise.all([axios(add_url, add_options)]);
    console.log(add_response);
    setAddCardModal(false);
    window.location.reload();
  };

  const onValid = (data: IAccountData) => {
    let values = `${data.bankName} ${data.accountNumber}`;
    console.log(values);
    console.log(userId);
    try {
      onAddCard(values);
    } catch (error) {
      console.error(error);
    } finally {
      //   window.location.reload();
    }
  };

  return (
    <>
      <Container>
        <InputContainer>
          <HeadLine>
            <h1 onClick={() => setAddCardModal(false)}>X</h1>
          </HeadLine>
          <Forms>
            <form onSubmit={handleSubmit(onValid)}>
              <InputBox>
                <input
                  {...register("bankName", {
                    required: "은행 명을 입력하세요.",
                  })}
                  type="text"
                  placeholder="은행명"
                />
                <input
                  {...register("accountNumber", {
                    required: "계좌번호를 입력하세요.",
                  })}
                  type="text"
                  placeholder="계좌번호"
                />
              </InputBox>

              <ButtonBox>
                <button>등록 하기</button>
              </ButtonBox>
            </form>
          </Forms>
        </InputContainer>
      </Container>
    </>
  );
}
