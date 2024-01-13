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
  margin-top: 50px;
  margin-bottom: 80px;
  font-weight: bold;
  font-family: "Griffy", cursive;
  text-transform: uppercase;
  `

const App: FC = () => {
  const [newShrinked, setNewShrinked] = useState<LinkData>({
    _id: "",
    output: ""
  });
  const [isEditorDisplayed, setIsEditorDisplayed] = useState<boolean>(false);
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
      <LinkInput 
        shrink_setter={setNewShrinked} 
        server_link={server_link} 
        editor_display={isEditorDisplayed}
        editor_setter={setIsEditorDisplayed}
      />
      <ShrinkedEditor 
        new_shrink={newShrinked} 
        shrink_setter={setNewShrinked} 
        server_link={server_link}
        editor_display={isEditorDisplayed}
        editor_setter={setIsEditorDisplayed}
      />
    </>
  )
};

export default App