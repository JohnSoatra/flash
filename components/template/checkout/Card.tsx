'use client';
import { CardX } from '@/gateway-types/typings';
import { isNumber } from '@/utils/number/number';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import QuantityCounter from '@/components/template/product/Counter';
import ROUTE from '@/constants/route';
import withStoreUrl from '@/utils/url/with_store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import limitString from '@/utils/string/limit';
import round from '@/utils/number/round';

type Props = {
    card: CardX,

    onIncrease: () => void,
    onDecrease: () => void,
    onTrashClicked: () => void,
}

const Card = ({
    card,
    onIncrease,
    onDecrease,
    onTrashClicked,
}: Props) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div className='relative px-5 md:px-8 py-5 md:py-8 space-y-5'>
            <div className="flex space-x-5 md:space-x-8 items-center">
                <div className="relative w-28 h-28 md:w-36 md:h-36">
                    <Image
                        src={withStoreUrl(card.product.images[0].url)}
                        alt={card.product.name}
                        fill={true}
                        sizes="100%"
                        className="object-contain"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="space-y-1 mb-5">
                        <p className="font-semibold opacity-80">{card.product.name}</p>
                        <p className="text-sm opacity-75">${round(card.product.price)}</p>
                    </div>

                    <div>
                        <div className='flex flex-wrap gap-1 items-center justify-start'>
                            <p className="text-sm opacity-75">Quantity</p>
                            <QuantityCounter
                                card={card}
                                onIncrease={onIncrease}
                                onDecrease={onDecrease}
                            />
                        </div>
                    </div>

                    <div
                        className='mt-2 flex space-x-px items-center text-blue-600 underline cursor-pointer opacity-90 w-fit'
                        onClick={() => setShowDescription(!showDescription)}>
                        <p className='text-xs'>Description</p>
                        {
                            showDescription ?
                            <ChevronUpIcon className='w-3 h-3 stroke-1 stroke-blue-600' /> :
                            <ChevronDownIcon className='w-3 h-3 stroke-1 stroke-blue-600' />
                        }
                    </div>

                </div>

                <div
                    className='absolute top-2 right-2 opacity-40 transition hover:opacity-75'
                    onClick={onTrashClicked}>
                    <TrashIcon className='w-4 h-4'/>
                </div>

            </div>
            
            <div>
                {
                    showDescription &&
                    <>
                        <div>
                            <p className='text-sm opacity-75'>{limitString(card.product.description, 100)}</p>
                        </div>
                        <div className='text-blue-600 cursor-pointer opacity-90'>
                            <Link
                                href={ROUTE.PRODUCT(card.product.id)}
                                className='text-xs'>
                                Detail
                            </Link>
                        </div>
                    </>
                }
            </div>

        </div>
    );
}

export default Card;