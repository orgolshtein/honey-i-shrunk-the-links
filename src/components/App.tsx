import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { LinkData, StatsObject } from "../types"
import * as Color from "../colors"
import * as api from "../api";
import LinkInput from "./LinkInput"
import PendingServer from "./PendingServer";
import ServerError from "./ServerError";
import ShrinkedOutput from "./ShrinkedOutput"
import TopSites from "./TopSites";
import ShrinkedStats from "./ShrinkedStats";
import useUpdateStats from "../hooks/useUpdateStats";

interface MainContentProps {
  $is_display_small: boolean
  $is_shrinked_output: boolean
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
  opacity: ${(props):string => (props.$is_display_small && props.$is_shrinked_output === false)? "0": "1"};
  transition: opacity 1.5s;

  .main_container{
    width:${(props): string => props.$is_display_small ? "80%": "100%"};
    transition: width 1s;

    form{
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      align-items: center;
      padding-left: ${(props): string => props.$is_display_small ? "15rem" : "1rem"};
      transition: padding-left 1s;
      
      @media only screen and (max-width: 880px){
        flex-direction: column;
        gap: 1rem;
        align-items: ${(props): string | null => props.$is_display_small ? "flex-start" : null};
      }
        
      input{
        height: ${(props): string => props.$is_display_small ? "2.2rem" : "4.4rem"};
        width: ${(props): string => props.$is_display_small ? "18rem" : "37rem"};
        transition: height 1s,width 1s;

        @media only screen and (max-width: 880px){
          height: ${(props): string | null => props.$is_display_small ? "3rem" : null};
          width: ${(props): string => props.$is_display_small ? "20rem" : "50%"};
        }

        &::placeholder {
          font-size: ${(props): string | null => props.$is_display_small ? null : "1.5rem"};
          transition: all 1s;
        }
      }

      button{
        width: ${(props): string => props.$is_display_small ? "6rem" : "8rem"};
        height: ${(props): string => props.$is_display_small ? "1.8rem" : "4rem"};
        font-size: ${(props): string => props.$is_display_small ? "0.8rem" : "1.5rem"};
        transition: width 1s, height 1s, display 1s, font-size 1s;

        @media only screen and (max-width: 880px){
          height: ${(props): string | null => props.$is_display_small ? "3rem" : null};
          width: ${(props): string => props.$is_display_small ? "20rem" : "50%"};
          font-size: ${(props): string | null => props.$is_display_small ? "1.2rem" : null};
        }
      }
    }
    .shrinked_output{
      display: flex;
      flex-direction: row;
      padding-left: ${(props): string => props.$is_display_small ? "25%" : "10%"};
      gap: 2.4rem;
      transition: all 1s;

      @media only screen and (max-width: 880px){
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        width: ${(props): string | null => props.$is_display_small ? null : "50%"};
        margin-left: ${(props): string | null => props.$is_display_small ? null : "15%"};
      }

      button{
        width: ${(props): string => props.$is_display_small ? "6.5rem" : "8rem"};
        height: ${(props): string => props.$is_display_small ? "1.8rem" : "4rem"};
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
      font-size: ${(props): string => props.$is_display_small ? "1rem" : "1.5rem"};
      display: block;
      text-decoration: underline;
      width: ${(props): string => props.$is_display_small ? "17rem" : "35rem"};
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
  const [isShrinkedOutput, setIsShrinkedOutput] = useState<boolean>(false);
  const [isDisplaySmall, setIsDisplaySmall] = useState<boolean>(true);
  const [stats, setStats] = useState<StatsObject>({ 
    top_shrinked: [], 
    top_visited: [], 
    last_visited: [], 
    selected_shrinked: {
      target: "",
      link: "",
      visits: 0,
      last_visit: ""
    }
  });
  
  useEffect((): void =>{
    (async (): Promise<void> => {
      try {
        await api.riseAndShine();
        await useUpdateStats(setStats)
        setTimeout((): void => setIsDisplaySmall(false), 100)
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
          $is_display_small={isDisplaySmall}
          $is_shrinked_output={isShrinkedOutput}
        >
          <div className="main_container">
            <LinkInput 
              set_new_shrinked={setNewShrinked} 
              is_shrinked_output={isShrinkedOutput}
              set_is_shrinked_output={setIsShrinkedOutput}
              set_is_display_small={setIsDisplaySmall}
            />
            <ShrinkedOutput 
              new_shrinked={newShrinked} 
              set_new_shrinked={setNewShrinked} 
              is_shrinked_output={isShrinkedOutput}
              set_is_shrinked_output={setIsShrinkedOutput}
              set_is_display_small={setIsDisplaySmall}
              stats_setters={setStats}
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
              stats_data={stats.top_shrinked}
              is_display_small={isDisplaySmall}
              is_shrinked_output={isShrinkedOutput}
            />
            <TopSites
              header="Top Visited Sites:"
              stats_title="Visits"
              stats_data={stats.top_visited}
              is_display_small={isDisplaySmall}
              is_shrinked_output={isShrinkedOutput}
            />
            <TopSites
              header="Recently Visited:"
              stats_title="Last Visit"
              stats_data={stats.last_visited}
              is_display_small={isDisplaySmall}
              is_shrinked_output={isShrinkedOutput}
            />
          </Carousel>
          <ShrinkedStats 
            selected={stats.selected_shrinked}
            stats={stats}
            stats_setters={setStats}
            set_is_shrinked_output={setIsShrinkedOutput}
            set_is_display_small={setIsDisplaySmall}
            is_display_small={isDisplaySmall}
            is_shrinked_output={isShrinkedOutput}
          />
      </MainContent>
      }
      <Footer>
        <p>Created by Or Golshtein:</p> 
        <p><a 
          href="https://orgolshtein.wixsite.com/portfolio" 
          target="_blank">https://orgolshtein.wixsite.com/portfolio
        </a></p> 
        <p><a 
          href="https://github.com/orgolshtein" 
          target="_blank">github.com/orgolshtein
        </a></p>
      </Footer>
    </>
  )
};

export default App