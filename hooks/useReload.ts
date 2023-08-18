import { ReloadReason } from "@/typings";
import { useState } from "react";

type Reload = {
    reason?: ReloadReason
}

function useReload(): {
    reloaded: Reload,
    reload: (args?: Reload) => void
} {
    const [ reloaded, setReloaded ] = useState({} as Reload);
    
    const reload = (args?: Reload) => {
        setReloaded({
            ...reloaded,
            ...(args || {})
        });
    }

    return {
        reloaded,
        reload
    }
}

export {
    useReload
}