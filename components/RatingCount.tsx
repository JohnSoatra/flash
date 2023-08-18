'use client';
import round from '@/utils/number/round';
import { StarIcon } from '@heroicons/react/24/solid';

type Prop = {
  count: number,
}

const Rating = ({ count }: Prop) => {
  const averageRounded = round(count, 1);

  return (
    averageRounded > 0 &&
      <div className='w-fit flex items-center justify-center space-x-1'>
        <StarIcon className={`h-5 w-5 text-[#f4bb0e]`} />
        <p className="font-semibold opacity-75">{averageRounded}</p>
      </div>
  );
}

export default Rating;