'use client';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import React, { useRef, useState } from 'react';
import toggleLove from '@/utils/fetch/love/toggle';
import { toast } from 'react-hot-toast';
import { ProductX } from '@/prisma-types/typings';

type Prop = {
  product: ProductX
}

const Love = ({
  product
}: Prop) => {
  const [ loved, setLoved ] = useState(product.loved);
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
            'Added to favorites',
            {
              position: 'bottom-center'
            }
          );
        } else {
          toast.success(
            'Removed from favorites',
            {
              position: 'bottom-center'
            }
          );
        }

        setLoved(res !== null ? res : undefined);
      })
      .catch(() => {})
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <div className='flex items-center space-x-2'>
      <p className='text-sm opacity-75'>{product.love_count}</p>
      <button
        className='w-5 h-5'
        disabled={processing}
        onClick={onToggle}>
        {
            <HeartIconSolid className={`
              w-full h-full transition duration-300 stroke-1
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
    </div>
  );
}

export default Love