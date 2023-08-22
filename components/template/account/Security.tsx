import React from 'react';
import Error from "@/components/Error";
import { Class } from './var';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { UserC } from '@/prisma-types/typings';

type Props = {
    user: UserC,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},
}

const SecurityAccount = ({
    user,
    errors,
    register,
    options,
}: Props) => {
    return (
        <form>
            <div>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="password"
                        className={Class.InputLabel}>
                        Password&nbsp;
                    </label>
                    {
                        errors['password'] &&
                        <Error message={String(errors['password']['message'])} />
                    }
                </div>
                <input
                    type="password"
                    id="password"
                    placeholder={'*'.repeat(8)}
                    className={Class.Input}
                    { ...register('password', options['password']) }
                />
            </div>
        </form>
  )
}

export default SecurityAccount;