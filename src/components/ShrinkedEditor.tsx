import { Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";

import { LinkData, PersonalLinkData, StatsData } from "../types";
import * as Color from "../colors";
import asyncHandler from "../hooks/useAsyncHandler";
import { patchShrinked } from "../api";
import { updateStats } from "../hooks/useUpdateStats";
import useInputBorderToggle from "../hooks/useInputBorderToggle";

interface EditorDivProps {
    $is_displayed: boolean
    $is_input: boolean
    $input_border: string
}

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

    .error_msg{
        font-size: 1rem;
        margin-top: 0.5rem;
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
    new_shrink, 
    shrink_setter,
    editor_display,
    editor_setter, 
    is_display_shrinked,
    stats_setter
}: EditorProps): JSX.Element => {
    const [isEditorInput, setIsEditorInput] = useState<boolean>(false);
    const [editorError, setEditorError] = useState<string>("");
    const [inputBorder, setInputBorder] = useState<string>(Color.inputOutline);
    const editorInputRef = useRef<HTMLInputElement>(null);

    useInputBorderToggle(editorError, setInputBorder, Color.error, Color.inputOutline);

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