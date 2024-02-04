import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { PersonalLinkData, StatsData } from "../types";
import * as Color from "../colors";
import asyncHandler from "../hooks/useAsyncHandler";
import { fetchSelectedStats } from "../api";
import { updateStats } from "../hooks/useUpdateStats";
import useInputBorderToggle from "../hooks/useInputBorderToggle";

interface ShrinkedStatsDivProps {
    $input_border: string
    $display_shrinked: boolean 
    $editor_display: boolean
}

interface ShrinkedStatsProps {
    selected: PersonalLinkData
    stats_setter: {
        top_shrinks: Dispatch<SetStateAction<StatsData[]>>, 
        top_visited: Dispatch<SetStateAction<StatsData[]>>, 
        last_visited: Dispatch<SetStateAction<StatsData[]>>,
        selected: Dispatch<SetStateAction<PersonalLinkData>>
    }
    editor_setter: (editor_display: boolean) => void,
    is_display_shrinked: (display_shrinked: boolean) => void
    display_shrinked: boolean
    editor_display: boolean
};

interface StatsOutputDivProps {
    $is_output_displayed: boolean
}

const ShrinkedStatsDiv = styled.div<ShrinkedStatsDivProps>`
    width: ${
        (props): string =>(props.$display_shrinked && props.$editor_display === false)? "5rem" : "46rem"
    };
    font-size: ${
        (props): string =>(props.$display_shrinked && props.$editor_display === false)? "0rem" : "1.1rem"
    };
    padding-left: ${
        (props): string =>(props.$display_shrinked && props.$editor_display === false)? "40%" : "8%"
    };
    transition: all 0.2s;

    @media only screen and (max-width: 700px){
        width: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "3rem" : "60%"
        };
        padding-left: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "40%" : "6%"
        };
    }

    @media only screen and (max-width: 600px){
        width: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "3rem" : "50%"
        };
        font-size: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "0rem" : "1.5rem"
        };
        padding-left: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "40%" : "0"
        };
    }

    p{
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    
    .shrinked_stats_msg{
        padding-left: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "40%" : "0"
        };
        text-align: ${
            (props): string =>(props.$display_shrinked && props.$editor_display === false)? "center" : "left"
        };
        transition: all 2s;

        @media only screen and (max-width: 700px){
            text-align: center;
        }
    }

    .error_msg{
        position: relative;
        left: 20%;
        margin-top: 0.5rem;

        @media only screen and (max-width: 700px){
            left: 0;
            text-align: center;
        }
    }

    span{
        font-weight: bold;
    }

    form{
        display: flex;
        flex-direction: row;
        gap: 4rem;

        @media only screen and (max-width: 700px){
            flex-direction: column;
            gap: 1rem;
        }

        input{
            width: ${
                (props): string =>
                (props.$display_shrinked && props.$editor_display === false)? "0rem" : "26rem"
            };
            height: ${
                (props): string =>
                (props.$display_shrinked && props.$editor_display === false)? "0rem" : "2.2rem"
            };
            margin-left: ${
                (props): string =>
                (props.$display_shrinked && props.$editor_display === false)? "40%" : "0"
            };
            border: ${(props): string => props.$input_border} solid 1.5px;
            transition: width 2s, margin-left 2s, height 2s;

            @media only screen and (max-width: 700px){
                height: ${
                    (props): string =>
                    (props.$display_shrinked && props.$editor_display === false)? "0rem" : "4rem"
                };
            }

            @media only screen and (max-width: 600px){
                width: ${
                    (props): string =>
                    (props.$display_shrinked && props.$editor_display === false)? "0rem" : "24rem"
                };
            }
        }
    
        button{
            width: ${
                (props): string =>
                (props.$display_shrinked && props.$editor_display === false)? "0rem" : "6rem"
            };
            height: ${
                (props): string =>
                (props.$display_shrinked && props.$editor_display === false)? "0rem" : "2rem"
            };
            font-size: ${
                (props): string =>
                (props.$display_shrinked && props.$editor_display === false)? "0.1rem" : "0.8rem"
            };
            transition: width 2s, height 2s, display 2s, font-size 2s;

            @media only screen and (max-width: 700px){
                width: ${(
                    props): string =>
                    (props.$display_shrinked && props.$editor_display === false)? "0" : "100%"
                };
                height: ${
                    (props): string =>
                    (props.$display_shrinked && props.$editor_display === false)? "0rem" : "4rem"
                };
                font-size: ${
                    (props): string =>
                    (props.$display_shrinked && props.$editor_display === false)? "0.1rem" : "1.5rem"
                };
            }
        }
    }
    
`

const StatsOutputDiv = styled.div<StatsOutputDivProps>`
    @media only screen and (max-width: 700px){
        text-align: center;
    }
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
    is_display_shrinked,
    display_shrinked,
    editor_display
}: ShrinkedStatsProps): JSX.Element => {
    const [isShrinkedOutput, setIsShrinkedOutput] = useState<boolean>(false);
    const [shrinkedDataError, setShrinkedDataError] = useState<string>("");
    const [outputButton, setOutputButton] = useState<string>("Show");
    const [inputBorder, setInputBorder] = useState<string>(Color.inputOutline);
    const ShrinkedStatsInputRef = useRef<HTMLInputElement>(null);

    useInputBorderToggle(shrinkedDataError, setInputBorder, Color.error, Color.inputOutline);

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
        <ShrinkedStatsDiv 
            $input_border={inputBorder} 
            $display_shrinked={display_shrinked} 
            $editor_display={editor_display}
        >
            <div className="shrinked_stats_msg">
                <p>Do you want information on <span>your</span> Shrinked Link?</p>
                <p>No problem! Simply paste the link below and click "Show".</p>
            </div>
            <form>
                <input 
                    type="text" 
                    placeholder="Input Shrinked Link" 
                    ref={ShrinkedStatsInputRef} 
                    onClick={() => {
                        setShrinkedDataError("");
                        setIsShrinkedOutput(false);
                        }}
                />
                <button type="button" onClick={
                    isShrinkedOutput ? 
                    ()=>setIsShrinkedOutput(false) : 
                    showLinkStats
                    }>{outputButton}</button>
            </form>
            <p className="error_msg">{shrinkedDataError}</p>
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