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
            <span className='opacity-60 text-sm xl:text-base'>
                Showing&nbsp;
                {
                    showing < allCount ?
                    `${showing} / ${allCount}`:
                    'all'
                }&nbsp;
                products.&nbsp;
            </span>
            {
                showing < allCount &&
                    <button
                        type="button"
                        className="text-blue-600 hover:underline font-medium rounded-full text-sm xl:text-base text-center"
                        onClick={showMore}>
                        <p>Load more</p>
                    </button>
            }
        </div>
    );
}

export default MoreProducts;