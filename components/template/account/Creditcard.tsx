import React, { useEffect, useState } from 'react';
import Error from "@/components/Error";
import CardIcon from '@/components/template/account/CardIcon';
import { MinusIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Class } from './var';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import formatCardNumber from '@/utils/number/creditcard/format';
import formatExpires from '@/utils/number/creditcard/expires';
import formatCvc from '@/utils/number/creditcard/cvc';
import { CreditCardC } from '@/gateway-types/typings';

type FormProps = {
    cardNumber: string,
    expiredAt: string,
    cvc: string
}

type Props = {
    creditCard: CreditCardC|null,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},
    onFormChanged: ({ cardNumber, expiredAt, cvc }: FormProps) => void,
}

const BillingAccount = ({
    creditCard,
    errors,
    register,
    options,
    onFormChanged
}: Props) => {
    const [edit, setEdit] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiredAt, setExpiredAt] = useState('');
    const [cvc, setCvc] = useState('');

    useEffect(() => {
        if (edit) {
            onFormChanged({
                cardNumber,
                expiredAt,
                cvc
            });
        } else {
            onFormChanged({
                cardNumber: '',
                expiredAt: '',
                cvc: ''
            });
        }
    }, [edit]);

    return (
        <form className='relative'>
            {
                edit && 
                    <div
                        className='absolute top-0 right-1 opacity-75 transition hover:opacity-100'
                        onClick={() => setEdit(false)}>
                        <MinusIcon className='w-4 h-4 stroke-1 stroke-darkmain' />
                    </div>
            }

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
                                                const newCardNumber = formatCardNumber(evt.target.value);
                                                setCardNumber(newCardNumber);

                                                onFormChanged({
                                                    cardNumber: newCardNumber,
                                                    expiredAt: expiredAt,
                                                    cvc: cvc
                                                });
                                            }
                                        },
                                    )
                                }
                            />
                        </div>

                        <div>
                            <div className="mb-2 text-sm font-medium flex items-start ">
                                <label
                                    htmlFor="expired_at"
                                    className={Class.InputLabel}>
                                    Expire date&nbsp;
                                </label>
                                {
                                    errors['expired_at'] &&
                                    <Error message={String(errors['expired_at']['message'])} />
                                }
                            </div>
                            <input
                                type="text"
                                id="expired_at"
                                placeholder={'** / **'}
                                value={expiredAt}
                                className={Class.Input}
                                {
                                    ...register(
                                        'expired_at',
                                        {
                                            ...(options['expired_at'] || {}),
                                            onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
                                                const newExpiredAt = formatExpires(evt.target.value);
                                                setExpiredAt(newExpiredAt);

                                                onFormChanged({
                                                    cardNumber: cardNumber,
                                                    expiredAt: newExpiredAt,
                                                    cvc: cvc
                                                });
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
                                                const newCvc = formatCvc(evt.target.value)
                                                setCvc(newCvc);

                                                onFormChanged({
                                                    cardNumber: cardNumber,
                                                    expiredAt: expiredAt,
                                                    cvc: newCvc
                                                });
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