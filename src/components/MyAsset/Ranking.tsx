import { useRef } from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4vmin;
  }

  .wrap button {
    padding: 2vmin 4vmin;
    border: 2px solid #fff;
    background: none;
    color: #fff;
    font-size: 3vmin;
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
    background: #ffff33ff;
    width: 40vmin;
    height: 40vmin;
    font-size: 5vmin;
    font-weight: bold;
    box-shadow: 1px 10px 10px -4px rgba(0, 0, 0, 0.1);
  }
`;

export default function Ranking({ ranking }: { ranking: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };
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
            borderRadius: ["20%", "50%"],
            transition: { delay: 0.05 },
          }}
          whileHover={{
            scale: 1.0,
            transition: { type: "spring", stiffness: 400, damping: 20 },
          }}
        >
          <p>상위 {ranking}%</p>
        </motion.div>
      </div>
    </Main>
  );
}
