'use client';
import ProductList from '@/components/template/home/ProductList';
import { useFetchLazy } from '@/hooks/useFetch';
import { BestChoiceProducts, GetAllcount, ProductX } from '@/typings';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import LoadingMoreProducts from '../search/Loading';
import MoreProducts from './More';
import { useReload } from '@/hooks/useReload';

const Class = {
    Wrapper: 'w-screen h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] flex justify-center',
    Wrapper_Inner: 'flex items-end justify-center h-full max-h-[13rem] py-5'
}

type Props = {
    label: string,
    fetchAllcount: (args: GetAllcount) => Promise<number>,
    fetchFunc: (args: BestChoiceProducts) => Promise<ProductX[]>
}

type Range = {
    skip: number,
    skipped: number[],
}

const BestChooseProducts = ({ fetchFunc, fetchAllcount, label }: Props) => {
    const { reloaded, reload } = useReload();
    const [ products, setProducts ] = useState(undefined as ProductX[]|undefined);
    const range: MutableRefObject<Range> = useRef({
        skip: 0,
        skipped: [0]
    });
    
    const { result: allCount, fetching: fetchingAllCount } = useFetchLazy({
        func: fetchAllcount,
        args: {
            query: {}
        }
    });
    const { result: partedProducts, refetch: refetchProducts, fetching: fetchingProducts } = useFetchLazy({
        func: fetchFunc,
        args: {
            query: {
                skip: range.current.skip
            }
        }
    });

    const showMore = () => {
        range.current.skip = products ? (products.length) : 0;

        reload({
            reason: 'Increase skip'
        });
    }

    useEffect(() => {
        if (partedProducts) {
            const currentRage = range.current;

            if (currentRage.skip === 0) {
                setProducts([...partedProducts]);
            } else  {
                if (!currentRage.skipped.includes(currentRage.skip)) {
                    currentRage.skipped.push(currentRage.skip);
                    setProducts([...(products || []), ...partedProducts]);
                }
            }
        }
    }, [partedProducts]);

    useEffect(() => {
        switch(reloaded.reason) {
            case 'Increase skip': 
                refetchProducts();
                break;
        }
    }, [reloaded]);

    if (allCount === null || partedProducts === null) {
        return null;
    }

    if (
        fetchingAllCount ||
        products === undefined ||
        allCount === undefined
    ) {
        return (
            <div className={Class.Wrapper}>
                <div className={Class.Wrapper_Inner}>
                    <p className='text-xl md:text-2xl font-medium opacity-75 tracking-wide animate-pulse'>
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (allCount === 0) {
        return (
            <div className={Class.Wrapper}>
                <div className={Class.Wrapper_Inner}>
                    <p className='text-xl md:text-2xl font-medium tracking-wide opacity-75'>No Products Found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='px-5 md:px-10 mx-auto max-w-6xl'>
            <div className='mt-2.5 mb-4'>
                <p className='text-sm  md:text-base font-normal'>
                    <span className='opacity-60'>There are&nbsp;</span>
                    <span className='opacity-75'>{allCount} {label} products.</span>
                </p>
            </div>

            <ProductList
                products={products}
                showLove={true}
            />

            {
                fetchingProducts ?
                 <LoadingMoreProducts /> :
                <MoreProducts
                    allCount={allCount}
                    showing={products.length}
                    showMore={showMore}
                />
            }

        </div>
    );
}

export default BestChooseProducts;