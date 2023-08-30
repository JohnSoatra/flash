import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Checkout',
    description: 'check out your order with Flash.'
}

const Checkout = async () => {
    return (
        <Index />
    );
}

export default Checkout;