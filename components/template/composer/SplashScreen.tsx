import React from 'react';
import Spinner from '../spinner/Spinner';

const SplashScreen = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-10 h-10'>
                <Spinner />
            </div>
        </div>
    );
}

export default SplashScreen;