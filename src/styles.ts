import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

export const GlobalStyle: React.NamedExoticComponent = createGlobalStyle`
  ${Reset}
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    gap: 4rem;
  }

  html {
    height: 900px;
    font: 13.5px 'Helvetica Neue',Arial;
    background: #89CFF0;
    background: -moz-linear-gradient(
      top,
      #f5f5dc 0%,
      #89CFF0 100%
    );
    background: -webkit-linear-gradient(
      top,
      #f5f5dc 0%,
      #89CFF0 100%
    );
    background: linear-gradient(
      to bottom,
      #f5f5dc 0%,
      #89CFF0 100%
    );
    font-family: Arial,sans-serif;
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
`
