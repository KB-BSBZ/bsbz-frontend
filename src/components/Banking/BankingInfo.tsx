import { styled } from "styled-components";
import BankSlider from "./BankSlider.jsx";
import { imgList } from "../../jsons/imgList.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12vh;
  background-color: ${(props) => props.theme.mainColor};
  margin-bottom: 50px;
`;
const Main = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
`;
const BankSlide = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid; */
`;

const InputSection = styled.div`
  border: 1px solid;
  height: 40vh;
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const SeletedBank = styled.div`
  border: 1px solid;
  width: 100%;
  height: 18%;
  display: flex;
`;
const BankName = styled.div`
  width: 20%;
  height: 100%;
  font-size: 24px;
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AccountNum = styled.div`
  width: 80%;
  height: 80%;
  font-size: 24px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TriangleBox = styled.div`
  display: flex;
  height: 18%;
  justify-content: end;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent; /* 왼쪽 변 */
  border-right: 20px solid transparent; /* 오른쪽 변 */
  border-top: 40px solid #f00; /* 아래쪽 변 및 배경색 (여기서는 빨간색) */
  margin: 2%;
`;

const BSBZBank = styled.div`
  border: 1px solid;
  width: 100%;
  height: 18%;
  display: flex;
`;

const InputPrice = styled.div`
  margin-top: 50px;
  border: 1px solid;
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Price = styled.div`
  height: 80%;
  width: 20%;
  font-size: 24px;
  padding: 3%;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const InputBalance = styled.input`
  height: 60%;
  width: 70%;
  border: none;
  font-size: 24px;
  text-align: end;
  padding-right: 10px;
`;
const Blank = styled.div`
  width: 20%;
`;

const SubmitBtn = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.div`
  width: 20%;
  height: 60%;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BankingInfo() {
  return (
    <>
      <Container>
        <Main>
          <BankSlide>
            <BankSlider data={imgList}></BankSlider>
          </BankSlide>
          <InputSection>
            <SeletedBank>
              <BankName>국민 은행</BankName>
              <AccountNum>111-111-1111-1111</AccountNum>
            </SeletedBank>
            <TriangleBox>
              <Triangle></Triangle>
            </TriangleBox>
            <BSBZBank>
              <BankName>벌부 계좌</BankName>
              <AccountNum>222-222-2222-2222</AccountNum>
            </BSBZBank>
            <InputPrice>
              <Blank></Blank>
              <InputBalance></InputBalance>
              <Price>원</Price>
            </InputPrice>
            <SubmitBtn>
              <Btn>입 금 하 기</Btn>
            </SubmitBtn>
          </InputSection>
        </Main>
      </Container>
    </>
  );
}
