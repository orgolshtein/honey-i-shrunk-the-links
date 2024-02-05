import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { LinkData } from "../types";
import * as Color from "../colors";
import { postNewShrinked } from "../api";
import asyncHandler from "../hooks/useAsyncHandler";
import inputBorderToggle from "../hooks/useInputBorderToggle";

interface InputDivProps {
    $is_editor_displayed: boolean
    $input_border: string
}

interface LinkInputProps {
    set_new_shrinked: (new_shrink: LinkData) => void,
    is_editor_displayed: boolean,
    set_is_editor_displayed: (is_editor_displayed: boolean) => void,
    set_is_display_shrinked: (is_display_shrinked: boolean) => void
}

const LinkInputDiv = styled.div<InputDivProps>`
    display: ${(props): string => props.$is_editor_displayed ? "none" : "block"};
    position: relative;
    top: 2%;

    input{
        font-size: 0.8rem;
        border: ${(props): string => props.$input_border} solid 1.5px;
    }

    .error_msg{
        position: relative;
        left: 30%;
        font-size: 1.5rem;
        margin-top: 0.5rem;
        padding-bottom: 3rem;

        @media only screen and (max-width: 880px){
            left: 0;
            text-align: center;
        }
    }
`

const LinkInput = ({ 
    set_new_shrinked, 
    is_editor_displayed, 
    set_is_editor_displayed, 
    set_is_display_shrinked 
}: LinkInputProps): JSX.Element => {
    const [inputError, setInputError] = useState<string>("");
    const [inputBorder, setInputBorder] = useState<string>(Color.inputOutline);
    const linkInputRef = useRef<HTMLInputElement>(null);
    const linkInputSubmitRef = useRef<HTMLButtonElement>(null);

    inputBorderToggle(inputError, setInputBorder, Color.error, Color.inputOutline);
    
    useEffect((): void => {
        window.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                (linkInputSubmitRef.current as HTMLButtonElement).click();
            }
        });
    }, []);
    
    const shrinkLink: () => void = asyncHandler(async (): Promise<void> => {
        const data: LinkData | string = await postNewShrinked(linkInputRef);
        if (typeof data !== "string"){
            set_new_shrinked({...data, _id: data._id.toString()});
            set_is_editor_displayed(true);
            setTimeout(():void => {
                set_is_display_shrinked(true)
            }, 100)
        } else{
            set_new_shrinked({_id: "", output: ""});
            setInputError(data)
        };

                // set_new_shrinked({_id: "", output: "link_placeholder"});
                // set_is_editor_displayed(true);
                // setTimeout(()=>{
                //         set_is_display_shrinked(true)
                //     }, 100);

        (linkInputRef.current as HTMLInputElement).value = "";
    });

    return (
        <LinkInputDiv 
        $is_editor_displayed={is_editor_displayed} 
        $input_border={inputBorder}
        >
            <form action="">
                <input 
                    type="text" 
                    placeholder="Input Link to Shrink" 
                    ref={linkInputRef} 
                    onClick={():void => setInputError("")}
                />
                <button type="button" ref={linkInputSubmitRef} onClick={shrinkLink}>Submit</button>
            </form>
            <p className="error_msg">{inputError}</p>
        </LinkInputDiv>
      )
};

export default LinkInput