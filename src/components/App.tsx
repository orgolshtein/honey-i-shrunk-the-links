import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { darken } from "polished";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import LinkInput from "./LinkInput"
import { LinkData, PersonalLinkData, StatsData } from "../types"
import * as Color from "../colors"
import ShrinkedEditor from "./ShrinkedEditor"
import PendingServer from "./PendingServer";
import TopSites from "./TopSites";
import ShrinkedStats from "./ShrinkedStats";
import { fetchLastVisited, fetchTopShrinked, fetchTopVisited } from "../api";
import ServerError from "./ServerError";

interface AppDivProps {
  $display_shrinked: boolean
  $editor_display: boolean
};

const Header = styled.h1`
  position: relative;
  text-shadow: 2px 2px 0px ${Color.textShadow};
  color: ${Color.header};
  font-size: 3rem;
  -webkit-text-fill-color: transparent;
  display: block;
  font-weight: bold;
  margin-top: 3rem;
  font-family: "Griffy", cursive;
  text-transform: uppercase;
  text-align: center;
`

const AppDiv = styled.div<AppDivProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  color: ${Color.mainText};
  opacity: ${(props):string => (props.$display_shrinked && props.$editor_display === false)? "0": "1"};
  transition: opacity 1.5s;

  input{
    font-size: 0.8rem;
    padding-left: 0.7rem;
    border-radius: 0.3rem;
    color: ${Color.mainText};
    font-family: "Griffy", cursive;

    @media only screen and (max-width: 880px){
      font-size: 1.2rem;
    }

    &:focus{
      outline-width: 0;
    }

    &::placeholder {
      color: ${Color.inputPlaceholder};
      opacity: 1;
    }
  }

  .shrinked{
    width:80%;
    transition: width 1s;

    form{
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      align-items: center;
      padding-left: 15rem;
      transition: padding-left 1s;
      
      @media only screen and (max-width: 880px){
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
        
      input{
        height: 2.2rem;
        width: 18rem;
        transition: height 1s,width 1s;

        @media only screen and (max-width: 880px){
          height: 3rem;
          width: 20rem;
        }

        &::placeholder {
            transition: all 1s;
        }
      }

      button{
        width: 6rem;
        height: 1.8rem;
        background: ${Color.button};
        border: ${Color.buttonText} solid 1px;
        border-radius: 0.2rem;
        color: ${Color.buttonText};
        font-size: 0.8rem;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        font-family: "Griffy", cursive;

        @media only screen and (max-width: 880px){
          height: 3rem;
          width: 20rem;
          font-size: 1.2rem;
        }
        
        &:hover{
          color: ${darken(0.5, Color.buttonText)};
          background: ${darken(0.5, Color.button)};
        }
      }
    }
    .shrinked_output{
      display: flex;
      flex-direction: row;
      padding-left: 25%;
      gap: 2.4rem;
      transition: all 1s;

      @media only screen and (max-width: 880px){
        flex-direction: column;
        justify-content:center;
        gap: 1rem;
      }

      button{
        width: 6.5rem;
        height: 1.8rem;
        background: ${Color.button};
        border: ${Color.buttonText} solid 1px;
        border-radius: 0.2rem;
        color: ${Color.buttonText};
        font-size: 0.8rem;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        font-family: "Griffy", cursive;

        @media only screen and (max-width: 880px){
          width: 70%;
          height: 3rem;
          font-size: 1.2rem;
        }
        
        &:hover{
          color: ${darken(0.5, Color.buttonText)};
          background: ${darken(0.5, Color.button)};
        }
      }
    }

    a{
      color: ${Color.mainText};
      font-size: 1rem;
      display: block;
      font-family: "Griffy", cursive;
      text-decoration: underline;
      width: 17rem;
      transition: all 1s;

      @media only screen and (max-width: 880px){
          text-align: center;
        }
    }
  }

  .full{
    width:100%;
    transition: width 1s;

    form{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 0;
      transition: padding-left 1s;
      
      @media only screen and (max-width: 880px){
        flex-direction: column;
        gap: 1rem;
      }
      
      input{
        height: 4.4rem;
        width: 37rem;
        transition: height 1s,width 1s;

        @media only screen and (max-width: 880px){
          width: 50%;
        }
        
        &::placeholder {
          font-size: 1.5rem;
          transition: all 1s;
        }
      }

      button{
        width: 8rem;
        height: 4rem;
        background: ${Color.button};
        border: ${Color.buttonText} solid 1px;
        border-radius: 0.2rem;
        color: ${Color.buttonText};
        font-size: 1.5rem;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        font-family: "Griffy", cursive;

        @media only screen and (max-width: 880px){
          width: 50%;
        }
        
        &:hover{
          color: ${darken(0.5, Color.buttonText)};
          background: ${darken(0.5, Color.button)};
        }
      }
    }
    
    .shrinked_output{
      display: flex;
      flex-direction: row;
      padding-left: 10%;
      gap: 2.4rem;
      transition: all 1s;

      @media only screen and (max-width: 880px){
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        width: 50%;
        margin-left: 15%;
      }

      button{
        width: 8rem;
        height: 4rem;
        background: ${Color.button};
        border: ${Color.buttonText} solid 1px;
        border-radius: 0.2rem;
        color: ${Color.buttonText};
        font-size: 0.8rem;
        cursor: pointer;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        font-family: "Griffy", cursive;
        
        &:hover{
          color: ${darken(0.5, Color.buttonText)};
          background: ${darken(0.5, Color.button)};
        }
      }
    }

    a{
      color: ${Color.mainText};
      font-size: 1.5rem;
      display: block;
      font-family: "Griffy", cursive;
      text-decoration: underline;
      width: 35rem;
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
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 1;
  text-align: center;
  
  @media only screen and (max-width: 700px){
    font-size: 1.2rem;
  }

  p{
    margin-top: .5rem;
    font-family: "Griffy", cursive;
    color: ${Color.mainText};

    a{
      color: ${Color.mainText};
    }
  }
`

const App: FC = (): JSX.Element => {
  const [newShrinked, setNewShrinked] = useState<LinkData>({_id: "",output: ""});
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isServerLoading, setIsServerLoading] = useState<boolean>(true);
  const [isEditorDisplayed, setIsEditorDisplayed] = useState<boolean>(false);
  const [isDisplayShrinked, setIsDisplayShrinked] = useState<boolean>(true);
  const [topShrinked, setTopShrinked] = useState<StatsData[]>([]);
  const [topVisited, setTopVisited] = useState<StatsData[]>([]);
  const [lastVisited, setLastVisited] = useState<StatsData[]>([]);
  const [selectedShrinked, setSelectedShrinked] = useState<PersonalLinkData>({
    target: "",
    link: "",
    visits: 0,
    last_visit: ""
  });
  
  useEffect((): void =>{
    (async (): Promise<void> => {
      try {
        const shrinks_array: StatsData[] = await fetchTopShrinked();
        setTopShrinked(shrinks_array);
        const visited_array: StatsData[] = await fetchTopVisited();
        setTopVisited(visited_array)
        const last_visited: StatsData[] = await fetchLastVisited();
        setLastVisited(last_visited)
        setTimeout((): void => setIsDisplayShrinked(false), 100)
      } catch {
        setIsServerError(true);
      } finally {
        setIsServerLoading(false);
      }
    })();
  },[]);

  return (
    <>
      <Header>Honey, I Shrunk The Links</Header>
      {
        isServerLoading ? 
        <PendingServer /> 
        : isServerError ? 
        <ServerError />
        :
        <AppDiv 
          $display_shrinked={isDisplayShrinked}
          $editor_display={isEditorDisplayed}
        >
          <div className={isDisplayShrinked ? "shrinked" : "full"}>
            <LinkInput 
              shrink_setter={setNewShrinked} 
              editor_display={isEditorDisplayed}
              editor_setter={setIsEditorDisplayed}
              is_display_shrinked={setIsDisplayShrinked}
            />
            <ShrinkedEditor 
              new_shrink={newShrinked} 
              shrink_setter={setNewShrinked} 
              editor_display={isEditorDisplayed}
              editor_setter={setIsEditorDisplayed}
              is_display_shrinked={setIsDisplayShrinked}
              stats_setter={{
                top_shrinks: setTopShrinked, 
                top_visited: setTopVisited, 
                last_visited: setLastVisited,
                selected: setSelectedShrinked
              }}
            />
          </div>
          <Carousel
            autoPlay={true}
            centerMode={false}
            centerSlidePercentage={80}
            infiniteLoop={true}
            interval={6000}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            stopOnHover={false}
            swipeable={false}
            transitionTime={2000}
            useKeyboardArrows={false}
            width="48rem"
          >
            <TopSites
              header="Top Shrinked Sites:"
              stat="Shrinks"
              stats_data={topShrinked}
              display_shrinked={isDisplayShrinked}
              editor_display={isEditorDisplayed}
            />
            <TopSites
              header="Top Visited Sites:"
              stat="Visits"
              stats_data={topVisited}
              display_shrinked={isDisplayShrinked}
              editor_display={isEditorDisplayed}
            />
            <TopSites
              header="Recently Visited:"
              stat="Last Visit"
              stats_data={lastVisited}
              display_shrinked={isDisplayShrinked}
              editor_display={isEditorDisplayed}
            />
          </Carousel>
          <ShrinkedStats 
            selected={selectedShrinked}
            stats_setter={{
              top_shrinks: setTopShrinked, 
              top_visited: setTopVisited, 
              last_visited: setLastVisited,
              selected: setSelectedShrinked
            }}
            editor_setter={setIsEditorDisplayed}
            is_display_shrinked={setIsDisplayShrinked}
            display_shrinked={isDisplayShrinked}
            editor_display={isEditorDisplayed}
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