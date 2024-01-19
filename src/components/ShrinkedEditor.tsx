import { useRef, useState } from "react";
import { LinkData } from "../types";
import { asyncHandler } from "../hooks";
import { darken } from "polished";
import styled from "styled-components";

interface EditorDivProps {
    $is_displayed: boolean,
    $is_input: boolean
}

const ShrinkedEditorDiv = styled.div<EditorDivProps>`
    display: ${(props)=>props.$is_displayed ? "block" : "none"};
    position: relative;
    top: 2%;
    margin-left: 30%;
    margin-top: 4%;

    .editor_input{
        display: ${(props)=>props.$is_input ? "block" : "none"};
    }

    p{
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #ff000080;
        font-size: 1rem;
        display: block;
        margin-top: 10px;
        font-family: "Griffy", cursive;
    }

    .shrink_again{
        width: 180px;
        height: 40px;
        background: #3949fb4d;
        border: #548498 solid 1px;
        border-radius: 3px;
        color: #548498;
        font-size: 15px;
        cursor: pointer;
        margin-top: 15px;
        margin-left: 10px;
        font-family: "Griffy", cursive;
        
        &:hover{
            color: ${darken(0.5, "#548498")};
            background: ${darken(0.5, "#3949fb4d")};
        }
    }
`

interface EditorProps {
    new_shrink: LinkData,
    shrink_setter: (new_shrink: LinkData) => void,
    server_link: string,
    editor_display: boolean,
    editor_setter: (editor_display: boolean) => void,
    is_display_shrinked: (shrinked_display: boolean) => void
}

const ShrinkedEditor = ({ 
    new_shrink, 
    shrink_setter, 
    server_link, 
    editor_display,
    editor_setter, 
    is_display_shrinked
}: EditorProps): JSX.Element => {
    const [isEditorInput, setIsEditorInput] = useState<boolean>(false);
    const [editorError, setEditorError] = useState<string>("");
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
        setTimeout(()=>{
            is_display_shrinked(false)
        },100)
    };

    const toggleInput: () => void = () => {
        isEditorInput ? setIsEditorInput(false) : setIsEditorInput(true);
    }

    return (
        <ShrinkedEditorDiv $is_displayed={editor_display} $is_input={isEditorInput}>
            <div className="shrinked_output">
                <a href={new_shrink.output} target="_blank">{new_shrink.output}</a>
                <button type="button" onClick={toggleInput}>Edit Shrinked?</button>
            </div>
            <div className="editor_input">
                <form action="">
                    <input type="text" placeholder="Input New Shrinked" ref={editorInputRef} onClick={() => setEditorError("")}/>
                    <button type="button" onClick={editShrinked}>Submit</button>
                </form>
                {editorError !== "" ? <p>{editorError}</p> : null}
            </div>
            <button className="shrink_again" type="button" onClick={shrinkAnother}>Shrink Another Link?</button>
        </ShrinkedEditorDiv>
    )
};

export default ShrinkedEditor;