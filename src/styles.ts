import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

import * as Color from "./colors"

export const GlobalStyle: React.NamedExoticComponent = createGlobalStyle`
  ${Reset}
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 4rem;

    @media only screen and (max-width: 880px){
        width: 100%;
    }
  }

  html {
    font: 13.5px 'Helvetica Neue',Arial;
    height: 160%;
    background: ${Color.background1};
    background: -moz-linear-gradient(
      top,
      ${Color.background1} 0%,
      ${Color.background2} 10%,
      ${Color.background1} 100%
    );
    background: -webkit-linear-gradient(
      top,
      ${Color.background1} 0%,
      ${Color.background2} 10%,
      ${Color.background1} 100%
    );
    background: linear-gradient(
      to bottom,
      ${Color.background1} 0%,
      ${Color.background2} 10%,
      ${Color.background1} 100%
    );
    font-family: Arial,sans-serif;
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @media only screen and (max-width: 880px){
      font: 16px 'Helvetica Neue',Arial;
    }
  }
`
