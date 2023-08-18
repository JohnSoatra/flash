import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | New Product',
    description: 'New Added Products'
}

const ProductPopular = () => {
    return (
        <Index />
    );
}

export default ProductPopular;