import React from 'react';
import { ProductX } from '@/typings';
import Love from '@/components/Love';
import Rating from '@/components/RatingCount';
import ROUTE from '@/constants/route';
import { addToBasket } from '@/redux/basket';
import limitString from '@/utils/string/limit';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Wrapper from '@/components/Wrapper';
import Tooltip from '@/components/Tooltip';
import useUser from '@/hooks/useUser';


type Props = {
    product: ProductX,
    showFavorite: boolean,
}

const EachProduct = ({ 
    product,
    showFavorite
}: Props) => {
    const user = useUser();
    const dispatch = useDispatch();

    const addProductToBasket = (product: ProductX) => {
        dispatch(addToBasket(product));
        toast.success(`${product.name} added to basket`, {
            position: 'bottom-center'
        });
    }

    return (
        <div
            key={product.id}
            className="flex flex-col w-full bg-white transition border border-gray-200 rounded-lg shadow">
            
            <div>
                <Link href={ROUTE.PRODUCT(product.id)}>
                    <div className='w-full h-48 sm:h-56 md:h-64 lg:h-72 relative'>
                        <Image
                            src={product.images[0].url}
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
                        <Wrapper
                            wrapped={product.title.length > 40}
                            content={
                                <Link href={ROUTE.PRODUCT(product.id)}>
                                    <h5 className="text-lg lg:text-xl font-semibold tracking-tight opacity-80">
                                        {limitString(product.title, 40)}
                                    </h5>
                                </Link>
                            }
                            wrapper={({ content }) =>
                                <Tooltip
                                    content={
                                        <div className='bg-dark-300 bg-opacity-80 backdrop-blur border border-white/50 shadow-xl px-3 py-2 rounded max-w-md'>
                                            <p className="text-white">
                                                {product.title}
                                            </p>
                                        </div>
                                    }>
                                    {content}
                                </Tooltip>
                            }
                        />
                        
                        <div className='flex items-center space-x-2'>
                            <div className="text-base lg:text-lg font-semibold opacity-75">
                                ${product.price}
                            </div>
                            
                            {
                                showFavorite && user &&
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

                <div>
                    <div className="flex items-center justify-between">
                        <button
                            className="text-dark-200 bg-light-900 hover:bg-light-600 font-semibold rounded-lg text-xs text-center py-2.5 w-full focus:ring-0 focus:outline-none"
                            onClick={() => addProductToBasket(product)}>
                            Add to cart
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default EachProduct;