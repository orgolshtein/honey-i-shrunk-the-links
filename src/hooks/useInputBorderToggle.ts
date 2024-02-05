import { useEffect } from "react";

const inputBorderToggle = (
    msg: string, 
    border_setter: (border_color: string) => void, 
    border_color_err: string, 
    border_color: string
): void => {
    useEffect((): void =>{
        msg.length > 0 ? border_setter(border_color_err) : border_setter(border_color)
    }, [msg]);
};

export default inputBorderToggle;