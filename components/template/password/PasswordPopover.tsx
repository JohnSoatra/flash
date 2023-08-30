import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Password from './Password';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
    open: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},
    children?: React.ReactNode,
    onConfirm: (evt: React.MouseEvent<HTMLButtonElement>) => void,
    onCancel: (evt: React.MouseEvent<HTMLButtonElement>) => void,
    onOutside: () => void,
}

const PasswordPopover = ({
    open,
    errors,
    register,
    options,
    onConfirm,
    onCancel,
    onOutside,
    children
}: Props) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-30 w-screen h-screen bg-white"
                onClose={onOutside}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-150"
                    enterFrom="opacity-0 -translate-y-5"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-5">
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30">
                        <Password
                            errors={errors}
                            register={register}
                            options={options}
                            onConfirm={onConfirm}
                            onCancel={onCancel}>
                            {children}
                        </Password>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export default PasswordPopover;