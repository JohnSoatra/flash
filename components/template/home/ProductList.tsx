'use client';
import { ProductX } from '@/typings';
import React from 'react';
import EachProduct from '../product/Each';

type Props = {
    products: ProductX[],
    showFavorite: boolean,
}

const ProductList = ({
    products,
    showFavorite
}: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {
                products.map((product) =>
                    <EachProduct
                        key={product.id}
                        product={product}
                        showFavorite={showFavorite}
                    />
                )
            }
        </div>
    );
}

export default ProductList;