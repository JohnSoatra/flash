'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UserProfile from './template/header/UserProfile';
import InputSearch from './template/search/Input';
import FilterPopover from './template/filter/FilterPopover';

type Props = {
    pathName: string,
    isEmptySearchPage: boolean,
}

const Header = ({ isEmptySearchPage }: Props) => {
    return (
        <header className='h-[3rem] md:h-[4rem] sticky top-0 left-0 w-full z-30 flex items-center justify-between px-4 bg-opacity-70 backdrop-blur bg-lightmain'>
            <div className='flex items-center justify-center md:w-1/5'>
            {
                !isEmptySearchPage &&
                <Link href={'/'} className='h-fit'>
                    <div className='relative h-6 w-6 cursor-pointer opacity-75 transition hover:opacity-100'>
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
            }
            </div>

            {
                !isEmptySearchPage &&
                <div className='h-full flex flex-1 justify-center items-center'>
                    <div className='h-full w-full max-h-[2.3rem] max-w-[25rem] md:max-h-[2.7rem] lg:max-h-[2.8rem] md:max-w-[50rem] flex justify-center items-center mx-2'>
                        <InputSearch />
                    </div>
                </div>
            }

            <div className='flex items-center justify-center gap-x-2 md:gap-x-4 md:w-1/5'>
                {
                    !isEmptySearchPage &&
                    <div className='w-fit h-fit'>
                        <FilterPopover />
                    </div>
                }

                <UserProfile />
            </div>
        </header>
    );
}

export default Header;