import React, { useCallback, useEffect, useState } from "react";
import { render } from "react-dom";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import axios from "axios";
import "../css/WordClouds-styles.css";
import { styled } from "styled-components";
import Loading from "./Loading";

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
  const [isLoading, setIsLoading] = useState(true);
  // 정규화
  const normalization = () => {
    const frequencies = wordData.map((item) => item.frequency);
    const minFrequency = Math.min(...frequencies);
    const maxFrequency = Math.max(...frequencies);
    return { minFrequency, maxFrequency };
  };

  //const fontSize = useCallback((word: any) => Math.log2(word.value) * 15, []);
  const fontSize = useCallback(
    (word: any) => {
      const { minFrequency, maxFrequency } = normalization();
      const scaledVal =
        10 + ((word.value - minFrequency) / (maxFrequency - minFrequency)) * 90;
      return scaledVal * 2;
    },
    [wordData]
  );

  const rotate = useCallback((word: any) => 0, []);
  const fill = useCallback(
    (word: any, i: number) => schemeCategory10[i % schemeCategory10.length],
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        "http://localhost:8000/pricelog/music_predict/" + `${productId}/`;

      await axios
        .get(url)
        .then((response) => {
          setwordData(response.data);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  return wordData.length > 0 ? (
    <>
      <WordCloud
        data={wordData.map((item) => ({
          text: item.word,
          value: item.frequency,
        }))}
        width={1000}
        height={700}
        padding={1}
        font="times"
        fontWeight="normal"
        fontSize={fontSize}
        spiral="rectangular"
        rotate={rotate}
        random={Math.random}
        fill={fill}
      />
    </>
  ) : null;
}
