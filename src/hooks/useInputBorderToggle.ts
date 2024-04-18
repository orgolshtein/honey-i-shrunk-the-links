import { useEffect, useState } from "react";

const useInputBorderToggle = (
    inputBorderError: string, 
    inputBorderColor: string
): { inputError: string; inputBorder: string; setInputError: (inputBorder: string) => void; } => {
    const [inputError, setInputError] = useState<string>("");
    const [inputBorder, setInputBorder] = useState<string>(inputBorderColor);

    useEffect((): void =>{
        inputError.length > 0 ? setInputBorder(inputBorderError) : setInputBorder(inputBorderColor)
    }, [inputError]);

    return { inputError, inputBorder, setInputError }
};

export default useInputBorderToggle;