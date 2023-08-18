import React from 'react';

const BuyNow = () => {
    return (
        <div className='my-10 space-y-10 px-10 pt-10 pb-16 flex flex-col items-center'>
            <div className='space-y-4 flex flex-col items-center'>
                <p className='text-2xl md:text-3xl opacity-75 font-bold'>What are you waiting for?</p>
                <p className='text-sm md:text-base opacity-60'>Our service is very safe and fast.</p>
            </div>

            <div>
                <p className='border border-dark-200 text-dark-200 text-md md:text-lg font-semibold py-2 px-5 rounded-full tracking-wide'>Buy Now</p>
            </div>
        </div>
    );
}

export default BuyNow;