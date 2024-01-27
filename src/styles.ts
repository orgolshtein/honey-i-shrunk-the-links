import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

export const GlobalStyle: React.NamedExoticComponent = createGlobalStyle`
${Reset}
html,
body {
  height: 160%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
html {
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
}`
