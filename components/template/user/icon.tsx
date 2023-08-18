import { User } from '@/prisma-types/index';
import React from 'react'

const UserDefaultICon = ({ user }: { user: User }) => {
    return (
        <div
            className={`w-full h-full absolute rounded-full flex items-center justify-center overflow-hidden cursor-pointer`}
            style={{ backgroundColor: user.image_color }}>
            <p className='text-white text-sm md:text-base font-medium'>
                {user.fullname[0]}
            </p>
        </div>
    );
}

export default UserDefaultICon;