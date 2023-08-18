'use client';
import React, { useState } from 'react';
import ProductList from '@/components/template/home/ProductList';
import {useFetch} from '@/hooks/useFetch';
import { BestChoiceProducts, ProductX, ReleasedAt } from '@/typings';
import getManyPopularProducts from '@/utils/fetch/product/getmany/popular/popular';
import getManyToprateProducts from '@/utils/fetch/product/getmany/toprate/toprate';
import getManyNewProducts from '@/utils/fetch/product/getmany/new/new';
import Link from 'next/link';
import ROUTE from '@/constants/route';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

type TabProp = {
    label: string,
    fetchFunc: (args: BestChoiceProducts) => Promise<ProductX[]>,
    args: {
        skip?: number,
        limit?: number
        releasedAt?: ReleasedAt
    },
    link: string,
}

const Tabs: TabProp[] = [
    {
        label: 'New',
        fetchFunc: getManyNewProducts,
        args: {
            limit: 6
        },
        link: ROUTE.PRODUCT_NEW
    },
    {
        label: 'Top',
        fetchFunc: getManyToprateProducts,
        args: {
            limit: 6
        },
        link: ROUTE.PRODUCT_TOPRATE
    },
    {
        label: 'Popular',
        fetchFunc: getManyPopularProducts,
        args: {
            limit: 6
        },
        link: ROUTE.PRODUCT_POPULAR
    },
];

const Class = {
    ButtonDiv: (active: boolean) => `
        p-5 py-2 hover:bg-dark-200 flex items-center justify-center
        rounded-lg border transition
        hover:text-white
        ${
            active ?
            'bg-dark-200 border-dark-200 text-white':
            'bg-white border-light-400 text-darkmain/75'
        }
    `
}

const TabProducts = () => {
    const [ activeIndex, setActiveIndex ] = useState(0);

    const {result: products} = useFetch({
        func: Tabs[activeIndex].fetchFunc,
        args: {
            skip: Tabs[activeIndex].args.skip,
            limit: Tabs[activeIndex].args.limit
        }
    });

    if (products === undefined) {
        return <p>loading...</p>;
    }

    if (products === null) {
        return null;
    }

    return (
        <div className='p-10 space-y-10'>
            <div className='w-fit flex gap-5 m-auto'>
                {
                    Tabs.map((btn, index) =>
                        <button
                            key={index}
                            className={Class.ButtonDiv(activeIndex === index)}
                            onClick={() => setActiveIndex(index)}>
                            <p className={'font-semibold'}>{btn.label}</p>
                        </button>
                    )
                }
            </div>

            <section className='w-full space-y-5'>
                <ProductList
                    products={products}
                    showFavorite={false}
                />

                <div className='w-full flex justify-center'>
                    <Link
                        href={Tabs[activeIndex].link}
                        className={'w-fit h-fit rounded-full flex items-center justify-center px-4 py-2 md:px-5 md:py-2.5 bg-dark-200 transition duration-100 hover:scale-105'}>
                        <p className='text-white'>More</p>
                        <ChevronRightIcon  className={'text-white w-4 h-4 md:w-6 md:h-6 stroke-1 stroke-white'} />
                    </Link>
                </div>

            </section>
        </div>
    );
}

export default TabProducts