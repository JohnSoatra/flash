'use client';
import ROUTE from '@/constants/route';
import { HeartIcon, PowerIcon, ShoppingBagIcon, TruckIcon, UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import SampleProfileIcon from '@/components/template/header/ProfileIcon';
import { UserC } from '@/gateway-types/typings';
import signout from '@/utils/fetch/auth/signout';
import { toast } from 'react-hot-toast';
import VARS from '@/constants/vars';
import { useRouter } from 'next/navigation';
import withStoreUrl from '@/utils/url/with_store';

type Prop = {
    user: UserC,
    onClickOutside: (evt: MouseEvent|null) => void
}

const UserPopover = ({ user, onClickOutside }: Prop) => {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    const onSignout = () => {
        signout({ signal: null }).then(success => {
            if (!success) {
                toast.error(
                    'There is a problem with signing out.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.DEFAULT
                    }
                );
            } else {
                router.push(ROUTE.SIGN_IN);
            }
        });
    }

    const onLinkClicked = () => {
        onClickOutside && onClickOutside(null);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node|null)) {
                onClickOutside && onClickOutside(event);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [ onClickOutside ]);

    return (
        <div
            ref={ref}
            className='w-full border bg-white border-light-400 rounded-xl shadow-md md:shadow-lg mt-px py-3 px-4 pb-5 md:py-5 md:mb-6 md:px-5'>
            <div className='flex items-center justify-center'>
                <div className='space-y-2'>
                    <p className='text-sm opacity-80'>Signed in as</p>
                    <div className='flex items-center space-x-3 py-2 px-2'>
                        <div className='relative w-8 h-8 md:w-10 md:h-10'>
                            {
                                user.image_url ?
                                    <Image
                                        src={withStoreUrl(user.image_url)}
                                        alt="user"
                                        fill={true}
                                        sizes='100%'
                                        className="cursor-pointer rounded-full"
                                    /> :
                                    <SampleProfileIcon user={user} />
                            }
                        </div>
                        <div className='flex flex-col justify-between'>
                            <h3 className='text-md md:text-lg font-semibold opacity-80'>{user.fullname}</h3>
                            {
                                user.email !== null &&
                                <p className='text-sm opacity-70'>{user.email}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='bg-light-400 w-full h-px my-3'></div>

            <div className='space-y-2'>
                <Link
                    href={ROUTE.ACCOUNT}
                    className='MenuItem'
                    onClick={onLinkClicked}>
                    <UserIcon className='MenuIcon' />
                    <p className='MenuLabel'>Account</p>
                </Link>
                <Link
                    href={ROUTE.CHECKOUT}
                    className='MenuItem'
                    onClick={onLinkClicked}>
                    <ShoppingBagIcon className='MenuIcon' />
                    <p className='MenuLabel'>Checkout</p>
                </Link>
                <Link
                    href={ROUTE.SHIPPING}
                    className='MenuItem'
                    onClick={onLinkClicked}>
                    <TruckIcon className='MenuIcon' />
                    <p className='MenuLabel'>Shipping</p>
                </Link>
                <Link
                    href={ROUTE.LOVE}
                    className='MenuItem'
                    onClick={onLinkClicked}>
                    <HeartIcon className='MenuIcon' />
                    <p className='MenuLabel'>Love</p>
                </Link>
            </div>

            <div className='bg-light-400 w-full h-px  my-3'></div>

            <div>
                <div
                    className='MenuItem opacity-100 text-rose-500 hover:text-rose-600'
                    onClick={() => {
                        onSignout();
                        onLinkClicked();
                    }}>
                    <PowerIcon className='MenuIcon' />
                    <p className='MenuLabel'>Sign out</p>
                </div>
            </div>

        </div>
    );
}

export default UserPopover;