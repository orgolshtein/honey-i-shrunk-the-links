import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

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
    background: #89CFF0;
    background: -moz-linear-gradient(
      top,
      #89CFF0 0%,
      #f5f5dc 10%,
      #89CFF0 100%
    );
    background: -webkit-linear-gradient(
      top,
      #89CFF0 0%,
      #f5f5dc 10%,
      #89CFF0 100%
    );
    background: linear-gradient(
      to bottom,
      #89CFF0 0%,
      #f5f5dc 10%,
      #89CFF0 100%
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
