import Index from "./Index";
import Initializer from "./Initializer";

const Composer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Initializer />
            {children}
        </div>
        // <Index>
        //     {children}
        // </Index>
    )
}

export default Composer;