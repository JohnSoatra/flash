import { User } from '@/prisma-types/index';
import Error from "@/components/Error";
import React from 'react';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Class } from './var';

type Props = {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},
    user: User
}

const ContactAccount = ({
    user,
    errors,
    register,
    options,
}: Props) => {
    return (
        <form className="space-y-5">
            <div>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="fullname"
                        className={Class.InputLabel}>
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
                    defaultValue={user.fullname}
                    className={Class.Input}
                    { ...register('fullname', options['fullname']) }
                />
            </div>

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
                    defaultValue={user.phone_number}
                    className={Class.Input}
                    { ...register('phone_number', options['phone_number']) }
                />
            </div>

            <div>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="address"
                        className={Class.InputLabel}>
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
                    defaultValue={user.address}
                    className={Class.Input}
                    { ...register('address', options['address']) }
                />
            </div>
        </form>
  )
}

export default ContactAccount;