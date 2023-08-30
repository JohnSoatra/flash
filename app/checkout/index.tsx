'use client';
import Error from '@/components/Error';
import Card from '@/components/template/checkout/Card';
import { CardX } from '@/gateway-types/typings';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Collapse } from '@material-tailwind/react';
import { RegisterOptions, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import round from '@/utils/number/round';
import removeAllProductsFromCard from '@/utils/fetch/card/remove_all_product';
import { toast } from 'react-hot-toast';
import VARS from '@/constants/vars';
import useCard from '@/hooks/useCard';
import { useDispatch } from 'react-redux';
import { addToCard, removeAllFromCard, removeFromCard } from '@/redux/card';
import addProductToCard from '@/utils/fetch/card/add_product';
import removeProductFromCard from '@/utils/fetch/card/remove_product';
import PasswordPopover from '@/components/template/password/PasswordPopover';
import verifyPassword from '@/utils/fetch/user/verify_password';

const Class = {
    Title: 'font-bold text-lg lg:text-xl opacity-80 mb-5 underline',
    PriceListDownTitle: 'opacity-75 text-sm md:text-base',
    PriceListDownValue: 'opacity-75 text-sm md:text-base',
    InputLabel: 'opacity-75',
    Input: 'w-full bg-transparent block p-2 md:p-2.5 transition text-sm border border-light-300 rounded focus:border-blue-500 opacity-75',
    Wrapper: 'w-screen h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] flex justify-center',
    Wrapper_Inner: 'flex items-end justify-center h-full max-h-[13rem] py-5'
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
            value: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])( (?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.]))*$/,
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
    },

    'confirm_password': {
        required: {
            value: true,
            message: 'is require.',
        },
        minLength: {
            value: 8,
            message: 'must be at lease 8 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        }
    },
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

const Index = () => {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setValue,
        setError,
        formState: { errors }
    } = useForm();
    const cards = useCard();
    const dispatch = useDispatch();
    const [selectedChoice, setSelectedChoice] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);

    const onCheckoutClicked = () => {
        setShowConfirm(true);
    }

    const onConfirm = async () => {
        if (await trigger('confirm_password')) {
            const password = watch('confirm_password');

            const matchedPassword = await verifyPassword({
                signal: null,
                body: {
                    password: password
                }
            });

            if (matchedPassword) {
                setValue('confirm_password', '');
                setShowConfirm(false);

                if (selectedChoice === 0) {
                    
                } else {

                }
            } else {
                setError(
                    'confirm_password',
                    {
                        message: 'is wrong.'
                    }
                );
            }
        } else {

        }
        
    }

    const onTrashClicked = async (index: number) => {
        if (cards) {
            const result = await removeAllProductsFromCard({
                signal: null,
                body: {
                    product_id: cards[index].product.id
                }
            });

            if (result) {
                dispatch(removeAllFromCard(cards[index]));

                toast.success(
                    'Removed product from card.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.CARD
                    }
                );
            } else {
                toast.error(
                    'There is a problem with removing.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.CARD
                    }
                );
            }
        }
    }

    const onIncreaseQuantity = async (index: number) => {
        if (cards) {
            const result = await addProductToCard({
                signal: null,
                body: {
                    product_id: cards[index].product.id
                }
            });

            if (result === null) {
                toast.error(
                    'There is a problem with adding.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.CARD
                    }
                );
            } else {
                dispatch(addToCard(result));

                toast.success(
                    'Increased product\'s quantity.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.CARD
                    }
                );
            }
        }
    }

    const onDecreaseQuantity = async (index: number) => {
        if (cards) {
            const result = await removeProductFromCard({
                signal: null,
                body: {
                    product_id: cards[index].product.id
                }
            });

            if (result) {
                dispatch(removeFromCard(cards[index]));

                toast.success(
                    'Decreased product\'s quantity.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.CARD
                    }
                );
            } else {
                toast.error(
                    'There is a problem with removing.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.CARD
                    }
                );
            }
        }
    }

    if (cards.length === 0) {
        return (
            <div className={Class.Wrapper}>
                <div className={Class.Wrapper_Inner}>
                    <p className='text-xl md:text-2xl font-medium tracking-wide opacity-75'>Your card is empty.</p>
                </div>
            </div>
        )
    }

    return (
        <div className='space-y-10 max-w-5xl mx-auto py-5 px-10 md:px-20'>
            <div className='space-y-2'>
                <div className='pl-2'>
                    <h2 className={Class.Title}>Order Summary</h2>
                </div>

                <div className="relative shadow-lg md:flex border border-light-400 bg-white rounded overflow-hidden">
                    <div className='md:flex-1'>
                        {
                            cards.map((card, index) =>
                                <>
                                    <Card
                                        key={index}
                                        card={card}
                                        onTrashClicked={() => onTrashClicked(index)}
                                        onIncrease={() => onIncreaseQuantity(index)}
                                        onDecrease={() => onDecreaseQuantity(index)}
                                    />
                                    {
                                        cards.length > 1 && index < cards.length - 1 &&
                                        <div className='h-px w-full bg-light-400'></div>
                                    }
                                </>
                            )
                        }
                    </div>

                    <div className="w-screen h-px bg-light-400 md:w-px md:h-auto self-stretch"></div>
                    
                    <div className="w-full h-full px-5 py-5 md:py-10 space-y-5 md:max-w-sm">

                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center justify-between">
                                <p className={'font-semibold opacity-75 text-sm md:text-base'}>Price</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className={Class.PriceListDownTitle}>Sub-Total</p>
                                    <p className={Class.PriceListDownValue}>${calculateSubPrice(cards)}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className={Class.PriceListDownTitle}>Shipping</p>
                                    <p className={Class.PriceListDownValue}>${calculateShippingPrice(cards)}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className={Class.PriceListDownTitle}>Tax</p>
                                    <p className={Class.PriceListDownValue}>${calculateTaxPrice(cards)}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className={'font-semibold opacity-75 text-sm md:text-base'}>Total</p>
                                <p className={'font-semibold opacity-75 text-sm md:text-base'}>${calculateSubPrice(cards) + calculateShippingPrice(cards) + calculateTaxPrice(cards)}</p>
                            </div>
                        </div>

                        <button
                            className='w-full px-4 py-2 bg-blue-600/90 transition hover:bg-blue-700 text-white text-sm rounded'
                            onClick={onCheckoutClicked}>
                            Checkout
                        </button>

                        <PasswordPopover
                            open={showConfirm}
                            errors={errors}
                            options={OPTIONS}
                            register={register}
                            onCancel={() => setShowConfirm(false)}
                            onOutside={() => setShowConfirm(false)}
                            onConfirm={onConfirm}>
                            <div>
                                <p>You are going to charge ${calculateSubPrice(cards)} for</p>
                                <ol>
                                    {
                                        cards.map((card) =>
                                            <li key={card.id}>
                                                <p>{card.product.name}</p>
                                                <p>${round(card.product.price)} * {card.quantity}</p>
                                            </li>
                                        )
                                    }
                                </ol>
                            </div>
                        </PasswordPopover>

                    </div>
                </div>

            </div>

            <div className='space-y-5'>
                <div className='space-y-1'>
                    <h2 className={Class.Title}>Delivering Information</h2>
                </div>
                
                <div className='bg-white rounded-lg border border-light-400 px-5 py-5 space-y-4'>
                    <div className='space-y-5'>
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
                            className='relative space-y-5'
                            onSubmit={handleSubmit(() => {})}>
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

            </div>
        </div>
    );
}

function calculateSubPrice(cards: CardX[]) {
    return round(cards.reduce((res, card) => res + card.product.price * card.quantity, 0));
}

function calculateTaxPrice(cards: CardX[]) {
    return round(cards.reduce((res, card) => res + card.product.tax_price * card.quantity, 0));
}

function calculateShippingPrice(cards: CardX[]) {
    return round(cards.reduce((res, card) => res + card.product.shipping_price * card.quantity, 0));
}

export default Index;