import React from 'react';

const RecentReview = () => {
    return (
        <div className='mx-10 rounded-lg my-10 space-y-10 px-10 pt-10 pb-16 bg-gray-50 border border-light-400 shadow'>
            <div className='space-y-5 flex flex-col items-center'>
                <p className='text-2xl md:text-3xl opacity-75 font-bold'>Recently Reviews</p>
                <p className='text-sm md:text-base opacity-60'>These are recently reviews of any products.</p>
            </div>

            <div className='flex flex-wrap justify-evenly gap-5 items-stretch'>
                Removed
            </div>
        </div>
    );
}

export default RecentReview;