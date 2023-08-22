import initializeJob from "@/utils/compose/initialize";
import Index from "./Index";

const Composer = async ({ children }: { children: React.ReactNode }) => {
    await initializeJob();

    return (
        <Index>
            {children}
        </Index>
    )
}

export default Composer;