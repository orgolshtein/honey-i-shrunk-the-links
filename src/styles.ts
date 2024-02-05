import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";
import { darken, lighten } from "polished";

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

    input{
      padding-left: 0.7rem;
      border-radius: 0.3rem;
      color: ${Color.mainText};
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;;

      &:focus{
        outline-width: 0;
      }

      &::placeholder {
        color: ${Color.inputPlaceholder};
      }
    }

    button{
      background: ${Color.button};
      border: ${Color.buttonText} solid 1px;
      border-radius: 0.2rem;
      color: ${Color.buttonText};
      cursor: pointer;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

      &:hover{
        color: ${darken(0.5, Color.buttonText)};
        background: ${darken(0.5, Color.button)};
      }
    }

    .error_msg{
      text-shadow: 2px 2px 0px ${Color.textShadow};
      color: ${Color.error};
      display: block;
    }

    a{
        color: ${Color.mainText};

        &:hover {
        color: ${lighten(0.3, Color.mainText)};
      }
    }
  }

  html {
    font: 13.5px;
    height: 160%;
    color: ${Color.mainText};
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
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @media only screen and (max-width: 880px){
      font: 16px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }
  };
`
