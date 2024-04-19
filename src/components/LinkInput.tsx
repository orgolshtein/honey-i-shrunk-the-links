import { useEffect, useRef } from "react";
import styled from "styled-components";

import { LinkData } from "../types";
import * as Color from "../colors";
import { postNewShrinked } from "../api";
import asyncHandler from "../hooks/useAsyncHandler";
import useInputBorderToggle from "../hooks/useInputBorderToggle";

interface InputDivProps {
    $is_shrinked_output: boolean
    $input_border: string
}

interface LinkInputProps {
    set_new_shrinked: (new_shrink: LinkData) => void,
    is_shrinked_output: boolean,
    set_is_shrinked_output: (is_shrinked_output: boolean) => void,
    set_is_display_small: (is_display_small: boolean) => void
}

const LinkInputDiv = styled.div<InputDivProps>`
    display: ${(props): string => props.$is_shrinked_output ? "none" : "block"};
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
    is_shrinked_output, 
    set_is_shrinked_output, 
    set_is_display_small 
}: LinkInputProps): JSX.Element => {
    const linkInputRef = useRef<HTMLInputElement>(null);
    const linkInputSubmitRef = useRef<HTMLButtonElement>(null);
    const inputBorder = useInputBorderToggle(Color.error, Color.inputOutline);
    
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
            set_is_shrinked_output(true);
            setTimeout(():void => {
                set_is_display_small(true)
            }, 100)
        } else{
            set_new_shrinked({_id: "", output: ""});
            inputBorder.setInputError(data)
        };

                // set_new_shrinked({_id: "", output: "link_placeholder"});
                // set_is_shrinked_output(true);
                // setTimeout(()=>{
                //         set_is_display_small(true)
                //     }, 100);

        (linkInputRef.current as HTMLInputElement).value = "";
    });

    return (
        <LinkInputDiv 
        $is_shrinked_output={is_shrinked_output} 
        $input_border={inputBorder.inputBorder}
        >
            <form action="">
                <input 
                    type="text" 
                    placeholder="Input Link to Shrink" 
                    ref={linkInputRef} 
                    onClick={():void => inputBorder.setInputError("")}
                />
                <button type="button" ref={linkInputSubmitRef} onClick={shrinkLink}>Submit</button>
            </form>
            <p className="error_msg">{inputBorder.inputError}</p>
        </LinkInputDiv>
      )
};

export default LinkInput