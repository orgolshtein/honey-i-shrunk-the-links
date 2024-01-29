import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Textra from 'react-textra';

const ServerErrorDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    div{
        text-shadow: 2px 2px 0px rgba(71, 0, 37, 0.2);
        color: #ff000071;
        font-size: 2rem;
        display: block;
        margin-top: 50px;
        margin-bottom: 80px;
        font-weight: bold;
        font-family: "Griffy", cursive;
        text-align: center;
    }
`

const ServerError: FC = (): JSX.Element => {
    const [isAnimated, setisAnimated] = useState<boolean>(true);

    useEffect(()=>{
        setTimeout(()=> setisAnimated(false), 10000)
    }, []);

    return (
        <ServerErrorDiv>
            {
                isAnimated ?
                <div>
                    <Textra duration={100} stopDuration={300} effect='scale' data={[
                        "S",
                        "Se",
                        "Ser",
                        "Serv",
                        "Serve",
                        "Server",
                        "Server i",
                        "Server is",
                        "Server is d",
                        "Server is do",
                        "Server is dow",
                        "Server is down",
                        "Server is down.",
                        "Server is down..",
                        "Server is down...",
                        "Server is down... S",
                        "Server is down... So",
                        "Server is down... Sor",
                        "Server is down... Sorr",
                        "Server is down... Sorry",
                        "Server is down... Sorry"
                        ]} 
                    />
                </div>
                :
                <div>Server is down... Sorry</div>
            }
        </ServerErrorDiv>
    )
};

export default ServerError;