import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Top-rated Product',
    description: 'Top-rated Products'
}

const ProductToprate = () => {
    return (
        <Index />
    );
}

export default ProductToprate;