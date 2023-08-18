import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Checkout | Success',
    description: 'Your checkout is successfully.'
}

const Success = () => {
    return <Index />;
}

export default Success;