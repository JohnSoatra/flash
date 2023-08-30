import Error from "@/components/Error";
import React, { useState } from 'react';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Class } from './var';
import { UserC } from '@/gateway-types/typings';
import formatNumber from "@/utils/number/format";
import userChanged from "@/utils/user/changed";
import { Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
    user: UserC,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},

    onFormChanged: () => void,
    onRequestCode: () => void
}

const ContactAccount = ({
    user,
    errors,
    register,
    options,
    onFormChanged,
    onRequestCode
}: Props) => {
    const [phone_number, setPhoneNumber] = useState(user.phone_number);
    const [email, setEmail] = useState(user.email);

    return (
        <form className="space-y-5" onChange={onFormChanged}>

            <div>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="email"
                        className={Class.InputLabel}>
                        Email&nbsp;
                    </label>
                    {
                        errors['email'] &&
                        <Error message={String(errors['email']['message'])} />
                    }
                </div>
                <div className="relative">
                    <input
                        type="text"
                        id="email"
                        className={Class.Input}
                        value={email}
                        {
                            ...register(
                                'email',
                                {
                                    ...options['email'],
                                    onChange(evt: React.ChangeEvent<HTMLInputElement>) {
                                        setEmail(evt.target.value);
                                    },
                                }
                            )
                        }
                    />
                    {
                        userChanged('email', email) &&
                            <Tooltip
                                className='bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3'
                                content={
                                    <div className="text-gray-800">
                                        Request Verification Code
                                    </div>
                                }>
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={onRequestCode}>
                                    <FontAwesomeIcon icon={faPaperPlane} size="1x" className="text-blue-500 shadow-blue-500/20 hover:shadow-blue-500/40"/>
                                </button>
                            </Tooltip>
                    }
                </div>
            </div>

            {
                userChanged('email', email) &&
                    <div>
                        <div className="mb-2 text-sm font-medium flex items-start ">
                            <label
                                htmlFor="code"
                                className="block mb-2 text-sm font-medium">
                                Code&nbsp;
                            </label>
                            {
                                errors['code'] &&
                                <Error message={String(errors['code']['message'])} />
                            }
                        </div>
                        <input
                            type="text"
                            id="code"
                            className={Class.Input}
                            { ...register('code', options['code']) }
                        />
                    </div>
            }

            <div>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="phone_number"
                        className={Class.InputLabel}>
                        Phone number&nbsp;
                    </label>
                    {
                        errors['phone_number'] &&
                        <Error message={String(errors['phone_number']['message'])} />
                    }
                </div>
                <input
                    type="number"
                    id="phone_number"
                    className={Class.Input}
                    value={phone_number}
                    onWheel={(evt) => {
                        (evt.target as HTMLInputElement).blur();
                        setTimeout(() => {
                            (evt.target as HTMLInputElement).focus();
                        }, 0);
                    }}
                    {
                        ...register(
                            'phone_number',
                            {
                                ...options['phone_number'],
                                onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
                                    setPhoneNumber(formatNumber(evt.target.value));
                                }
                            }
                        )
                    }
                />

            </div>

        </form>
  )
}

export default ContactAccount;