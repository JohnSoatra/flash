import { Metadata } from 'next';
import React from 'react';
import Index from './index';
import getManyOrders from '@/utils/fetch/order/getmany';

export const metadata: Metadata = {
    title: 'Flash | Shipping',
    description: 'Product shipping page'
}

const Shipping = async () => {
    const orders = await getManyOrders({
        signal: null,
        query: {}
    });

    return (
        <Index orders={orders} />
    )
}

export default Shipping;