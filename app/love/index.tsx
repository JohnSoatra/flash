'use client';
import BestChooseProducts from '@/components/template/product/BestChoose';
import getAllcountLoveProducts from '@/utils/fetch/product/getmany/love/allcount';
import getManyLoveProducts from '@/utils/fetch/product/getmany/love/love';
import React from 'react';

const Index = () => {
    return (
        <BestChooseProducts
            label='love'
            fetchAllcount={getAllcountLoveProducts}
            fetchFunc={getManyLoveProducts}
        />
    );
}

export default Index