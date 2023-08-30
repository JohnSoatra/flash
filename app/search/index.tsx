'use client';
import ProductList from '@/components/template/home/ProductList';
import MoreProducts from '@/components/template/product/More';
import LoadingMoreProducts from '@/components/template/search/Loading';
import { useFetchLazy } from '@/hooks/useFetch';
import { useReload } from '@/hooks/useReload';
import { ProductX } from '@/typings';
import getAllcountSearchProducts from '@/utils/fetch/product/getmany/search/allcount';
import getManySearchProducts from '@/utils/fetch/product/getmany/search/search';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

const Class = {
    Wrapper: 'w-screen h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] flex justify-center',
    Wrapper_Inner: 'flex items-end justify-center h-full max-h-[13rem] py-5'
}

type Props = {
    string: string
}

type Range = {
    skip: number,
    skipped: number[],
    string: string,
}

const Index = ({ string }: Props) => {
    const { reloaded, reload } = useReload();
    const [ products, setProducts ] = useState(undefined as ProductX[]|undefined);
    const range: MutableRefObject<Range> = useRef({
        skip: 0,
        string: string,
        skipped: [0]
    });
    
    const { result: allCount, refetch: refetchAllCount, fetching: fetchingAllCount } = useFetchLazy({
        func: getAllcountSearchProducts,
        args: {
            query: {
                string: range.current.string
            }
        }
    });
    const { result: partedProducts, refetch: refetchProducts, fetching: fetchingProducts } = useFetchLazy({
        func: getManySearchProducts,
        args: {
            query: {
                string: range.current.string,
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
        if (range.current.string !== string) {
            range.current = {
                skip: 0,
                skipped: [],
                string: string
            }
            reload({ reason: 'Change string' });
        }
    }, [string]);

    useEffect(() => {
        switch(reloaded.reason) {
            case 'Increase skip': 
                refetchProducts();
                break;

            case 'Change string':
                refetchAllCount();
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
                        Searching...
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
        <div className='px-5 md:px-10 mx-auto max-w-5xl'>
            <div className='mt-2.5 mb-4'>
                <p className='text-sm  md:text-base font-normal'>
                    <span className='opacity-60'>Found&nbsp;</span>
                    <span className='opacity-75'>{allCount} products.</span>
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

export default Index;