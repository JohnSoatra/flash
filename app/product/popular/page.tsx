import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Popular Product',
    description: 'Popular Products'
}

const ProductPopular = () => {
    return (
        <Index />
    );
}

export default ProductPopular;