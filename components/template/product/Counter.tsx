import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Class = {
    Button: (disabled: boolean) => `
        py-1 px-2 flex items-center justify-center transition bg-transparent
        ${
            disabled ?
            'opacity-20 cursor-not-allowed' :
            'opacity-75 hover:bg-light-800'
        }
    `,
    Icon: 'w-3 h-3',
    Input: 'text-xs md:text-sm w-10 opacity-70 border-0 ring-0 outline-none text-center focus:ring-0 focus:outline-none focus:border-0'
}

type Props = {
    value: number,
    min: number,
    max: number,
    onDecrease: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onIncrease: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const QuantityCounter = ({
    value,
    min,
    max,
    onDecrease,
    onIncrease,
    onChange
}: Props) => {
    return (
        <div className='h-6 w-fit flex items-stretch divide-x divide-light-400 bg-white border border-light-400 rounded overflow-hidden'>
            
            <button
                className={Class.Button(value <= min)}
                onClick={(evt) => value > min && onDecrease(evt)}>
                <MinusIcon className={Class.Icon} />
            </button>

            <input
                value={value}
                type="number"
                className={Class.Input}
                onChange={(evt) => onChange(evt)}
            />

            <button
                className={Class.Button(value >= max)}
                onClick={(evt) => value < max && onIncrease(evt)}>
                <PlusIcon className={Class.Icon} />
            </button>

        </div>
    );
}

export default QuantityCounter