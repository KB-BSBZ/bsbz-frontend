import { useRef } from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import UseCountNum from "./UseCountUp";

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  color: ${(props) => props.theme.textColor};

  .wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4vmin;
  }

  .wrap button {
    padding: 2vmin 4vmin;
    background: none;
    color: #fff;
    font-size: 2vmin;
    font-weight: bold;
    cursor: pointer;
  }

  .wrap .buttons {
    display: flex;
    gap: 2vmin;
    position: fixed;
    top: 5vmin;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../../images/rate_image2.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 20vmin;
    height: 20vmin;
    font-size: 4vmin;
    font-weight: bold;
    /* box-shadow: 1px 10px 10px -4px rgba(0, 0, 0, 0.1); */

    p {
      margin-bottom: 20%;
    }
  }
`;

export default function Ranking({ ranking }: { ranking: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const count = UseCountNum({
    end: ranking, // 원하는 최종 숫자
    start: 0, // 시작 숫자 (기본값: 0)
    duration: 2000, // 애니메이션 기간 (기본값: 2000ms)
  });
  return (
    <Main>
      <div className="wrap">
        <motion.div
          ref={divRef}
          className="box"
          initial={{ opacity: 0.2, scale: 0.8 }}
          whileInView={{
            opacity: 1,
            rotate: [180, 360],
            transition: { delay: 0.05 },
          }}
          whileHover={{
            scale: 0.8,
            transition: { type: "spring", stiffness: 400, damping: 20 },
          }}
        >
          <p>{count}%</p>
        </motion.div>
      </div>
    </Main>
  );
}
