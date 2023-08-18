import React from 'react';

type Props = {
    activeIndex: number,
    length: number
}

const Range = ({ activeIndex, length }: Props) => {
    return (
        <div className='select-none'>
            <p className='text-sm opacity-50'>{activeIndex + 1}/{length}</p>
        </div>
    )
}

export default Range;