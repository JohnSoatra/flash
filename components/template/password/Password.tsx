'use client';
import React, { useState } from "react";
import EyeInput from "@/components/element/EyeInput";
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import Error from "@/components/Error";

const Class = {
    Title: 'text-sm opacity-75 font-semibold',
    InputLabel: 'opacity-75',
    Input: 'w-full bg-transparent block p-2 md:p-2.5 transition text-sm border border-light-300 rounded focus:border-blue-500 opacity-75'
}

type Props = {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},
    children?: React.ReactNode,
    onConfirm: (evt: React.MouseEvent<HTMLButtonElement>) => void,
    onCancel: (evt: React.MouseEvent<HTMLButtonElement>) => void,
}

const Password = ({
    errors,
    register,
    options,
    children,
    onConfirm,
    onCancel,
}: Props
) => {
    const [password, setPassword] = useState('');

    return (
        <form className='flex flex-col divide-y divide-gray-200 space-y-2 bg-white shadow rounded-md min-w-[400px] px-4 py-2'>

            <div className="text-center text-md font-semibold text-gray-500">
                <p>Confirmation</p>
            </div>

            {children}

            <div className='py-4 px-2'>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium">
                        Password&nbsp;
                    </label>
                    {
                        errors['confirm_password'] &&
                        <Error message={String(errors['confirm_password']['message'])} />
                    }
                </div>
                <EyeInput
                    id="confirm_password"
                    placeholder={'*'.repeat(8)}
                    className={Class.Input}
                    value={password}
                    {
                        ...register(
                            'confirm_password',
                            {
                                ...options['confirm_password'],
                                onChange(evt: React.ChangeEvent<HTMLInputElement>) {
                                    setPassword(evt.target.value);
                                }
                            }
                        )
                    }
                />
            </div>

            <div className="flex items-center justify-end space-x-2 py-2">
                <button
                    type="button"
                    className="transition text-white border border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1.5 md:px-4 md:py-2 text-center disabled:opacity-30 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:hover:text-white disabled:border-gray-500"
                    disabled={password === ''}
                    onClick={onConfirm}>
                    <p>Confirm</p>
                </button>
                
                <button
                    type="button"
                    className="transition text-rose-600 bg-white border border-rose-600 hover:bg-rose-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-full text-sm px-3 py-1.5 md:px-4 md:py-2 text-center"
                    onClick={onCancel}>
                    <p>Cancel</p>
                </button>
            </div>

        </form>
    );
};

export default Password;
