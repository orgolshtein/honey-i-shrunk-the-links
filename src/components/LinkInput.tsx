import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { LinkData } from "../types";
import asyncHandler from "../hooks/useAsyncHandler";
import { postNewShrinked, server_link } from "../api";
import useInputBorderToggle from "../hooks/useInputBorderToggle";

interface InputDivProps {
    $is_editor_displayed: boolean
    $input_border: string
}

const LinkInputDiv = styled.div<InputDivProps>`
    display: ${(props): string => props.$is_editor_displayed ? "none" : "block"};
    position: relative;
    top: 2%;

    input{
        border: ${(props): string => props.$input_border} solid 1.5px;
    }

    p{
        position: relative;
        left: 30%;
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #ff000080;
        font-size: 1.5rem;
        display: block;
        margin-top: 0.5rem;
        font-family: "Griffy", cursive;
        padding-bottom: 3rem;
    }
`

interface LinkInputProps {
    shrink_setter: (new_shrink: LinkData) => void,
    editor_display: boolean,
    editor_setter: (editor_display: boolean) => void,
    is_display_shrinked: (shrinked_display: boolean) => void
}

const LinkInput = ({ 
    shrink_setter, 
    editor_display, 
    editor_setter, 
    is_display_shrinked 
}: LinkInputProps): JSX.Element => {
    const [inputError, setInputError] = useState<string>("");
    const linkInputRef = useRef<HTMLInputElement>(null);
    const [inputBorder, setInputBorder] = useState<string>("#3949fb4d");

    useInputBorderToggle(inputError, setInputBorder, "#ff000080", "#3949fb4d");
    
    useEffect(()=>{
        window.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.querySelector("button")?.click();
            }
        });
    }, []);
    
    const shrinkLink: () => void = asyncHandler(async (): Promise<void> => {
        const data: LinkData | string = await postNewShrinked(linkInputRef);
        if (typeof data !== "string"){
            shrink_setter({...data, _id: data._id.toString()});
            editor_setter(true);
            setTimeout(()=>{
                is_display_shrinked(true)
            }, 100)
        } else{
            shrink_setter({_id: "", output: ""});
            setInputError(data)
        };
        (linkInputRef.current as HTMLInputElement).value = "";
    });

    const shrinkLinkT: () => void = asyncHandler(async (): Promise<void> => {
        shrink_setter({_id: "", output: server_link});
        editor_setter(true);
        setTimeout(()=>{
            is_display_shrinked(true)
        }, 100);
        (linkInputRef.current as HTMLInputElement).value = "";
    });

    return (
        <LinkInputDiv $is_editor_displayed={editor_display} $input_border={inputBorder}>
            <form action="">
                <input type="text" placeholder="Input Link to Shrink" ref={linkInputRef} onClick={() => setInputError("")}/>
                <button type="button" onClick={shrinkLink}>Submit</button>
            </form>
            <p>{inputError}</p>
        </LinkInputDiv>
      )
};

export default LinkInput