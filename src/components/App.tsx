import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { LinkData, PersonalLinkData, StatsData } from "../types"
import * as Color from "../colors"
import * as api from "../api";
import LinkInput from "./LinkInput"
import PendingServer from "./PendingServer";
import ServerError from "./ServerError";
import ShrinkedEditor from "./ShrinkedEditor"
import TopSites from "./TopSites";
import ShrinkedStats from "./ShrinkedStats";

interface MainContentProps {
  $is_display_shrinked: boolean
  $is_editor_displayed: boolean
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
  text-transform: uppercase;
  text-align: center;
`

const MainContent = styled.div<MainContentProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  opacity: ${(props):string => (props.$is_display_shrinked && props.$is_editor_displayed === false)? "0": "1"};
  transition: opacity 1.5s;

  .main_container{
    width:${(props): string => props.$is_display_shrinked ? "80%": "100%"};
    transition: width 1s;

    form{
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      align-items: center;
      padding-left: ${(props): string => props.$is_display_shrinked ? "15rem" : "1rem"};
      transition: padding-left 1s;
      
      @media only screen and (max-width: 880px){
        flex-direction: column;
        gap: 1rem;
        align-items: ${(props): string | null => props.$is_display_shrinked ? "flex-start" : null};
      }
        
      input{
        height: ${(props): string => props.$is_display_shrinked ? "2.2rem" : "4.4rem"};
        width: ${(props): string => props.$is_display_shrinked ? "18rem" : "37rem"};
        transition: height 1s,width 1s;

        @media only screen and (max-width: 880px){
          height: ${(props): string | null => props.$is_display_shrinked ? "3rem" : null};
          width: ${(props): string => props.$is_display_shrinked ? "20rem" : "50%"};
        }

        &::placeholder {
          font-size: ${(props): string | null => props.$is_display_shrinked ? null : "1.5rem"};
          transition: all 1s;
        }
      }

      button{
        width: ${(props): string => props.$is_display_shrinked ? "6rem" : "8rem"};
        height: ${(props): string => props.$is_display_shrinked ? "1.8rem" : "4rem"};
        font-size: ${(props): string => props.$is_display_shrinked ? "0.8rem" : "1.5rem"};
        transition: width 1s, height 1s, display 1s, font-size 1s;

        @media only screen and (max-width: 880px){
          height: ${(props): string | null => props.$is_display_shrinked ? "3rem" : null};
          width: ${(props): string => props.$is_display_shrinked ? "20rem" : "50%"};
          font-size: ${(props): string | null => props.$is_display_shrinked ? "1.2rem" : null};
        }
      }
    }
    .shrinked_output{
      display: flex;
      flex-direction: row;
      padding-left: ${(props): string => props.$is_display_shrinked ? "25%" : "10%"};
      gap: 2.4rem;
      transition: all 1s;

      @media only screen and (max-width: 880px){
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        width: ${(props): string | null => props.$is_display_shrinked ? null : "50%"};
        margin-left: ${(props): string | null => props.$is_display_shrinked ? null : "15%"};
      }

      button{
        width: ${(props): string => props.$is_display_shrinked ? "6.5rem" : "8rem"};
        height: ${(props): string => props.$is_display_shrinked ? "1.8rem" : "4rem"};
        font-size: 0.8rem;
        transition: width 1s, height 1s, display 1s, font-size 1s;
        
        @media only screen and (max-width: 880px){
          width: 70%;
          height: 3rem;
          font-size: 1.2rem;
        }
      }
    }

    a{
      font-size: ${(props): string => props.$is_display_shrinked ? "1rem" : "1.5rem"};
      display: block;
      text-decoration: underline;
      width: ${(props): string => props.$is_display_shrinked ? "17rem" : "35rem"};
      transition: font-size 1s, width 1s;

      @media only screen and (max-width: 880px){
          text-align: center;
        }
    }

    .editor_input{
      form{
          padding-left: 0;
      }
    }
  }
`

const Footer = styled.div`
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
        api.riseAndShine();
        const shrinks_array: StatsData[] = await api.fetchTopShrinked();
        setTopShrinked(shrinks_array);
        const visited_array: StatsData[] = await api.fetchTopVisited();
        setTopVisited(visited_array)
        const last_visited: StatsData[] = await api.fetchLastVisited();
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
        <MainContent 
          $is_display_shrinked={isDisplayShrinked}
          $is_editor_displayed={isEditorDisplayed}
        >
          <div className="main_container">
            <LinkInput 
              set_new_shrinked={setNewShrinked} 
              is_editor_displayed={isEditorDisplayed}
              set_is_editor_displayed={setIsEditorDisplayed}
              set_is_display_shrinked={setIsDisplayShrinked}
            />
            <ShrinkedEditor 
              new_shrinked={newShrinked} 
              set_new_shrinked={setNewShrinked} 
              is_editor_displayed={isEditorDisplayed}
              set_is_editor_displayed={setIsEditorDisplayed}
              set_is_display_shrinked={setIsDisplayShrinked}
              stats_setters={{
                set_top_shrinks: setTopShrinked, 
                set_top_visited: setTopVisited, 
                set_last_visited: setLastVisited,
                set_selected: setSelectedShrinked
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
              stats_title="Shrinks"
              stats_data={topShrinked}
              is_display_shrinked={isDisplayShrinked}
              is_editor_displayed={isEditorDisplayed}
            />
            <TopSites
              header="Top Visited Sites:"
              stats_title="Visits"
              stats_data={topVisited}
              is_display_shrinked={isDisplayShrinked}
              is_editor_displayed={isEditorDisplayed}
            />
            <TopSites
              header="Recently Visited:"
              stats_title="Last Visit"
              stats_data={lastVisited}
              is_display_shrinked={isDisplayShrinked}
              is_editor_displayed={isEditorDisplayed}
            />
          </Carousel>
          <ShrinkedStats 
            selected={selectedShrinked}
            stats_setters={{
              set_top_shrinks: setTopShrinked, 
              set_top_visited: setTopVisited, 
              set_last_visited: setLastVisited,
              set_selected: setSelectedShrinked
            }}
            set_is_editor_displayed={setIsEditorDisplayed}
            set_is_display_shrinked={setIsDisplayShrinked}
            is_display_shrinked={isDisplayShrinked}
            is_editor_displayed={isEditorDisplayed}
          />
      </MainContent>
      }
      <Footer>
        <p>Created by Or Golshtein:</p> 
        <p><a href="https://orgolshtein.wixsite.com/portfolio" target="_blank">https://orgolshtein.wixsite.com/portfolio</a></p> 
        <p><a href="https://github.com/orgolshtein" target="_blank">github.com/orgolshtein</a></p>
      </Footer>
    </>
  )
};

export default App