import React from "react";

function keyEffect(evt: React.KeyboardEvent): boolean {
    return !(
        evt.ctrlKey ||
        evt.metaKey || 
        evt.altKey || 
        evt.shiftKey ||
        evt.key.startsWith("Arrow")
    );
}

export default keyEffect;