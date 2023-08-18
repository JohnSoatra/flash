import { UserC } from '@/prisma-types/typings';
import React from 'react';

const SampleProfileIcon = ({ user }: { user: UserC }) => {
  return (
    <div
      className='absolute w-full h-full inset-0 rounded-full flex items-center justify-center overflow-hidden cursor-pointer'
      style={{ backgroundColor:  user.image_color}}>
      <p className='text-white text-sm'>{user.fullname[0]}</p>
    </div>
  )
}

export default SampleProfileIcon;