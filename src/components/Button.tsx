import styled from "styled-components";

const OuterBox = styled.div<IBoxProps>`
  background-color: ${(props) => props.theme.borderColor};
  margin-bottom: 2vh;
  border-radius: ${(props) => (props.border ? props.border : "8px")};
  border: 2px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  padding: 0 1px 4px 1px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  cursor: pointer;
  user-select: none;
`;

const InnerBox = styled.div<IBoxProps>`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: ${(props) => (props.border ? props.border : "0 0 6px 6px")};
  width: 100%;
  height: 85%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: background-color ease 0.3s;

  h2 {
    font-size: 100%;
  }

  &:hover {
    background-color: ${(props) =>
      props.hover === "mint"
        ? props.theme.highlightColor2
        : props.hover === "yellow"
        ? props.theme.highlightColor
        : props.hover === "white"
        ? props.theme.backgroundColor
        : null};
  }
`;

interface IButtonProps {
  width: string;
  height: string;
  hover: string;
  text: string;
  border?: string;
}

interface IBoxProps {
  width: string;
  height: string;
  hover: string;
  border?: string;
}

export default function Button({
  width,
  height,
  hover,
  text,
  border,
}: IButtonProps) {
  return (
    <OuterBox width={width} height={height} hover={hover} border={border}>
      <InnerBox width={width} height={height} hover={hover} border={border}>
        <h2>{text}</h2>
      </InnerBox>
    </OuterBox>
  );
}
