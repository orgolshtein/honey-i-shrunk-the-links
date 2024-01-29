import { darken } from "polished";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PersonalLinkData, StatsData } from "../types";
import asyncHandler from "../hooks/useAsyncHandler";
import { fetchSelectedStats } from "../api";
import { updateStats } from "../hooks/useUpdateStats";

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
    selected: PersonalLinkData
    stats_setter: {
        top_shrinks: Dispatch<SetStateAction<StatsData[]>>, 
        top_visited: Dispatch<SetStateAction<StatsData[]>>, 
        last_visited: Dispatch<SetStateAction<StatsData[]>>,
        selected: Dispatch<SetStateAction<PersonalLinkData>>
    }
    editor_setter: (editor_display: boolean) => void,
    is_display_shrinked: (shrinked_display: boolean) => void
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
    selected,
    stats_setter,
    editor_setter,
    is_display_shrinked
}: ShrinkedStatsProps): JSX.Element => {
    const [isShrinkedOutput, setIsShrinkedOutput] = useState<boolean>(false);
    const [shrinkedDataError, setShrinkedDataError] = useState<string>("");
    const [outputButton, setOutputButton] = useState<string>("Show");
    const ShrinkedStatsInputRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        isShrinkedOutput?
        setOutputButton("Close") :
        setOutputButton("Show")
    }, [isShrinkedOutput])

    const showLinkStats: () => void = asyncHandler(async (): Promise<void> => {
        setShrinkedDataError("");
        is_display_shrinked(false);
        editor_setter(false);
        const data: PersonalLinkData | string = await fetchSelectedStats(ShrinkedStatsInputRef);
        if (typeof data !== "string"){
            stats_setter.selected({...data})
            setIsShrinkedOutput(true);
        } else {
            stats_setter.selected({
                target: "",
                link: "",
                visits: 0,
                last_visit: ""
            });
            setShrinkedDataError(data)
        }
    });
    
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
                        Your shrinked link, <span onClick={
                    () => updateStats(stats_setter, ShrinkedStatsInputRef)
                    }>
                        <a href={selected.link} target="_blank">{selected.link}</a>
                        </span>,
                        </p>
                    <p>is directed to <span>{
                    selected.target.length > 45 ? 
                    selected.target.substring(0,43) + "..." : 
                    selected.target
                    }</span></p>
                    {
                    selected.visits === 0 ?
                    <p>and sadly had no visits yet</p> :
                    selected.visits === 1 ?
                    <p>and was visited <span>once</span>, with the visit being on</p> :
                    <p>and was visited <span>{selected.visits}</span> times,
                    with the recent visit being on</p>
                    }
                    {
                        selected.visits > 0 ?
                        <p><span>{selected.last_visit}</span></p> : null
                    }
                </div>
            </StatsOutputDiv>
        </ShrinkedStatsDiv>
    )
};

export default ShrinkedStats;