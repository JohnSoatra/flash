import React from 'react';

type Props = {
    showing: number,
    allCount: number,
    showMore: () => void
}

const MoreProducts = ({ 
    showing,
    allCount,
    showMore
}: Props) => {
    return (
        <div className='flex items-center justify-end py-10'>
            <p className='text-sm xl:text-base'>
                <span className='opacity-60'>Showing&nbsp;</span>
                <span className='opacity-75'>
                    {
                        showing < allCount ?
                        `${showing} / ${allCount}`:
                        'all'
                    }&nbsp;
                </span>
                <span className='opacity-60'>products.</span>
            </p>&nbsp;
            {
                showing < allCount &&
                    <button
                        type="button"
                        className="text-blue-600 hover:underline font-medium rounded-full text-sm xl:text-base text-center"
                        onClick={showMore}>
                        <p>Show more</p>
                    </button>
            }
        </div>
    );
}

export default MoreProducts;