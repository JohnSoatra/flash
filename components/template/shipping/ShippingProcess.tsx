import { Shipping } from '@/gateway-types/index';
import React from 'react';
import { BsBoxFill } from 'react-icons/bs';
import { FaGetPocket } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdLocalShipping } from 'react-icons/md';

type Step = {
    name: string,
    description: string,
    icon: IconType
}

const Steps: Step[] = [
    {
        name: 'Preparing',
        description: 'We are preparing products for you.',
        icon: BsBoxFill
    },
    {
        name: 'Delivering',
        description: 'We are delivering your products.',
        icon: MdLocalShipping
        
    },
    {
        name: 'Received',
        description: 'Now, you\'ve received your products.',
        icon: FaGetPocket
    }
]

const ShippingProcess = ({ shipping }: { shipping: Shipping }) => {
    return (
        <div className='relative'>
            <ol className='space-y-10 flex flex-col items-start md:flex-row md:justify-between md:space-y-0 md:space-x-5'>
                {
                    Steps.map((step, index) =>
                        <li
                            key={index}
                            className="z-10 flex space-x-2.5 items-center justify-center md:flex-col md:space-x-0">
                            <div className={`
                                flex items-center justify-center p-2 bg-gray-100 rounded-full ring-1 ring-white
                                ${
                                    shipping.process === index && 'bg-green-200'
                                }
                            `}>
                                <step.icon className={`
                                    w-4 h-4 text-dark-200
                                    ${
                                        shipping.process === index && 'text-green-500'
                                    }
                                `} />
                            </div>

                            <div className='md:flex md:flex-col md:items-center md:text-center'>
                                <h3 className={`
                                    font-semibold opacity-80 text-sm
                                    ${
                                        shipping.process === index ?
                                        'text-green-600' :
                                        'text-dark-400'
                                    }
                                `}>
                                    {step.name}
                                </h3>
                                <p className='text-sm opacity-70'>{step.description}</p>
                            </div>

                        </li>
                    )
                }
            </ol>
            <div className={`
                w-px h-full absolute top-0 left-4 bg-light-400
                md:w-full md:h-px md:top-4 md:left-0
            `}></div>
        </div>
    )
}

export default ShippingProcess;