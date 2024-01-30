import { useEffect } from "react";

export default function useInputBorderToggle(
    msg: string, 
    bordersetter: (border: string) => void, 
    bordererr: string, 
    border: string
    ) {
    useEffect((): void =>{
        msg.length > 0 ?
        bordersetter(bordererr) :
        bordersetter(border)
    }, [msg]);
};
