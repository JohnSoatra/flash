import { UserC } from '@/gateway-types/typings';
import React from 'react'

const UserDefaultICon = ({ user }: { user: UserC }) => {
    return (
        <div
            className={`w-full h-full absolute rounded-full flex items-center justify-center overflow-hidden cursor-pointer`}
            style={{ backgroundColor: user.image_color }}>
            <p className='text-white text-sm md:text-base font-medium'>
                {user.username[0].toUpperCase()}
            </p>
        </div>
    );
}

export default UserDefaultICon;