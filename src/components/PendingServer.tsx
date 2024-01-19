import { FC } from "react";
import styled from "styled-components";
import Textra from 'react-textra';

const PendingServerDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    div{
        color: #29318c56;
        font-size: 2rem;
        display: block;
        margin-top: 50px;
        margin-bottom: 80px;
        font-weight: bold;
        font-family: "Griffy", cursive;
    }
`

const PendingServer: FC = (): JSX.Element => {
    return (
        <PendingServerDiv>
            <div>
                <Textra effect='scale' data={[
                    "Hello,",
                    "Welcome!",
                    "I'll be honest",
                    "Because I'm running a free web service",
                    "It falls asleep quite often",
                    "Please allow a minute for it to wake up",
                    "While you wait,",
                    "Feel free to browse through my portfolio",
                    "And I am guessing that's how you got here",
                    "But anyway the address is below",
                    "Along with my GitHub",
                    "Thank you!"
                    ]} 
                />
            </div>
        </PendingServerDiv>
    )
};

export default PendingServer;