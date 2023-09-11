import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const TextBox = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  height: 12vh;
`;

const ImgBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface INewsProps {
  title: string;
  paragraph: string;
  url: string;
  postNumber: string;
}

export default function News({
  title,
  paragraph,
  postNumber,
  url,
}: INewsProps) {
  return (
    <Container>
      <TextBox>
        <b>{title}</b>
        <p>{paragraph}</p>
      </TextBox>
      <ImgBox>
        <h2>IMG</h2>
      </ImgBox>
    </Container>
  );
}
