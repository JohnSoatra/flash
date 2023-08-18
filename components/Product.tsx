'use client'
import ROUTE from "@/constants/route";
import { addToBasket } from "@/redux/basket";
import { ProductX } from "@/typings";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

type Prop = {
    product: ProductX
}

const Product = ({ product }: Prop) => {
    const dispatch = useDispatch();

    const addProductToBasket = () => {
        dispatch(addToBasket(product));
        toast.success(`${product.name} added to basket`, {
            position: 'bottom-center'
        });
    }

    return (
        <div className="h-fit w-[320px] md:h-[500px] md:w-[400px] flex flex-col space-y-3 rounded-xl select-none p-8 md:p-10 border border-midmain">
            <div className="relative h-64 w-full md:h-72">
                <Link href={ROUTE.PRODUCT(product.id)}>
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill={true}
                        sizes="100%"
                        className="object-contain"
                    />
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-center space-x-10">
                <div className="space-y-2">
                    <Link href={ROUTE.PRODUCT(product.id)}>
                        <p className="text-xl md:text-2xl hover:underline">{product.title}</p>
                    </Link>
                    <p className="text-lg md:text-xl">${product.price}</p>
                </div>
                <div
                    className="h-11 w-11 md:h-[55px] md:w-[55px] flex flex-shrink-0 items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
                    onClick={addProductToBasket}>
                    <ShoppingCartIcon className="h-7 w-7 text-white" />
                </div>
            </div>
        </div>
    );
}

export default Product;