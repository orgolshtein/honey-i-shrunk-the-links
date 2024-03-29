import { FC } from "react";
import styled from "styled-components";
import Textra from "react-textra";

import * as Color from "../colors";

const PendingServerDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 15rem;

    div{
        color: ${Color.subHeader};
        font-size: 2rem;
        display: block;
        font-weight: bold;

        @media only screen and (max-width: 700px){
            text-align: center;
        }
    }
`

const PendingServer: FC = (): JSX.Element => (
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
                    "Thank you!",
                    "",
                    "This is actually taking a long time...",
                    "Hmmm...",
                    "Have you seen UnagiBet?",
                    "It is a ReactJS Front-End project",
                    "You can go see it through my portfolio",
                    "There is also a nice ID Validator project",
                    "In multiple languages",
                    "Also, in my GitHub",
                    "You can see the code for this sleeping server",
                    "But whatever you choose, please open in another tab",
                    "I still want you here as well",
                    "And the server will eventually wake up",
                    "Wait for it...",
                    "Any second now...",
                    "",
                    "If all else fails...",
                    "Try refreshing",
                    "Sorry about this",
                    "",
                    "",
                    "Still haven't refreshed?",
                    "Why?",
                    "",
                    "",
                    "Look, if it hasn't happened by now,",
                    "Something must've gotten stuck",
                    "Please refresh",
                    "",
                    "",
                    "I don't know what else to say",
                    "Let's start over..."
                    ]} 
                />
            </div>
        </PendingServerDiv>
    );

export default PendingServer;