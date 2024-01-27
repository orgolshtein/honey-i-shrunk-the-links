import { darken } from "polished";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PersonalLinkData, StatsData } from "../types";
import { asyncHandler } from "../hooks";
import { analytics_router, fetchLastVisited, fetchTopShrinked, fetchTopVisited, server_link } from "../api";

const ShrinkedStatsDiv = styled.div`
    color: #29318cb2;
    font-size: 1.1rem;
    font-family: "Griffy", cursive;
    margin: 1rem;
    margin-left: 10%;
    margin-top: 3rem;

    p{
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .data_error{
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #ff000080;
        display: block;
        margin-top: 10px;
    }

    a{
        color: #29318cb2;
    }

    span{
        font-weight: bold;
    }

    input{
        height: 30px;
        width: 350px;
        font-size: 12px;
        padding-left: 10px;
        border: #3949fb4d solid 1.5px;
        border-radius: 4px;
        color: #0310a588;
        font-family: "Griffy", cursive;
        margin-right: 4rem;

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
`

interface ShrinkedStatsProps {
    stats_setter: {
        top_shrinks: Dispatch<SetStateAction<StatsData[]>>, 
        top_visited: Dispatch<SetStateAction<StatsData[]>>, 
        last_visited: Dispatch<SetStateAction<StatsData[]>>
    }
};

interface StatsOutputDivProps {
    $is_output_displayed: boolean
}

const StatsOutputDiv = styled.div<StatsOutputDivProps>`
    padding-left: 1rem;
    margin-top: 2rem;

    .output_open {
        p {
            display: block;
            opacity: 0.9;
            animation: slide-down 1000ms;
            @keyframes slide-down {
                from {
                    transform: translateY(-10%); opacity: 0;
                }
                to {
                    transform: translateY(0%); opacity: 1;
                }
            }
        }
    }

    .output_closed {
        p {
            display: none;
            opacity: 0.9;
            animation: slide-up 500ms;
            @keyframes slide-up {
            from { 
                display: block; 
            }
            to { 
                transform: translateY(-10%); opacity: 0;
            }
        }
        }
    }

`

const ShrinkedStats = ({
    stats_setter
}: ShrinkedStatsProps): JSX.Element => {
    const [selectedShrinked, setSelectedShrinked] = useState<PersonalLinkData>({
        target: "",
        link: "",
        visits: 0,
        last_visit: ""
    });
    const [isShrinkedOutput, setIsShrinkedOutput] = useState<boolean>(false);
    const [shrinkedDataError, setShrinkedDataError] = useState<string>("");
    const [outputButton, setOutputButton] = useState<string>("Show");

    useEffect(()=> {
        isShrinkedOutput?
        setOutputButton("Close") :
        setOutputButton("Show")
    }, [isShrinkedOutput])

    const showLinkStats: () => void = asyncHandler(async (): Promise<void> => {
        setShrinkedDataError("");
        const data: PersonalLinkData | string = await (await fetch(
            `${server_link}${analytics_router}`, 
            { 
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shrinked: (ShrinkedStatsInputRef.current as HTMLInputElement).value.toString()
                }) 
            }
            )).json();
            if (typeof data !== "string"){
                setSelectedShrinked({...data})
                setIsShrinkedOutput(true);
            } else {
                setSelectedShrinked({
                    target: "",
                    link: "",
                    visits: 0,
                    last_visit: ""
                });
                setShrinkedDataError(data)
            }
    });

    const updateStats = asyncHandler(async () => {
        const shrinks_array = await fetchTopShrinked();
        stats_setter.top_shrinks(shrinks_array);
        const visited_array = await fetchTopVisited();
        stats_setter.top_visited(visited_array)
        const last_visited = await fetchLastVisited();
        stats_setter.last_visited(last_visited);
        showLinkStats();
    });

   const ShrinkedStatsInputRef = useRef<HTMLInputElement>(null);
    return (
        <ShrinkedStatsDiv>
            <p>Do you want information on <span>your</span> Shrinked Link?</p>
            <p>No problem! Simply paste the link below and click "Show".</p>
            <input type="text" placeholder="Input Shrinked Link" ref={ShrinkedStatsInputRef} onClick={() => {
                setShrinkedDataError("");
                setIsShrinkedOutput(false);
                }}/>
            <button type="button" onClick={
                isShrinkedOutput ? 
                ()=>setIsShrinkedOutput(false) : 
                showLinkStats
                }>{outputButton}</button>
            <p className="data_error">{shrinkedDataError}</p>
            <StatsOutputDiv $is_output_displayed={isShrinkedOutput}>
                <div className={isShrinkedOutput ? "output_open" : "output_closed"}>
                    <p>
                        Your shrinked link, <span onClick={updateStats}>
                        <a href={selectedShrinked.link} target="_blank">{selectedShrinked.link}</a>
                        </span>,
                        </p>
                    <p>is directed to <span>{
                    selectedShrinked.target.length > 45 ? 
                    selectedShrinked.target.substring(0,43) + "..." : 
                    selectedShrinked.target
                    }</span></p>
                    {
                    selectedShrinked.visits === 0 ?
                    <p>and sadly had no visits yet</p> :
                    selectedShrinked.visits === 1 ?
                    <p>and was visited <span>once</span>, with the visit being on</p> :
                    <p>and was visited <span>{selectedShrinked.visits}</span> times,
                    with the recent visit being on</p>
                    }
                    {
                        selectedShrinked.visits > 0 ?
                        <p><span>{selectedShrinked.last_visit}</span></p> : null
                    }
                </div>
            </StatsOutputDiv>
        </ShrinkedStatsDiv>
    )
};

export default ShrinkedStats;