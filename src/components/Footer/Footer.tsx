import styled from "styled-components";
import Member from "./Member";
import { memberList } from "../../jsons/memberList";

const Container = styled.div`
  background-color: ${(props) => props.theme.footerColor};
  color: ${(props) => props.theme.textColor3};
  height: 36vh;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 2vw;
`;

const Logo = styled.div``;

const Members = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 10px;
  margin-right: 18px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

const Lines = styled.div``;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  gap: 12px;
`;

export default function Footer() {
  return (
    <>
      <Container>
        <Info>
          <Logo>
            <h2>BSBZ.</h2>
          </Logo>

          <p>Copyright ⓒ BSBZ Inc. All Rights Reserved.</p>

          <Lines>
            <Line>
              <b>대표 전화</b>
              <p> XXXX - XXXX </p>
            </Line>
            <Line>
              <b>대표 메일</b>
              <p> XXXX@gmail.com </p>
            </Line>
            <Line>
              <b>운영 시간</b>
              <p> 평일 09시~18시(점심 12시~13시) </p>
            </Line>
          </Lines>
        </Info>
        <Info>
          <Line>
            <b>유의 사항</b>
          </Line>

          <p>KBIT4 - team.bsbz</p>
          <Lines>
            <Line> </Line>
            <Line> </Line>
            <Line> </Line>
          </Lines>
        </Info>

        <Members>
          {memberList.map((member) => (
            <Member
              key={member.memberName}
              imgUrl={member.imgUrl}
              memberName={member.memberName}
              gitHubUrl={member.gitHubUrl}
            />
          ))}
        </Members>
      </Container>
    </>
  );
}
