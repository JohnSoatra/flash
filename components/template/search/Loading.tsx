import React from 'react';

const LoadingMoreProducts = () => {
    return (
        <div className='w-full h-14 md:h-20 lg:h-28 flex justify-center items-center'>
            <p className='text-lg md:text-xl lg:text-2xl font-medium opacity-75 tracking-wide animate-pulse'>
                Loading more...
            </p>
        </div>
    );
}

export default LoadingMoreProducts;