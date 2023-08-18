import React, { useState } from 'react';

type Props = {
    children: React.ReactNode,
    content: React.ReactNode
}

const Tooltip = ({ children, content }: Props) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <div
            className="w-full h-full relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div>{children}</div>
            {
                hovered &&
                <div className="w-full h-full absolute left-1/2 bottom-full -translate-y-2 -translate-x-1/2 z-10">
                    {content}
                </div>
            }
        </div>
    );
}

export default Tooltip;