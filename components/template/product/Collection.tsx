import ROUTE from '@/constants/route';
import { ProductX } from '@/typings';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
    pc: ProductX,
    smartphone: ProductX,
    earphone: ProductX
}

const Class = {
    Title: 'text-2xl sm:text-3xl lg:text-4xl opacity-60 tracking-wide font-semibold',
    Price: 'text-lg md:text-xl font-semibold opacity-50',
    IconDiv: 'w-fit h-fit rounded-full flex items-center justify-center p-2.5 bg-dark-200 transition opacity-90 hover:opacity-100',
    Icon: 'text-white w-6 h-6 stroke-1 stroke-white'
}

const Collection = ({ pc, smartphone, earphone }: Props) => {
    const [ hoveredIndex, setHoveredIndex ] = useState(-1);
    return (
        <div className='p-10 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6'>
            
            <div
                className='relative flex items-center justify-center bg-stone-100 border border-light-400 rounded-lg p-5'
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(-1)}>
                <div className='space-y-1'>
                    <div className={`
                            relative h-64 w-64 md:h-72 md:w-72 transition
                            ${
                                hoveredIndex === 0 &&
                                'scale-105'
                            }
                        `}>
                        <Image
                            src={pc.images[0].url}
                            alt={pc.name}
                            fill={true}
                            sizes='100%'
                            className='object-contain'
                        />
                    </div>
                    <div>
                        <p className={Class.Title}>Personal Computers</p>
                    </div>
                    <div className='space-y-5'>
                        <div className={Class.Price}>
                            <p>Price ${pc.price}</p>
                        </div>
                        <Link
                            href={ROUTE.SEARCH('Personal Computer')}
                            className={Class.IconDiv}>
                            <ChevronRightIcon  className={Class.Icon}/>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className='w-full h-full flex flex-col gap-6'>
                {
                    [smartphone, earphone].map((item, index) =>
                        <div
                            key={index}
                            className={'w-full h-full flex items-center justify-center bg-stone-100 rounded-lg p-5 border border-light-400'}
                            onMouseEnter={() => setHoveredIndex(index + 1)}
                            onMouseLeave={() => setHoveredIndex(-1)}>
                            <div className='w-full h-full flex justify-between flex-wrap max-w-lg'>
                                <div>
                                    <div className={Class.Title}>
                                        <p>{index === 0 ? 'Smartphones' : 'Earphones'}</p>
                                    </div>
                                    <div className={Class.Price}>
                                        <p>Price ${item.price}</p>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className={`
                                            relative h-52 w-52 md:h-64 md:w-64 transition
                                            ${
                                                hoveredIndex === (index + 1) &&
                                                'scale-105'
                                            }
                                        `}>
                                        <Image
                                            src={item.images[0].url}
                                            alt={item.name}
                                            fill={true}
                                            sizes='100%'
                                            className='object-contain'
                                        />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <Link
                                        href={ROUTE.SEARCH(index === 0 ? 'Smartphone' : 'Earphone')}
                                        className={Class.IconDiv}>
                                        <ChevronRightIcon className={Class.Icon}/>
                                    </Link>
                                </div>

                            </div>
                        </div>        
                    )
                }
            </div>

        </div>
    );
}

export default Collection