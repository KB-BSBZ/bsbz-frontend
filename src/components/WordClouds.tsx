import React, { useCallback } from "react";
import { render } from "react-dom";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { wordData } from "../jsons/wordData";
import "../css/WordClouds-styles.css";

export default function WordClouds() {
  const fontSize = useCallback((word: any) => word.value / 8, []);
  const rotate = useCallback((word: any) => 0, []);
  const fill = useCallback(
    (word: any, i: number) => schemeCategory10[i % schemeCategory10.length],
    []
  );

  return (
    <WordCloud
      data={wordData.map((item) => ({
        text: item.word,
        value: item.frequency,
      }))}
      width={500}
      height={500}
      font="Times"
      fontWeight="normal"
      fontSize={fontSize}
      spiral="rectangular"
      rotate={rotate}
      random={Math.random}
      fill={fill}
    />
  );
}
