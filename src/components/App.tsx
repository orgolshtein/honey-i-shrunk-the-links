import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { darken } from "polished";

import LinkInput from "./LinkInput"
import { LinkData, StatsData } from "../types"
import ShrinkedEditor from "./ShrinkedEditor"
import PendingServer from "./PendingServer";
import TopSites from "./TopSites";

const Header = styled.h1`
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
const ConnectError = styled.h2`
  text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
  color: red;
  font-size: 2rem;
  padding-left: 1rem;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-top: 50px;
  margin-bottom: 80px;
  font-weight: bold;
  font-family: "Griffy", cursive;
`

const AppDiv = styled.div`
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
        font-family: "Griffy", cursive;
        transition: all 1s;
        
        &:focus{
            outline-width: 0;
        }

        &::placeholder {
            color: #3949fb4d;
            opacity: 1;
            transition: all 1s;
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
        font-family: "Griffy", cursive;
        
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
        font-family: "Griffy", cursive;
        
        &:hover{
          color: ${darken(0.5, "#548498")};
          background: ${darken(0.5, "#3949fb4d")};
        }
      }
    }

    a{
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
        font-size: 12px;
        padding-left: 10px;
        border: #3949fb4d solid 1.5px;
        border-radius: 4px;
        color: #0310a588;
        font-family: "Griffy", cursive;
        transition: all 1s;
        
        &:focus{
          outline-width: 0;
        }

        &::placeholder {
          color: #3949fb4d;
          opacity: 1;
          font-size: 20px;
          transition: all 1s;
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
        font-family: "Griffy", cursive;
        
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
        font-family: "Griffy", cursive;
        
        &:hover{
          color: ${darken(0.5, "#548498")};
          background: ${darken(0.5, "#3949fb4d")};
        }
      }
    }

    a{
      color: #3f4bcdb1;
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

const FooterDiv = styled.div`
  font-weight: 300;
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 5rem 10rem 10% 10rem;
  height: 7.8rem;
  z-index: 100;
  text-align: center;
  margin-top: 5rem;
  margin-bottom:0;

  p{
    margin-top: .5rem;
    font-family: "Griffy", cursive;
    color: #29318cb2;

    a{
      color: #29318cb2;
    }
  }
`

const App: FC = (): JSX.Element => {
  const [isServerLoading, setIsServerLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>("");
  const [newShrinked, setNewShrinked] = useState<LinkData>({_id: "",output: ""});
  const [isEditorDisplayed, setIsEditorDisplayed] = useState<boolean>(false);
  const [isDisplayShrinked, setIsDisplayShrinked] = useState<boolean>(false);
  const [topShrinked, setTopShrinked] = useState<StatsData[]>([]);
  const [topVisited, setTopVisited] = useState<StatsData[]>([]);
  const [lastVisited, setLastVisited] = useState<StatsData[]>([]);
  const server_link: string = "https://histl.onrender.com"
  const analytics_router: string = "/api/analytics/"

  useEffect(()=>{
    (async () => {
      try{
        const shrinks_data: Response = await fetch(`${server_link}${analytics_router}most-redirected/4`);
        const shrinks_array: StatsData[] = await shrinks_data.json();
        setTopShrinked(shrinks_array);
        const visited_data: Response = await fetch(`${server_link}${analytics_router}most-visited/4`);
        const visited_array: StatsData[] = await visited_data.json();
        setTopVisited(visited_array)
        const last_visited_data: Response = await fetch(`${server_link}${analytics_router}last-visited/4`);
        const last_visited_array: StatsData[] = await last_visited_data.json();
        setLastVisited(last_visited_array)
      } catch {
        setServerError("Sorry, server is fast asleep");
      }finally{
        setIsServerLoading(false);
      }
    })();
  },[])

  return (
    <>
      <Header>Honey, I Shrunk The Links</Header>
      {
        serverError ?
        <ConnectError>{serverError}</ConnectError> :
        isServerLoading ? 
        <PendingServer /> :
        <AppDiv>
          <div className={isDisplayShrinked ? "shrinked" : "full"}>
            <LinkInput 
              shrink_setter={setNewShrinked} 
              server_link={server_link} 
              editor_display={isEditorDisplayed}
              editor_setter={setIsEditorDisplayed}
              is_display_shrinked={setIsDisplayShrinked}
            />
            <ShrinkedEditor 
              new_shrink={newShrinked} 
              shrink_setter={setNewShrinked} 
              server_link={server_link}
              editor_display={isEditorDisplayed}
              editor_setter={setIsEditorDisplayed}
              is_display_shrinked={setIsDisplayShrinked}
            />
          </div>
          <TopSites
            top_shrinked={topShrinked}
            top_visited={topVisited}
            last_visited={lastVisited}
          />
      </AppDiv>
      }
      <FooterDiv>
        <p>Created by Or Golshtein:</p> 
        <p><a href="https://orgolshtein.wixsite.com/portfolio" target="_blank">https://orgolshtein.wixsite.com/portfolio</a></p> 
        <p><a href="https://github.com/orgolshtein" target="_blank">github.com/orgolshtein</a></p>
      </FooterDiv>
    </>
  )
};

export default App