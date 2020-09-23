import {useState, useEffect} from "react";

export const useDimensions = () => {
    const [pH, setPH] = useState(Math.floor(window.innerHeight / 100));
    const [pW, setPW] = useState(Math.floor(window.innerWidth / 100));

    const listener = () => {
        setPH(Math.floor(window.innerHeight / 100));
        setPW(Math.floor(window.innerWidth / 100));
    };

    useEffect(() => {
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);

    return [pH, pW];
};

