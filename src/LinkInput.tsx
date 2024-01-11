import styled, { IStyledComponent } from "styled-components";
import { FastOmit } from "styled-components/dist/types";
import { darken } from "polished";
import { useRef } from "react";

const LinkInput: () => JSX.Element = (): JSX.Element => {
    const linkInputRef = useRef<HTMLInputElement>(null);
    
    const shrinkLink: () => void = async (): Promise<void> => {
        if (linkInputRef.current !== null){
            const target: string = linkInputRef.current.value.toString().replace("\"","").replace("http://", "").replace("https://", "");
            const url: string = `https://histl.onrender.com/api/create/${target}`;
            const options = {
            method: 'POST' 
            };
            const res: Response = await fetch(url,options)
            const data = await res.json();
            console.log(data)
        }
    };

    return (
        <LinkInputDiv>
            <form action="">
                <input type="text" placeholder="Input Link to Shrink" ref={linkInputRef}/>
                <button type="button" onClick={shrinkLink}>Submit</button>
            </form>
        </LinkInputDiv>
      )
};

const LinkInputDiv: IStyledComponent<
"web", 
FastOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>
> = styled.div`
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

export default LinkInput