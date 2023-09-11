import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./utils/theme";
import { RecoilRoot } from "recoil";

const Grobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif
  }


  ::-webkit-scrollbar {
  height: 0;
  width: 0;
  position: fixed;
  background-color: transparent;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Grobal />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </BrowserRouter>
);
