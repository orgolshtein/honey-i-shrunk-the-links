import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { darken } from "polished";

import LinkInput from "./LinkInput"
import { LinkData } from "../types"
import { asyncHandler } from "../hooks"
import ShrinkedEditor from "./ShrinkedEditor"

const AppDiv = styled.div`
  h1{
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
  }

  .shrinked{
    width:80%;
    transition: width 1s;

    form{
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: center;
      padding-left: 200px;
      transition: padding-left 1s;
        
      input{
        height: 30px;
        width: 240px;
        font-size: 12px;
        padding-left: 10px;
        border: #3949fb4d solid 1.5px;
        border-radius: 4px;
        color: #0310a588;
        transition: all 1s;
        
        &:focus{
            outline-width: 0;
        }

        &::placeholder {
            color: #3949fb4d;
            opacity: 1;
        }
      }

      button{
        width: 85px;
        height: 25px;
        background: #3949fb4d;
        border: #548498 solid 1px;
        border-radius: 3px;
        color: #548498;
        font-size: 12px;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        
        &:hover{
          color: ${darken(0.5, "#548498")};
          background: ${darken(0.5, "#3949fb4d")};
        }
      }
    }
    .shrinked_output{
      display: flex;
      flex-direction: row;
      gap: 33px;
      transition: all 1s;

      button{
        width: 90px;
        height: 25px;
        background: #3949fb4d;
        border: #548498 solid 1px;
        border-radius: 3px;
        color: #548498;
        font-size: 12px;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        
        &:hover{
          color: ${darken(0.5, "#548498")};
          background: ${darken(0.5, "#3949fb4d")};
        }
      }
    }

    a{
      text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
      color: #29318cb2;
      font-size: 1rem;
      display: block;
      font-family: "Griffy", cursive;
      text-decoration: underline;
      width: 225px;
      transition: all 1s;
    }
  }

  .full{
    width:100%;
    transition: width 1s;

    form{
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: center;
      padding-left: 0;
      transition: padding-left 1s;
      
      input{
        height: 60px;
        width: 500px;
        font-size: 20px;
        padding-left: 10px;
        border: #3949fb4d solid 1.5px;
        border-radius: 4px;
        color: #0310a588;
        transition: all 1s;
        
        &:focus{
          outline-width: 0;
        }

        &::placeholder {
          color: #3949fb4d;
          opacity: 1;
        }
      }

      button{
        width: 110px;
        height: 55px;
        background: #3949fb4d;
        border: #548498 solid 1px;
        border-radius: 3px;
        color: #548498;
        font-size: 20px;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        
        &:hover{
          color: ${darken(0.5, "#548498")};
          background: ${darken(0.5, "#3949fb4d")};
        }
      }
    }
    
    .shrinked_output{
      display: flex;
      flex-direction: row;
      gap: 33px;
      transition: all 1s;

      button{
        width: 110px;
        height: 55px;
        background: #3949fb4d;
        border: #548498 solid 1px;
        border-radius: 3px;
        color: #548498;
        font-size: 12px;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        
        &:hover{
          color: ${darken(0.5, "#548498")};
          background: ${darken(0.5, "#3949fb4d")};
        }
      }
    }

    a{
      text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
      color: #29318cb2;
      font-size: 1.5rem;
      display: block;
      font-family: "Griffy", cursive;
      text-decoration: underline;
      width: 400px;
      transition: all 1s;
    }
  }

  .editor_input{
    form{
        padding-left: 0;
    }
  }
`

const App: FC = () => {
  const [newShrinked, setNewShrinked] = useState<LinkData>({_id: "",output: ""});
  const [isEditorDisplayed, setIsEditorDisplayed] = useState<boolean>(false);
  const [isShrinked, setIsShrinked] = useState<boolean>(false);
  const server_link: string = "https://histl.onrender.com"

  useEffect(()=>{
    (asyncHandler(async () => {
      await fetch(server_link, {method: 'GET'});
      await window.alert("Done. Server is awake");
    }))();
  },[])

  return (
    <AppDiv>
      <h1>Honey, I Shrunk The Links</h1>
      <div className={isShrinked ? "shrinked" : "full"}>
        <LinkInput 
          shrink_setter={setNewShrinked} 
          server_link={server_link} 
          editor_display={isEditorDisplayed}
          editor_setter={setIsEditorDisplayed}
          is_display_shrinked={setIsShrinked}
        />
        <ShrinkedEditor 
          new_shrink={newShrinked} 
          shrink_setter={setNewShrinked} 
          server_link={server_link}
          editor_display={isEditorDisplayed}
          editor_setter={setIsEditorDisplayed}
          is_display_shrinked={setIsShrinked}
        />
      </div>
    </AppDiv>
  )
};

export default App