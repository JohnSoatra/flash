import React from 'react';
import { ProductX } from '@/typings';
import { toast } from 'react-hot-toast';
import Love from '@/components/Love';
import ROUTE from '@/constants/route';
import limitString from '@/utils/string/limit';
import Image from 'next/image';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import VARS from '@/constants/vars';
import withStoreUrl from '@/utils/url/with_store';
import addProductToCard from '@/utils/fetch/card/add_product';
import { useDispatch } from 'react-redux';
import { addToCard } from '@/redux/card';
import round from '@/utils/number/round';


type Props = {
    product: ProductX,
    showLove: boolean,
}

const EachProduct = ({ 
    product,
    showLove
}: Props) => {
    const dispatch = useDispatch();
    const user = useUser({ require: false });

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
        <div
            key={product.id}
            className="flex flex-col w-full bg-white transition border border-gray-200 rounded-lg shadow">
            
            <div>
                <Link href={ROUTE.PRODUCT(product.id)}>
                    <div className='w-full h-48 sm:h-56 md:h-64 lg:h-72 relative'>
                        <Image
                            src={withStoreUrl(product.images[0].url)}
                            alt="product image"
                            fill={true}
                            sizes="100%"
                            className="object-contain p-2 md:p-4"
                        />
                    </div>
                </Link>
            </div>

            <div className="px-5 pb-5 flex flex-col justify-between flex-1 space-y-5">
                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <Link href={ROUTE.PRODUCT(product.id)}>
                            <h5 className="text-lg lg:text-xl font-semibold tracking-tight opacity-80 hover:opacity-90">
                                {limitString(product.title, 40)}
                            </h5>
                        </Link>
                        
                        <div className='flex items-center justify-between space-x-2'>
                            <div className="text-base lg:text-lg font-semibold opacity-75">
                                ${round(product.price)}
                            </div>
                            
                            {
                                showLove && user &&
                                <div className='text-base lg:text-lg flex justify-center'>
                                    <Love product={product} />
                                </div>
                            }
                        </div>

                    </div>

                    <p className='text-sm opacity-75' suppressHydrationWarning={false}>
                        {limitString(product.description, 200)}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="text-dark-200 bg-light-900 hover:bg-light-600 font-semibold rounded-lg text-xs text-center py-2.5 w-full focus:ring-0 focus:outline-none"
                        onClick={() => onAddProductToCard(product)}>
                        Add to cart
                    </button>
                </div>

            </div>

        </div>
    );
}

export default EachProduct;