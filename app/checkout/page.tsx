import { Metadata } from 'next';
import React from 'react';
import Index from './index';
import getOneCard from '@/utils/fetch/card/getone';
import Empty from './empty';

export const metadata: Metadata = {
    title: 'Flash | Checkout',
    description: 'check out your order with Flash.'
}

const Checkout = async () => {
    const card = await getOneCard({
        
    });

    if (!card) {
        return <Empty />
    }

    return <Index card={card} />;
}

export default Checkout;