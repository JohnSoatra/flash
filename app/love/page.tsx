import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Loved Products',
    description: 'Loved Products'
}

const Love = () => {
    return (
        <Index />
    );
}

export default Love;