import React from "react";
import Index from "./Index";
import Initializer from "./Initializer";

const Composer = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Initializer />
            <Index>
                {children}
            </Index>
        </>
    )
}

export default Composer;