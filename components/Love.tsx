'use client';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import React, { useRef, useState } from 'react';
import toggleLove from '@/utils/fetch/love/toggle';
import { toast } from 'react-hot-toast';
import { ProductX } from '@/gateway-types/typings';
import VARS from '@/constants/vars';

type Prop = {
  product: ProductX
}

const Love = ({
  product
}: Prop) => {
  const [ loved, setLoved ] = useState<boolean|undefined>(product.loved);
  const [ loveCount, setLoveCount ] = useState(product.love_count);
  const [ processing, setProcessing ] = useState(false);
  const controller = useRef(new AbortController());

  const onToggle = async () => {
    setProcessing(true);

    controller.current.abort();
    controller.current = new AbortController();

    toggleLove({
      body: {
        product_id: product.id,
        prev_loved: loved,
      },
      signal: controller.current.signal
    })
      .then(res => {
        if (res) {
          toast.success(
            'Added love to this product.',
            {
              position: 'bottom-center',
              duration: VARS.DURATION.TOAST.DEFAULT,
            }
          );
        } else {
          toast.error(
            'Removed love from this product.',
            {
              position: 'bottom-center',
              duration: VARS.DURATION.TOAST.DEFAULT,
            }
          );
        }

        setLoved(res);
        setLoveCount(res ? loveCount + 1 : loveCount - 1);
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <div className='flex items-center space-x-[2px]'>
      <button
        className='w-[1rem] h-[1rem] md:w-[1.25rem] md:h-[1.25rem]'
        disabled={processing}
        onClick={onToggle}>
        {
            <HeartIconSolid className={`
              w-full h-full transition duration-300
              ${
                processing && 'animate-pulse'
              }
              ${
                loved ?
                'text-red-500 stroke-red-500' :
                'text-white/40 stroke-light-300'
              }
            `} />
        }
      </button>
      <p className='text-sm md:text-base opacity-60'>{loveCount}</p>
    </div>
  );
}

export default Love