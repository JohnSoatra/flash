import ROUTE from '@/constants/route';
import { removeFromBasket } from '@/redux/basket';
import { ProductX } from '@/typings';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

type Prop = {
    id: string,
    products: ProductX[]
}

const Product = ({ id, products }: Prop) => {
    const dispatch = useDispatch();
    const product = products[0];

    const removeProductFromBasket = () => {
        dispatch(removeFromBasket({ id }));
        toast.error(`${product.name} removed from basket`, {
            position: 'bottom-center'
        });
    }

    return (
        <div className='flex flex-col gap-x-4 border-b border-gray-300 py-5 lg:flex-row lg:items-center'>
            <div className='h-44 w-44 relative'>
                <Link href={ROUTE.PRODUCT(product.id)}>
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill={true}
                        sizes="100%"
                        className='object-contain'
                    />
                </Link>
            </div>
            <div className='flex flex-1 items-end lg:items-center'>
                <div className='flex-1 space-y-4'>
                    <div className="flex flex-col gap-x-8 text-xl lg:text-2xl lg:flex-row">
                        <Link href={ROUTE.PRODUCT(product.id)}>
                            <h4 className='font-semibold lg:w-96 hover:underline'>{product.title}</h4>
                        </Link>
                        <p className="flex items-end gap-x-1 font-semibold">
                            {products.length}
                            <ChevronDownIcon className="h-6 w-6 text-blue-500" />
                        </p>
                    </div>
                    <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Show product details
                        <ChevronDownIcon className="h-6 w-6" />
                    </p>
                </div>
                <div className=" flex flex-col items-end space-y-4">
                    <h4 className="text-xl font-semibold lg:text-2xl">
                        ${products.reduce((total, product) => total + product.price, 0)}
                    </h4>
                    <button
                        className="text-blue-500 hover: underline"
                        onClick={removeProductFromBasket}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;