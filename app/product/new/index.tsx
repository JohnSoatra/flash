'use client';
import React from 'react';
import BestChooseProducts from '@/components/template/product/BestChoose';
import getManyNewProducts from '@/utils/fetch/product/getmany/new/new';
import getAllcountNewProducts from '@/utils/fetch/product/getmany/new/allcount';

const Index = () => {
    return (
        <BestChooseProducts
            label='new'
            fetchAllcount={getAllcountNewProducts}
            fetchFunc={getManyNewProducts}
        />
    );
}

export default Index;