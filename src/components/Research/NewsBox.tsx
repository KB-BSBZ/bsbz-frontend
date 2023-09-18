import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useScrollReset from "../../utils/useScrollReset";
import { INewsProps } from "../../pages/Research";
// import { ISliderData } from "./Slider";

const Container = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent),
    url("https://img.freepik.com/free-vector/hanging-newspaper-concept_1284-5501.jpg?w=996&t=st=1695028888~exp=1695029488~hmac=3d1263739c23970565dd2361c298200fe5a0999a40c71523470a82a82cb7ca0c");

  background-position: center;
  background-size: cover;
  object-fit: cover;

  cursor: pointer;

  a {
    text-decoration: none;
  }
`;

// const Image = styled.span<{ url: string }>`
//   width: 100%;
//   height: 100%;

//   background-image: linear-gradient(
//       to right,
//       rgba(0, 0, 0, 0.6),
//       rgba(0, 0, 0, 0)
//     ),
//     url(${(props) => props.url});
//   background-position: center;
//   background-size: cover;
//   object-fit: cover;
// `;

const TextBox = styled.div`
  /* background-color: ${(props) => props.theme.borderColor}; */

  padding-top: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.textColor};

  overflow: hidden;

  h2 {
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    margin: 0 8px 12px 8px;
  }

  h3 {
    font-size: 16px;
    margin: 0 8px 12px 8px;
    color: ${(props) => props.theme.textColor};
  }

  p {
    font-size: 16px;
    margin: 0 8px 12px 8px;
    color: ${(props) => props.theme.textColor};
  }
`;

const HeadLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  p {
    margin-bottom: 32px;
  }
`;

export default function NewsBox({
  title,
  originallink,
  link,
  description,
  pubDate,
}: INewsProps) {
  // const nav = useNavigate();
  let reset = useScrollReset();

  const onMoveDetail = (event: React.MouseEvent<HTMLSpanElement>) => {
    reset(link);
  };

  return (
    <Container id={title}>
      <Link to={link}>
        <TextBox>
          <HeadLine>
            <p>{pubDate.slice(0, 16)}</p>
            <h2>{title}</h2>
          </HeadLine>

          <p>{description.slice(0, 36) + "..."}</p>
        </TextBox>
      </Link>
    </Container>
  );
}
