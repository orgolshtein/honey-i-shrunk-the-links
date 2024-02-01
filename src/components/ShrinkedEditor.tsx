import { Dispatch, SetStateAction, useRef, useState } from "react";
import { darken } from "polished";
import styled from "styled-components";

import { LinkData, PersonalLinkData, StatsData } from "../types";
import asyncHandler from "../hooks/useAsyncHandler";
import { patchShrinked } from "../api";
import { updateStats } from "../hooks/useUpdateStats";
import useInputBorderToggle from "../hooks/useInputBorderToggle";

interface EditorDivProps {
    $is_displayed: boolean
    $is_input: boolean
    $input_border: string
}

const ShrinkedEditorDiv = styled.div<EditorDivProps>`
    display: ${(props)=>props.$is_displayed ? "flex" : "none"};
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
        }
    }

    p{
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #ff000080;
        font-size: 1rem;
        display: block;
        margin-top: 0.5rem;
        font-family: "Griffy", cursive;
    }

    .shrink_again{
        width: 13rem;
        height: 3rem;
        background: #3949fb4d;
        border: #548498 solid 1px;
        border-radius: 0.2rem;
        color: #548498;
        font-size: 1.1rem;
        margin-left: 25%;
        cursor: pointer;
        font-family: "Griffy", cursive;

        @media only screen and (max-width: 880px){
          height: 3rem;
          width: 20rem;
          font-size: 1.2rem;
        }
        
        &:hover{
            color: ${darken(0.5, "#548498")};
            background: ${darken(0.5, "#3949fb4d")};
        }
    }
`

interface EditorProps {
    new_shrink: LinkData,
    shrink_setter: (new_shrink: LinkData) => void,
    editor_display: boolean,
    editor_setter: (editor_display: boolean) => void,
    is_display_shrinked: (shrinked_display: boolean) => void
    stats_setter: {
        top_shrinks: Dispatch<SetStateAction<StatsData[]>>, 
        top_visited: Dispatch<SetStateAction<StatsData[]>>, 
        last_visited: Dispatch<SetStateAction<StatsData[]>>,
        selected: Dispatch<SetStateAction<PersonalLinkData>>
    }
}

const ShrinkedEditor = ({ 
    new_shrink, 
    shrink_setter,
    editor_display,
    editor_setter, 
    is_display_shrinked,
    stats_setter
}: EditorProps): JSX.Element => {
    const [isEditorInput, setIsEditorInput] = useState<boolean>(false);
    const [editorError, setEditorError] = useState<string>("");
    const editorInputRef = useRef<HTMLInputElement>(null);
    const [inputBorder, setInputBorder] = useState<string>("#3949fb4d");

    useInputBorderToggle(editorError, setInputBorder, "#ff000080", "#3949fb4d");

    const editShrinked: () => void = asyncHandler(async (): Promise<void> => {
        const edited_shrink: string = (editorInputRef.current as HTMLInputElement).value.toString();
        const data: LinkData = await patchShrinked(new_shrink, edited_shrink);
            if (typeof data !== "string"){
                shrink_setter({...data, _id: data._id.toString()}); 
                (editorInputRef.current as HTMLInputElement).value = "";
                setIsEditorInput(false);
            } else{
                setEditorError(data);
            }
    });

    const shrinkAnother: () => void = () => {
        editor_setter(false);
        setIsEditorInput(false);
        setEditorError("");
        setTimeout(()=>{
            is_display_shrinked(false)
        },0)
    };

    const toggleInput: () => void = () => {
        isEditorInput ? setIsEditorInput(false) : setIsEditorInput(true);
        setEditorError("");
    }

    return (
        <ShrinkedEditorDiv 
            $is_displayed={editor_display} 
            $is_input={isEditorInput}
            $input_border={inputBorder}
        >
            <div className="shrinked_output">
                <span onClick={
                    () => updateStats(stats_setter)
                    }>
                    <a href={new_shrink.output} target="_blank">{new_shrink.output}</a>
                </span>
                <button type="button" onClick={toggleInput}>Edit Shrinked?</button>
            </div>
            <div className={isEditorInput? "editor_input" : "editor_input_hidden"}>
                <form action="">
                    <input 
                        type="text" 
                        placeholder="Input New Shrinked" 
                        ref={editorInputRef} 
                        onClick={() => setEditorError("")}
                    />
                    <button type="button" onClick={editShrinked}>Submit</button>
                </form>
                {editorError !== "" ? <p>{editorError}</p> : null}
            </div>
            <button className="shrink_again" type="button" onClick={shrinkAnother}>Shrink Another Link?</button>
        </ShrinkedEditorDiv>
    )
};

export default ShrinkedEditor;