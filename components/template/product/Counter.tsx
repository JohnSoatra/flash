import { CardX } from '@/gateway-types/typings';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Class = {
    Button: (disabled: boolean) => `
        py-1 px-2 flex items-center justify-center transition bg-transparent cursor-default
        ${
            disabled ?
            'opacity-20' :
            'opacity-75 hover:bg-light-800'
        }
    `,
    Icon: 'w-3 h-3',
    Input: 'text-xs md:text-sm w-10 opacity-70 border-0 ring-0 outline-none text-center focus:ring-0 focus:outline-none focus:border-0'
}

type Props = {
    card: CardX
    onDecrease: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onIncrease: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const QuantityCounter = ({
    card,
    onDecrease,
    onIncrease
}: Props) => {
    return (
        <div className='h-6 w-fit flex items-stretch divide-x divide-light-400 bg-white border border-light-400 rounded overflow-hidden'>
            <button
                className={Class.Button(card.quantity <= 1)}
                onClick={(evt) => card.quantity > 1 && onDecrease(evt)}>
                <MinusIcon className={Class.Icon} />
            </button>
            <p className={Class.Input}>{card.quantity}</p>
            <button
                className={Class.Button(card.quantity >= card.product.quantity)}
                onClick={(evt) => card.quantity < card.product.quantity && onIncrease(evt)}>
                <PlusIcon className={Class.Icon} />
            </button>
        </div>
    );
}

export default QuantityCounter