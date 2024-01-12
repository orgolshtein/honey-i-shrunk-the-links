import { useRef } from "react";
import { LinkData } from "../types";
import { asyncHandler } from "../hooks";
import { darken } from "polished";
import styled from "styled-components";

const ShrinkedEditorDiv = styled.div`
    position: relative;
    top: 2%;
    margin-left: 4%;
    margin-top: 4%;

    a{
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #29318cb2;
        font-size: 1.5rem;
        display: block;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-family: "Griffy", cursive;
        text-decoration: underline;
    }

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

interface EditorProps {
    new_shrink: LinkData,
    shrink_setter: (new_shrink: LinkData) => void,
    server_link: string
}

const ShrinkedEditor = ({ new_shrink, shrink_setter, server_link }: EditorProps) => {
    const editorInputRef = useRef<HTMLInputElement>(null);

    const editShrinked: () => void = asyncHandler(async (): Promise<void> => {
        const edited_shrink: string = (editorInputRef.current as HTMLInputElement).value.toString();
        const data: LinkData = await (await fetch(
            `${server_link}/api/edit/${new_shrink._id}`, 
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    new_link: edited_shrink
                })
            }
            )).json();
            data.output? shrink_setter({...data, _id: data._id.toString()}) : null
    })

    return (
        <ShrinkedEditorDiv>
            <a href={new_shrink.output}>{new_shrink.output}</a>
            <form action="">
                <input type="text" placeholder="Edit Shrinked" ref={editorInputRef}/>
                <button type="button" onClick={editShrinked}>Submit</button>
            </form>
        </ShrinkedEditorDiv>
    )
};

export default ShrinkedEditor;