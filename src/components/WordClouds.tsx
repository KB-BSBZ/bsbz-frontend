import React, { useCallback, useEffect, useState } from "react";
import { render } from "react-dom";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import axios from "axios";
import "../css/WordClouds-styles.css";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
`;

export interface IWordCloudProps {
  word: string;
  frequency: number;
}

interface IWordCloudData {
  productId: number;
}

export default function WordClouds({ productId }: IWordCloudData) {
  const [wordData, setwordData] = useState<IWordCloudProps[]>([]);

  // 정규화
  const normalization = () => {
    const frequencies = wordData.map((item) => item.frequency);
    const minFrequency = Math.min(...frequencies);
    const maxFrequency = Math.max(...frequencies);
    return { minFrequency, maxFrequency };
  };

  //const fontSize = useCallback((word: any) => Math.log2(word.value) * 15, []);
  const fontSize = useCallback((word: any) => {
    const { minFrequency, maxFrequency } = normalization();
    const scaledVal =
      10 + ((word.value - minFrequency) / (maxFrequency - minFrequency)) * 90;
    return scaledVal * 2;
  }, []);

  const rotate = useCallback((word: any) => 0, []);
  const fill = useCallback(
    (word: any, i: number) => schemeCategory10[i % schemeCategory10.length],
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      const url =
        "http://localhost:8000/pricelog/music_predict/" + `${productId}/`;

      await axios
        .get(url)
        .then((response) => {
          setwordData(response.data);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  return (
    <WordCloud
      data={wordData.map((item) => ({
        text: item.word,
        value: item.frequency,
      }))}
      width={1000}
      height={800}
      padding={1}
      font="times"
      fontWeight="normal"
      fontSize={fontSize}
      spiral="rectangular"
      rotate={rotate}
      random={Math.random}
      fill={fill}
    />
  );
}
