import ROUTE from '@/constants/route';
import VARS from '@/constants/vars';
import { ProductX } from '@/typings';
import capitalize from '@/utils/string/capitalize';
import withStoreUrl from '@/utils/url/with_store';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Class = {
    Title: 'text-2xl sm:text-3xl lg:text-4xl opacity-60 tracking-wide font-semibold text-center w-full',
    Price: 'text-lg md:text-xl font-semibold opacity-50',
    IconDiv: 'w-fit h-fit rounded-full flex items-center justify-center p-2.5 bg-dark-200 transition opacity-90 hover:opacity-100',
    Icon: 'text-white w-6 h-6 stroke-1 stroke-white'
}

type Props = {
    products: (ProductX & { category: string })[]
}

const Collection = ({ products }: Props) => {
    return (
        <div className='p-10 flex gap-x-5 overflow-scroll'>
            {
                products.map(product =>
                    <div
                        key={product.id}
                        className={'w-full h-full flex items-center justify-center bg-stone-100 rounded-lg p-5 border border-light-400'}>
                        <div className='w-full h-full flex justify-between flex-wrap max-w-lg'>
                            <p className={Class.Title}>
                                {capitalize(product.category)}
                            </p>

                            <div
                                className={`relative h-52 w-52 md:h-64 md:w-64`}>
                                <Image
                                    src={withStoreUrl(product.images[0].url)}
                                    alt={product.name}
                                    fill={true}
                                    sizes='100%'
                                    className='object-contain'
                                />
                            </div>

                            <Link
                                href={ROUTE.SEARCH(product.category)}
                                className={Class.IconDiv}>
                                <ChevronRightIcon className={Class.Icon}/>
                            </Link>

                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Collection