import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";
import Hood from "./Hood";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  z-index: 100;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export default function Loading() {
  return (
    <>
      <Hood title={"LOADING..."} />
      <Container>
        <FontAwesomeIcon
          icon={faForumbee}
          beat
          style={{ color: "#fab005ff" }}
          fontSize={96}
        />
      </Container>
    </>
  );
}
