import React from 'react';

type Props = {
    wrapped: boolean,
    wrapper: React.ElementType<{ content: React.ReactNode }>,
    content: React.ReactNode
}

const Wrapper = ({
    wrapped,
    wrapper: _Wrapper,
    content
}: Props) => {
    return (
        wrapped ?
            <_Wrapper content={content} />:
            <>{content}</>

    );
}

export default Wrapper;