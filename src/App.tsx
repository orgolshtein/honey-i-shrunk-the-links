import styled, { IStyledComponent } from "styled-components"
import LinkInput from "./LinkInput"
import { FastOmit } from "styled-components/dist/types"
import { useEffect } from "react"

const App: () => JSX.Element = (): JSX.Element => {
  useEffect(()=>{
    (async () => {
      const url: string = `https://histl.onrender.com`;
      const options = {
      method: 'GET' 
      };
      await fetch(url,options);
      await console.log("Done. Server is awake");
    })();
  },[])

  return (
    <>
      <H1>Honey, I Shrunk The Links</H1>
      <LinkInput />
    </>
  )
}

const H1: IStyledComponent<
"web", 
FastOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>
> = styled.h1`
  text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
  color: #7a85ff4d;
  font-size: 3rem;
  padding-left: 1rem;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  font-family: "Griffy", cursive;
  text-transform: uppercase;
`

export default App