'use client';
import Error from '@/components/Error';
import QuantityCounter from '@/components/template/product/Counter';
import ROUTE from '@/constants/route';
import VARS from '@/constants/vars';
import { CardX } from '@/typings';
import { isNumber } from '@/utils/number/number';
import { CheckIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Collapse } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';

const Class = {
    Title: 'font-semibold text-xl md:text-2xl opacity-80',
    PriceListDownTitle: 'opacity-75 text-sm md:text-base',
    PriceListDownValue: 'opacity-75 text-sm md:text-base',
    InputLabel: 'opacity-75',
    Input: 'bg-white/80 w-full block p-2.5 transition text-sm border border-light-300 rounded-xl focus:border-blue-500 opacity-75'
}

const OPTIONS: { [key: string]: RegisterOptions } = {
    'fullname': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 3,
            message: 'must be at lease 3 characters.'
        },
        maxLength: {
            value: 30,
            message: 'must not be more then 30 characters.'
        },
        pattern: {
            value: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            message: 'is in wrong format.'
        }
    },
    'phone_number': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 9,
            message: 'must be at lease 9 characters.'
        },
        pattern: {
            value: /^0[0-9]{8,9}(,0[0-9]{8,9})*$/,
            message: 'is in wrong format.'
        }
    },
    'address': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 3,
            message: 'must be at lease 3 characters.'
        },
    }
}

const choices: {
    title: string,
    description: string
}[] = [
    {
        title: 'Based on profile',
        description: 'We will delivery your products based on contact information in your profile.'
    },
    {
        title: 'Customize contact',
        description: 'We will delivery your products based on new customize contact information.'
    }
];

const Index = ({ card }: { card: CardX }) => {
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setError,
        formState: { errors }
    } = useForm();
    const [ selectedChoice, setSelectedChoice ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ quantities, setQuantities ] = useState(card.product_quantities);
    const subPrice = calculateSubPrice(card);
    const shippingPrice = calculateShippingPrice(card);
    const taxPrice = calculateTaxPrice(card);
    
    const onSubmit = (data: any) => {

    }

    return (
        <div className='space-y-5 max-w-4xl mx-auto py-5 md:py-10 px-10 md:px-20'>
            <div className='space-y-5'>
                <div className='space-y-1'>
                    <h2 className={Class.Title}>Delivering information</h2>
                </div>
                
                <div className='space-y-5 bg-white p-5 rounded-lg border border-light-400'>
                    {
                        choices.map((choice, index) =>
                            <div
                                key={index}
                                className="flex items-start space-x-2 w-fit"
                                onClick={() => setSelectedChoice(index)}>
                                <div className='flex items-center justify-center'>
                                    <div
                                        className={`
                                            w-4 h-4 flex items-center justify-center overflow-hidden rounded-full border
                                            ${
                                                selectedChoice === index ?
                                                'bg-blue-600 border-transparent':
                                                'bg-white border-light-400'
                                            }
                                        `}
                                        id={'radio-' + index}>
                                        {
                                            selectedChoice === index && <CheckIcon className='w-3 h-3 stroke-2 stroke-white text-white' />
                                        }
                                    </div>
                                </div>

                                <div className='space-y-1 select-none'>
                                    <p className="text-sm opacity-80 font-semibold leading-4">
                                        {choice.title}
                                    </p>

                                    <p className='text-sm font-normal opacity-70'>
                                        {choice.description}
                                    </p>
                                </div>

                            </div>
                        )
                    }
                </div>

                <Collapse open={selectedChoice === 1} className='rounded-lg shadow-sm overflow-hidden'>
                    <form
                        className='relative px-4 py-4 space-y-5 bg-white border border-light-400 rounded-lg'
                        onSubmit={handleSubmit(onSubmit)}>
                        <p className='text-sm opacity-75'>Enter receiver's information</p>
                        <div>
                            <div className="mb-2 text-sm font-medium flex items-start ">
                                <label
                                    className={Class.InputLabel}
                                    htmlFor="fullname">
                                    Fullname&nbsp;
                                </label>
                                {
                                    errors['fullname'] &&
                                    <Error message={String(errors['fullname']['message'])} />
                                }
                            </div>
                            <input
                                type="text"
                                id="fullname"
                                placeholder={'Receiver\'s fullname'}
                                className={Class.Input}
                                { ...register('fullname', OPTIONS['fullname']) }
                            />
                        </div>

                        <div>
                            <div className="mb-2 text-sm font-medium flex items-start ">
                                <label
                                    className={Class.InputLabel}
                                    htmlFor="phone_number">
                                    Phone numbers (saperated by comma)&nbsp;
                                </label>
                                {
                                    errors['phone_number'] &&
                                    <Error message={String(errors['phone_number']['message'])} />
                                }
                            </div>

                            <input
                                type="text"
                                id="phone_number"
                                placeholder={'Receiver\'s phone number'}
                                className={Class.Input}
                                { ...register('phone_number', OPTIONS['phone_number']) }
                            />
                        </div>

                        <div>
                            <div className="mb-2 text-sm font-medium flex items-start ">
                                <label
                                    className={Class.InputLabel}
                                    htmlFor="address">
                                    Address&nbsp;
                                </label>
                                {
                                    errors['address'] &&
                                    <Error message={String(errors['address']['message'])} />
                                }
                            </div>
                            <textarea
                                rows={4}
                                id="address"
                                placeholder={'Receiver\'s address'}
                                className={Class.Input + ' resize-none'}
                                { ...register('address', OPTIONS['address']) }
                            />
                        </div>

                        <div className='flex justify-end'>
                            <button
                                type="submit"
                                className="transition text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 md:px-5 md:py-2.5 text-center">
                                Save
                            </button>
                        </div>
                    </form>
                </Collapse>

            </div>

            {
                selectedChoice === 0 &&
                <div className={`h-px w-full bg-light-400`}></div>
            }

            <div className='space-y-2'>
                <div className='pl-2'>
                    <h2 className={'font-medium text-lg opacity-80'}>Order summary</h2>
                </div>

                {/* p-5 */}
                {/* py-6 md:pr-5 */}
                <div className="relative shadow-lg md:grid md:grid-cols-2 border border-light-400 bg-white rounded  overflow-hidden">
                    <div>
                        <div>
                            {
                                card.products.map((product, index) =>
                                    <div
                                        key={index}
                                        className='relative'>
                                        {
                                            index > 0 &&
                                            <div className='w-full h-px bg-light-400'></div>
                                        }
                                        <div
                                            key={product.id}
                                            className="flex space-x-5 items-center py-3 px-5">
                                            <div className="relative w-28 h-28 md:w-36 md:h-36">
                                                <Image
                                                    src={VARS.MEDIA_SERVER + product.images[0].url}
                                                    alt={product.name}
                                                    fill={true}
                                                    sizes="100%"
                                                    className="object-contain"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                
                                                <div className="space-y-1 mb-5">
                                                    <p className="font-semibold opacity-80">{product.name}</p>
                                                    <p className="text-sm opacity-75">${product.price}</p>
                                                </div>

                                                <div>
                                                    <div className='flex flex-wrap gap-1 items-center justify-start'>
                                                        <p className="text-sm opacity-75">Quantity</p>
                                                        <div>
                                                            <QuantityCounter
                                                                value={quantities[index]}
                                                                min={1}
                                                                max={card.products[index].quantity}
                                                                onDecrease={(evt) => {
                                                                    const newQuantities = [...quantities];
                                                                    newQuantities[index] -= 1;
                                                                    setQuantities(newQuantities);
                                                                }}
                                                                onIncrease={(evt) => {
                                                                    const newQuantities = [...quantities];
                                                                    newQuantities[index] += 1;
                                                                    setQuantities(newQuantities);
                                                                }}
                                                                onChange={(evt) => {
                                                                    if (
                                                                        isNumber(evt.target.value) &&
                                                                        +evt.target.value >= 1 &&
                                                                        +evt.target.value <= card.products[index].quantity
                                                                    ) {
                                                                        const newQuantities = [...quantities];
                                                                        newQuantities[index] = +evt.target.value;
                                                                        setQuantities(newQuantities);
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-2 flex space-x-px items-center text-blue-600 underline cursor-pointer opacity-90'>
                                                    <p className='text-xs'>Description</p>
                                                    <ChevronDownIcon className='w-3 h-3 stroke-1 stroke-blue-600' />
                                                </div>

                                            </div>

                                            <div className='absolute top-2 right-2 opacity-40 transition hover:opacity-75'>
                                                <TrashIcon className='w-4 h-4'/>
                                            </div>

                                        </div>

                                        <div className='px-5 pb-5'>
                                            <div>
                                                <p className='text-sm opacity-75'>{product.description}</p>
                                            </div>
                                            <div className='text-blue-600 cursor-pointer opacity-90'>
                                                <Link
                                                    href={ROUTE.PRODUCT(product.id)}
                                                    className='text-xs'>
                                                    Detail...
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                    
                    <div className="w-screen absolute h-px -left-10 bg-light-400 md:w-px md:h-screen md:left-1/2"></div>
                    
                    <div className="w-full h-full px-5 py-5 md:py-10 space-y-5">

                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center justify-between">
                                <p className={'font-semibold opacity-75 text-sm md:text-base'}>Price</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className={Class.PriceListDownTitle}>Sub-Total</p>
                                    <p className={Class.PriceListDownValue}>${subPrice}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className={Class.PriceListDownTitle}>Shipping</p>
                                    <p className={Class.PriceListDownValue}>{shippingPrice > 0 && '$'}{shippingPrice}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className={Class.PriceListDownTitle}>Tax</p>
                                    <p className={Class.PriceListDownValue}>{taxPrice > 0 && '$'}{taxPrice}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className={'font-semibold opacity-75 text-sm md:text-base'}>Total</p>
                                <p className={'font-semibold opacity-75 text-sm md:text-base'}>${subPrice + shippingPrice + taxPrice}</p>
                            </div>
                        </div>

                        <div>
                            <button className='w-full px-4 py-2 bg-blue-600/90 transition hover:bg-blue-700 text-white text-sm rounded'>Confirm Order</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

function calculateSubPrice(card: CardX) {
    return card.products.reduce((res, product) => res + product.price, 0);
}

function calculateTaxPrice(card: CardX) {
    return card.products.reduce((res, product) => res + product.tax_price, 0);
}

function calculateShippingPrice(card: CardX) {
    return card.products.reduce((res, product) => res + product.shipping_price, 0);
}

export default Index;