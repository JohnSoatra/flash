import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Error from "@/components/Error";
import VARS from '@/constants/vars';
import { CameraIcon } from '@heroicons/react/24/solid';
import { UserC } from '@/gateway-types/typings';
import withStoreUrl from '@/utils/url/with_store';

const Class = {
    Title: 'text-sm opacity-75 font-semibold',
    InputLabel: 'opacity-75',
    Input: 'w-full bg-transparent block p-2 md:p-2.5 transition text-sm border border-light-300 rounded focus:border-blue-500 opacity-75'
}

type Props = {
    user: UserC,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    options: {[key: string]: RegisterOptions},

    onImageOversize: () => void,
    onImageRightsize: () => void,
    onFormChanged: () => void,
}

const GeneralAccount = ({ 
    user,
    errors,
    register,
    options,

    onImageOversize,
    onImageRightsize,
    onFormChanged
}: Props) => {
    const avatar = useRef<HTMLLabelElement>(null);
    const [imageUrl, setImageUrl] = useState(null as string|null);

    return (
        <form className="space-y-10" onChange={onFormChanged}>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center'>
                    <div className="mb-2 text-sm font-medium flex items-start ">
                        <label
                            htmlFor="avatar"
                            className={Class.InputLabel}
                            ref={avatar}>
                            Avatar&nbsp;
                        </label>
                        {
                            errors['avatar'] &&
                            <Error message={String(errors['avatar']['message'])} />
                        }
                    </div>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/jpeg, image/png"
                        className={Class.Input + ' hidden'}
                        {
                            ...register(
                                'avatar',
                                {
                                    ...(options['avatar'] || {}),
                                    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
                                        const files = evt.target.files;

                                        if (files?.length) {
                                            if (files[0].size > (2 * VARS.SIZE.MB)) {
                                                onImageOversize();
                                            } else {
                                                if (imageUrl) {
                                                    URL.revokeObjectURL(imageUrl);
                                                }

                                                const _url = URL.createObjectURL(files[0]);
                                                setImageUrl(_url);
                                                onImageRightsize();
                                            }
                                        }
                                    },
                                }
                            )
                        }
                    />
                    <button
                        type='button'
                        className='relative w-20 h-20 md:w-28 md:h-28 border border-light-400 shadow rounded-full overflow-hidden transition-opacity hover:opacity-75'
                        onClick={() => avatar.current?.click()}>
                        {
                            (imageUrl || user.image_url) ?
                                <Image
                                    src={(imageUrl || withStoreUrl(user.image_url!))!}
                                    alt="user"
                                    fill={true}
                                    sizes='100%'
                                    className="object-cover"
                                /> :
                                <div
                                    className='absolute inset-0 rounded-full flex items-center justify-center'>
                                    <CameraIcon className='w-10 h-10 text-light-200' />
                                </div>
                        }
                    </button>
                </div>
            </div>

            <div>
                <div className="mb-2 text-sm font-medium flex items-start ">
                    <label
                        htmlFor="username"
                        className={Class.InputLabel}>
                        Username&nbsp;
                    </label>
                    {
                        errors['username'] &&
                        <Error message={String(errors['username']['message'])} />
                    }
                </div>
                <input
                    type="text"
                    id="username"
                    defaultValue={user.username}
                    className={Class.Input}
                    { ...register('username', options['username']) }
                />
            </div>

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

export default GeneralAccount;