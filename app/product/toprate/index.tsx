'use client';
import React from 'react';
import BestChooseProducts from '@/components/template/product/BestChoose';
import getManyToprateProducts from '@/utils/fetch/product/getmany/toprate/toprate';
import getAllcountToprateProducts from '@/utils/fetch/product/getmany/toprate/allcount';

const Index = () => {
    return (
        <BestChooseProducts
            label='top-rated'
            fetchAllcount={getAllcountToprateProducts}
            fetchFunc={getManyToprateProducts}
        />
    )
}

export default Index;