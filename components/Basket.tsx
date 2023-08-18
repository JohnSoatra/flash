'use client'
import { selectBasketProducts } from "@/redux/basket";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";

const Basket = () => {
    const basketProducts = useSelector(selectBasketProducts);

    if (basketProducts.length === 0) return null;

    return (
        <Link href="/checkout">
            <div className="h-14 w-14 fixed bottom-10 right-10 flex items-center justify-center z-50 cursor-pointer rounded-full bg-white border-midmain border">
                {
                    basketProducts.length > 0 && 
                    <span className="h-6 w-6 absolute -right-2 -top-2 flex items-center justify-center z-50 rounded-full text-sm bg-gradient-to-r from-pink-500 to-violet-500 text-white">{basketProducts.length}</span>
                }
                <ShoppingBagIcon className="h-8 w-8 cursor-pointer opacity-75" />
            </div>
        </Link>
    );
}

export default Basket;