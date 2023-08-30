'use client';
import Rating from '@/components/RatingCount';
import ROUTE from '@/constants/route';
import VARS from '@/constants/vars';
import {useFetch} from '@/hooks/useFetch';
import getManyRelatedProducts from '@/utils/fetch/product/getmany/related';
import round from '@/utils/number/round';
import withStoreUrl from '@/utils/url/with_store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    productId: string
}

const RelatedProducts = ({ productId }: Props) => {
    const {result: products} = useFetch({
        func: getManyRelatedProducts,
        args: {
            query: {
                product_id: productId
            }
        }
    });

    if (products === undefined || products === null || products.length === 0) {
        return null;
    }

    return (
        <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                products.map(product =>
                    <div
                        key={product.id}
                        className="flex flex-col w-full bg-white transition border border-gray-200 rounded-lg shadow">
                        <div>
                            <Link href={ROUTE.PRODUCT(product.id)}>
                                <div className='w-full h-40 md:h-52 relative'>
                                    <Image
                                        src={withStoreUrl(product.images[0].url)}
                                        alt="product image"
                                        fill={true}
                                        sizes="100%"
                                        className="object-contain p-2 md:p-4"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="px-5 pb-5 flex flex-col justify-between flex-1 space-y-5">
                            <div className='w-full h-full space-y-5'>
                                <div className='w-full h-full flex flex-col justify-between space-y-2'>
                                    <div>
                                        <Link href={ROUTE.PRODUCT(product.id)}>
                                            <h5 className="text-base md:text-lg font-semibold tracking-tight opacity-80">
                                                {product.title}
                                            </h5>
                                        </Link>
                                    </div>
                                    
                                    <div className='flex items-center justify-between space-x-2'>
                                        <div className="text-base md:text-lg font-semibold opacity-70">
                                            ${round(product.price)}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default RelatedProducts;