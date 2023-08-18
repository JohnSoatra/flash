'use client';
import React from 'react';
import BestChooseProducts from '@/components/template/product/BestChoose';
import getManyPopularProducts from '@/utils/fetch/product/getmany/popular/popular';
import getAllcountPopularProducts from '@/utils/fetch/product/getmany/popular/allcount';

const Index = () => {
    return (
        <BestChooseProducts
            label='popular'
            fetchAllcount={getAllcountPopularProducts}
            fetchFunc={getManyPopularProducts}
        />
    );
}

export default Index;