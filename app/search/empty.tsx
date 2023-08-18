'use client';
import FilterPopover from '@/components/template/filter/FilterPopover';
import InputSearch from '@/components/template/search/Input';
import ROUTE from '@/constants/route';
import Image from 'next/image';
import Link from 'next/link';
;
import React from 'react';

const EmptySearchPage = () => {
  return (
    <div className='min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between'>
        <div className='max-h-[15rem] w-full flex-1 flex flex-col justify-center items-center gap-y-12'>
            <div className='w-full flex justify-center'>
                <Link href={ROUTE.HOME}>
                    <div className='relative h-10 w-10 cursor-pointer opacity-75 transition hover:opacity-100'>
                        <Image
                            priority
                            src={'/flash.svg'}
                            alt='header'
                            fill={true}
                            sizes="100%"
                            className='object-contain'
                        />
                    </div>
                </Link>
            </div>

            <div className='w-full max-w-[25rem] md:max-w-[40rem] h-10 md:h-11 lg:h-12 flex gap-x-2'>
                <div className='flex-1 w-full h-full'>
                    <InputSearch />
                </div>
                <div>
                    <FilterPopover />
                </div>
            </div>

        </div>
        <div className='flex-1'></div>
    </div>
  )
}

export default EmptySearchPage;