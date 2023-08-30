'use client';
import Love from '@/components/Love';
import ShippingPrice from '@/components/ShippingPrice';
import Slider from '@/components/template/carousel/Slider';
import RelatedProducts from '@/components/template/product/Related';
import VideoList from '@/components/template/product/VideoList';
import VARS from '@/constants/vars';
import { addToCard } from '@/redux/card';
import { ProductX } from '@/typings';
import addProductToCard from '@/utils/fetch/card/add_product';
import round from '@/utils/number/round';
import withStoreUrl from '@/utils/url/with_store';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

type Prop = {
  product: ProductX,
  mdxSource: any
}

const Class = {
  ProductLabel: `mt-3 font-semibold text-xl md:text-2xl opacity-80`
}

const Index = ({
  product,
  mdxSource
}: Prop) => {
  const dispatch = useDispatch();

  const onAddProductToCard = async (product: ProductX) => {
    const result = await addProductToCard({
        signal: null,
        body: {
            product_id: product.id
        }
    });

    if (result === null) {
        toast.error(
            <p>There is a problem with adding to card.</p>,
            {
                position: 'bottom-center',
                duration: VARS.DURATION.TOAST.CARD
            }
        );
    } else {
        dispatch(addToCard(result));

        toast.success(
            <p><b>{product.name}</b> was added to the card.</p>,
            {
                position: 'bottom-center',
                duration: VARS.DURATION.TOAST.CARD
            }
        );
    }
  }
  return (
    <div className='w-full h-full relative'>
      <div className='min-h-screen min-w-[500px] md:pt-5 md:w-[760px] lg:w-[900px] mx-auto'>
        <div>
          <div className='relative h-[400px] w-full md:h-[500px] md:w-1/2 md:float-left md:pr-5 md:pb-6 flex justify-end'>
            <Slider className="z-10 w-full h-full md:rounded-xl bg-white p-5 select-none">
              {
                product.images.map((image, index) =>
                  <div
                    key={index}
                    className='w-full h-full relative'>
                    <Image
                      src={withStoreUrl(image.url)}
                      alt={product.name}
                      fill={true}
                      sizes="100%"
                      className="object-contain"
                    />
                  </div>
                )
              }
            </Slider>
          
            <div className='absolute top-2 right-2 z-10 md:pr-5'>
              <Love product={product} />
            </div>
          </div>
          
          <div className='py-5 px-5 space-y-5 md:p-0'>
            <div>
              <h4 className='font-semibold text-xl md:text-2xl opacity-80'>{product.title}</h4>
              <p className="font-semibold text-base md:text-lg opacity-75">${round(product.price)}</p>
      
              <div className='mt-5'>
                <button
                  className="font-semibold hund text-xs transition opacity-80 hover:opacity-100"
                  onClick={() => onAddProductToCard(product)}>
                  + Add to cart
                </button>
              </div>
            </div>

            <p className='opacity-75 text-sm lg:text-base'>{product.description}</p>
          </div>
        </div>

        <div className='clear-both h-5 md:h-8'></div>

        <div className='absolute left-0 h-px w-screen bg-light-400'></div>

        <div className='px-5 space-y-5 md:p-0 mt-10'>
      
          {
            mdxSource &&
              <div className='space-y-3'>
                <h5 className={Class.ProductLabel}>Introduction:</h5>
                <div className='w-full h-px bg-light-400'></div>
                <div className='Markdown prose'>
                  <MDXRemote {...mdxSource}/>
                </div>
              </div>
          }
          {
            product.videos.length > 0 &&
              <div className='space-y-3'>
                <h5 className={Class.ProductLabel}>Videos:</h5>
                <div className='w-full h-px bg-light-400'></div>
                <VideoList
                  videos={product.videos}
                />
              </div>
          }

          <div className='space-y-3'>
            <h5 className={Class.ProductLabel}>Related Products:</h5>
            <div className='w-full h-px bg-light-400'></div>
            <RelatedProducts productId={product.id} />
          </div>

        </div>
      
        <div className='my-10 space-y-10 px-10 pt-10 pb-16 flex flex-col items-center'>
          <div className='space-y-4 flex flex-col items-center'>
              <p className='text-2xl md:text-3xl opacity-75 font-bold'>What are you waiting for?</p>
              <p className='text-sm md:text-base opacity-60'>If you're interested buy it now.</p>
              <p className='text-sm md:text-base opacity-60'>If not just search another products.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Index;