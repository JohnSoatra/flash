'use client';
import React from 'react';

const Landing = () => {
    return (
        <section className={`relative min-h-[10rem] md:min-h-[13rem] w-full p-10 md:p-20`}>

            <div className='absolute w-full h-full flex items-center justify-center top-0 left-0'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <p className='AnimateText font-bold text-6xl md:text-7xl opacity-80'>Flash</p>
                    <p className='font-semibold opacity-75 AnimateText'>Take from me, what you want.</p>
                </div>
            </div>

        </section>
    );
}

export default Landing;