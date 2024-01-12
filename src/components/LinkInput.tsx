import { useRef } from "react";
import styled from "styled-components";
import { darken } from "polished";

import { LinkData } from "../types";
import { asyncHandler } from "../hooks";

const LinkInputDiv = styled.div`
    position: relative;
    top: 2%;
    margin-left: 4%;
    margin-top: 4%;

    form{
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        
        input{
            height: 60px;
            width: 500px;
            font-size: 20px;
            padding-left: 10px;
            border: #3949fb4d solid 1.5px;
            border-radius: 4px;
            color: #0310a588;
            
            &:focus{
                outline-width: 0;
            }

            &::placeholder {
                color: #3949fb4d;
                opacity: 1;
            }
        }

        button{
            width: 110px;
            height: 55px;
            background: #3949fb4d;
            border: #548498 solid 1px;
            border-radius: 3px;
            color: #548498;
            font-size: 20px;
            cursor: pointer;
            
            &:hover{
                color: ${darken(0.5, "#548498")};
                background: ${darken(0.5, "#3949fb4d")};
            }
        }
    }
`

interface LinkInputProps {
    shrink_setter: (new_shrink: LinkData) => void,
    server_link: string
}

const LinkInput = ({ shrink_setter, server_link }: LinkInputProps) => {
    const linkInputRef = useRef<HTMLInputElement>(null);
    
    const shrinkLink: () => void = asyncHandler(async (): Promise<void> => {
        const target: string = (linkInputRef.current as HTMLInputElement).value.toString()
        .replace("\"","").replace("http://", "").replace("https://", "");
        const data: LinkData = await (await fetch(
            `${server_link}/api/create/${target}`, 
            { method: 'POST' }
            )).json();
        shrink_setter({...data, _id: data._id.toString()})
    });

    return (
        <LinkInputDiv>
            <form action="">
                <input type="text" placeholder="Input Link to Shrink" ref={linkInputRef}/>
                <button type="button" onClick={shrinkLink}>Submit</button>
            </form>
        </LinkInputDiv>
      )
};

export default LinkInput