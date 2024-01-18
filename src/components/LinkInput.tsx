import { useRef, useState } from "react";
import styled from "styled-components";

import { LinkData } from "../types";
import { asyncHandler } from "../hooks";

interface InputDivProps {
    $is_editor_displayed: boolean
}

const LinkInputDiv = styled.div<InputDivProps>`
    display: ${(props)=>props.$is_editor_displayed ? "none" : "block"};
    position: relative;
    top: 2%;
    margin-left: 4%;
    margin-top: 4%;

    p{
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #ff000080;
        font-size: 1.5rem;
        display: block;
        text-align: center;
        margin-top: 10px;
        font-family: "Griffy", cursive;
    }
`

interface LinkInputProps {
    shrink_setter: (new_shrink: LinkData) => void,
    server_link: string,
    editor_display: boolean,
    editor_setter: (editor_display: boolean) => void,
    is_display_shrinked: (shrinked_display: boolean) => void
}

const LinkInput = ({ 
    shrink_setter, 
    server_link, 
    editor_display, 
    editor_setter, 
    is_display_shrinked 
}: LinkInputProps) => {
    const [inputError, setInputError] = useState<string>("");
    const linkInputRef = useRef<HTMLInputElement>(null);
    
    const shrinkLink: () => void = asyncHandler(async (): Promise<void> => {
        const target: string = (linkInputRef.current as HTMLInputElement).value.toString()
        .replace("\"","").replace("http://", "").replace("https://", "");
        const data: LinkData | string = await (await fetch(
            `${server_link}/api/create/${target}`, 
            { method: 'POST' }
            )).json();
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

    return (
        <LinkInputDiv $is_editor_displayed={editor_display}>
            <form action="">
                <input type="text" placeholder="Input Link to Shrink" ref={linkInputRef} onClick={() => setInputError("")}/>
                <button type="button" onClick={shrinkLink}>Submit</button>
            </form>
            {inputError !== "" ? <p>{inputError}</p> : null}
        </LinkInputDiv>
      )
};

export default LinkInput