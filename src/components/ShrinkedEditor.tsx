import { useRef, useState } from "react";
import styled from "styled-components";

import { LinkData, PersonalLinkData, StatsData } from "../types";
import * as Color from "../colors";
import { patchShrinked } from "../api";
import asyncHandler from "../hooks/useAsyncHandler";
import updateStats from "../hooks/useUpdateStats";
import inputBorderToggle from "../hooks/useInputBorderToggle";

interface EditorDivProps {
    $is_displayed: boolean
    $input_border: string
}

interface EditorProps {
    new_shrinked: LinkData,
    set_new_shrinked: (new_shrinked: LinkData) => void,
    is_editor_displayed: boolean,
    set_is_editor_displayed: (is_editor_displayed: boolean) => void,
    set_is_display_shrinked: (is_display_shrinked: boolean) => void
    stats_setters: {
        set_top_shrinks: (top_shrinks: StatsData[]) => void,
        set_top_visited: (top_visited: StatsData[]) => void,
        set_last_visited: (last_visited: StatsData[]) => void,
        set_selected: (selected: PersonalLinkData) => void
    }
}

const ShrinkedEditorDiv = styled.div<EditorDivProps>`
    display: ${(props): string => props.$is_displayed ? "flex" : "none"};
    flex-direction: column;
    gap: 1rem;

    .editor_input{
        display: block;
        padding-left: 25%;
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

        input {
            border: ${(props): string => props.$input_border} solid 1.5px;
            font-size: 0.8rem;

            @media only screen and (max-width: 880px){
                font-size: 1.2rem;
            }
        }
    }

    .editor_input_hidden{
        display: none;
        padding-left: 25%;
        opacity: 0.9;
        animation: slide-up 200ms;
        @keyframes slide-up {
            from { 
                display: block; 
            }
            to { 
                transform: translateY(-10%); opacity: 0;
            }
        }

        input {
            border: ${(props): string => props.$input_border} solid 1.5px;
            font-size: 0.8rem;

            @media only screen and (max-width: 880px){
                font-size: 1.2rem;
            }
        }
    }

    .error_msg{
        font-size: 1rem;
        margin-top: 0.5rem;

        @media only screen and (max-width: 880px){
            position: relative;
            left: 18%;
        }
    }

    .shrink_again{
        width: 13rem;
        height: 3rem;
        font-size: 1.1rem;
        margin-left: 25%;
        transition: width 1s, height 1s, font-size 1s;

        @media only screen and (max-width: 880px){
          height: 3rem;
          width: 20rem;
          font-size: 1.2rem;
        }
    }
`

const ShrinkedEditor = ({ 
    new_shrinked, 
    set_new_shrinked,
    is_editor_displayed,
    set_is_editor_displayed, 
    set_is_display_shrinked,
    stats_setters
}: EditorProps): JSX.Element => {
    const [isEditorInput, setIsEditorInput] = useState<boolean>(false);
    const [editorError, setEditorError] = useState<string>("");
    const [inputBorder, setInputBorder] = useState<string>(Color.inputOutline);
    const editorInputRef = useRef<HTMLInputElement>(null);

    inputBorderToggle(editorError, setInputBorder, Color.error, Color.inputOutline);

    const editShrinked: () => void = asyncHandler(async (): Promise<void> => {
        const edited_shrink: string = (editorInputRef.current as HTMLInputElement).value.toString();
        const data: LinkData = await patchShrinked(new_shrinked, edited_shrink);
            if (typeof data !== "string"){
                set_new_shrinked({...data, _id: data._id.toString()}); 
                (editorInputRef.current as HTMLInputElement).value = "";
                setIsEditorInput(false);
            } else{
                setEditorError(data);
            }
    });

    const shrinkAnother = (): void => {
        set_is_editor_displayed(false);
        setIsEditorInput(false);
        setEditorError("");
        setTimeout(():void =>{
            set_is_display_shrinked(false)
        },0)
    };

    const toggleInput = (): void => {
        isEditorInput ? setIsEditorInput(false) : setIsEditorInput(true);
        setEditorError("");
    }

    return (
        <ShrinkedEditorDiv 
            $is_displayed={is_editor_displayed} 
            $input_border={inputBorder}
        >
            <div className="shrinked_output">
                <span onClick={
                    ():void => updateStats(stats_setters)
                    }>
                    <a href={new_shrinked.output} target="_blank">{new_shrinked.output}</a>
                </span>
                <button type="button" onClick={toggleInput}>Edit Shrinked?</button>
            </div>
            <div className={isEditorInput? "editor_input" : "editor_input_hidden"}>
                <form action="">
                    <input 
                        type="text" 
                        placeholder="Input New Shrinked" 
                        ref={editorInputRef} 
                        onClick={():void => setEditorError("")}
                    />
                    <button type="button" onClick={editShrinked}>Submit</button>
                </form>
                {editorError !== "" ? <p className="error_msg">{editorError}</p> : null}
            </div>
            <button 
                className="shrink_again" 
                type="button" 
                onClick={shrinkAnother}
            >Shrink Another Link?</button>
        </ShrinkedEditorDiv>
    )
};

export default ShrinkedEditor;