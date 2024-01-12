import { FC, useEffect, useState } from "react"
import styled from "styled-components"

import LinkInput from "./LinkInput"
import { LinkData } from "../types"
import { asyncHandler } from "../hooks"
import ShrinkedEditor from "./ShrinkedEditor"

const H1 = styled.h1`
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

const App: FC = () => {
  const [newShrinked, setNewShrinked] = useState<LinkData>({
    _id: "",
    output: ""
  })
  const server_link: string = "https://histl.onrender.com"

  useEffect(()=>{
    (asyncHandler(async () => {
      await fetch(server_link, {method: 'GET'});
      await window.alert("Done. Server is awake");
    }))();
  },[])

  return (
    <>
      <H1>Honey, I Shrunk The Links</H1>
      <LinkInput shrink_setter={setNewShrinked} server_link={server_link}/>
      <ShrinkedEditor new_shrink={newShrinked} shrink_setter={setNewShrinked} server_link={server_link}/>
    </>
  )
};

export default App