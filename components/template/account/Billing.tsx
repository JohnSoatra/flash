import React, { useState } from 'react';
import Error from "@/components/Error";
import { CreditCard, User } from '@/prisma-types/index';
import CardIcon from '@/components/template/account/CardIcon';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Class } from './var';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import getCurrentMonth from '@/utils/date/get_month';
import getNext5Year from '@/utils/date/get_next5year';
import formatCardNumber from '@/utils/number/format';
import formatExpires from '@/utils/number/expires';
import formatCvc from '@/utils/number/cvc';

type Props = {
    user: User,
    creditCard: CreditCard|null,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},
}

const BillingAccount = ({
    user,
    creditCard,
    errors,
    register,
    options,
}: Props) => {
    const [edit, setEdit] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expires, setExpires] = useState('');
    const [cvc, setCvc] = useState('');

    return (
        <form>
            {
                edit ?
                <div className='space-y-5'>
                    <div>
                        <div className="mb-2 text-sm font-medium flex items-start ">
                            <label
                                htmlFor="card_number"
                                className={Class.InputLabel}>
                                Card number&nbsp;
                            </label>
                            {
                                errors['card_number'] &&
                                <Error message={String(errors['card_number']['message'])} />
                            }
                        </div>
                        <input
                            type="text"
                            id="card_number"
                            placeholder={'**** '.repeat(4).trimEnd()}
                            value={cardNumber}
                            className={Class.Input}
                            {
                                ...register(
                                    'card_number',
                                    {
                                        ...(options['card_number'] || {}),
                                        onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
                                            setCardNumber(formatCardNumber(evt.target.value));
                                        }
                                    },
                                )
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 text-sm font-medium flex items-start ">
                            <label
                                htmlFor="expire_at"
                                className={Class.InputLabel}>
                                Expire date&nbsp;
                            </label>
                            {
                                errors['expire_at'] &&
                                <Error message={String(errors['expire_at']['message'])} />
                            }
                        </div>
                        <input
                            type="text"
                            id="expire_at"
                            placeholder={'** / **'}
                            value={expires}
                            className={Class.Input}
                            {
                                ...register(
                                    'expire_at',
                                    {
                                        ...(options['expire_at'] || {}),
                                        onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
                                            setExpires(formatExpires(evt.target.value));
                                        }
                                    }
                                )
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 text-sm font-medium flex items-start ">
                            <label
                                htmlFor="cvc"
                                className={Class.InputLabel}>
                                CVC/CVV&nbsp;
                            </label>
                            {
                                errors['cvc'] &&
                                <Error message={String(errors['cvc']['message'])} />
                            }
                        </div>
                        <input
                            type='text'
                            id="cvc"
                            placeholder={'*'.repeat(3)}
                            value={cvc}
                            className={Class.Input}
                            { 
                                ...register(
                                    'cvc',
                                    {
                                        ...(options['cvc'] || {}),
                                        onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
                                            setCvc(formatCvc(evt.target.value));
                                        }
                                    }
                                )
                            }
                        />
                    </div>
                </div> :

                creditCard ?
                <div className='relative border border-light-300 py-3 px-5 rounded'>
                    <div className="flex space-x-5 items-center">
                        <CardIcon type={creditCard.type} />
                        <p className='font-semibold opacity-75'>{'**** '.repeat(3) + creditCard.last_four}</p>
                    </div>
                    <button
                        type='button'
                        className={'absolute top-1/2 -translate-y-1/2 right-5 opacity-75 hover:opacity-100'}
                        onClick={() => setEdit(true)}>
                        <PencilSquareIcon className='w-4 h-4 opacity-75' />
                    </button>
                </div> :

                <button
                    type='button'
                    className={Class.ButtonPlusEdit}
                    onClick={() => setEdit(true)}>
                    <PlusIcon className='w-4 h-4 opacity-75' />
                    <p className={'opacity-75 text-sm'}>Add creditcard</p>
                </button>
            }
        </form>
    );
}

export default BillingAccount;