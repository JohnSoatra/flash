'use client';
import ShippingProcess from "@/components/template/shipping/ShippingProcess";
import { OrderX } from "@/prisma-types/typings";
import { cardTypeString } from "@/utils/number/cardtype";
import Image from "next/image";

const Class = {
    PriceListDownTitle: 'opacity-75 text-sm md:text-base',
    PriceListDownValue: 'opacity-75 text-sm md:text-base',
}

const OrderTracking = ({ order }: { order: OrderX }) => {
    return (
        <div className="max-w-4xl mx-auto py-5 md:py-10 px-10 md:px-20">
            <div>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold opacity-75">
                    Order #
                    <span className="uppercase">{order.id.slice(order.id.length - 5)}</span>
                </p>
            </div>

            <div className="flex flex-wrap gap-10 py-2.5 md:py-5">
                <div className="space-y-1">
                    <p className="font-semibold text-sm opacity-75">Delivery Adress</p>
                    <p className="text-sm opacity-75">
                        {
                            order.shipping?.receiver_address
                        }
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="font-semibold text-sm opacity-75">Payment Information</p>
                    <div className="flex items-center space-x-3">
                        <div>
                            <p className="opacity-80 font-semibold text-sm text-bold uppercase text-blue-600">
                                {
                                    cardTypeString(order.payment.card_type)
                                }
                            </p>
                        </div>

                        <div className="flex flex-col justify-between">
                            <p className="text-sm opacity-75">
                                {'*'.repeat(12)}{order.payment?.card_last_four}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="h-px bg-light-400 w-full"></div>

            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-light-400 md:pb-5">
                <div className="py-6 md:pr-5">
                    <div className="space-y-5">
                        {
                            order.product_orders.map(productOrder =>
                                <div
                                    key={productOrder.id}
                                    className="flex space-x-5 items-center">
                                    <div className="relative w-28 h-28 md:w-36 md:h-36">
                                        <Image
                                            src={productOrder.product.images[0].url}
                                            alt={productOrder.product.name}
                                            fill={true}
                                            sizes="100%"
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-5">
                                        <div className="space-y-1">
                                            <p className="font-semibold opacity-80">{productOrder.product.name}</p>
                                            <p className="text-sm opacity-75">${productOrder.product.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm opacity-75">Quantity {productOrder.product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="h-px bg-light-400 w-full md:hidden"></div>

                <div className="w-full px-5 py-5 md:px-0 md:py-10 md:pl-5">
                    <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center justify-between">
                            <p className={'font-semibold opacity-75 text-sm md:text-base'}>Price</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <p className={Class.PriceListDownTitle}>Sub-Total</p>
                                <p className={Class.PriceListDownValue}>${order.payment?.sub_price}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className={Class.PriceListDownTitle}>Shipping</p>
                                <p className={Class.PriceListDownValue}>{order.payment?.shipping_price! > 0 && '$'}{order.payment?.shipping_price}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className={Class.PriceListDownTitle}>Tax</p>
                                <p className={Class.PriceListDownValue}>{order.payment?.tax_price! > 0 && '$'}{order.payment?.tax_price}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className={'font-semibold opacity-75 text-sm md:text-base'}>Total</p>
                            <p className={'font-semibold opacity-75 text-sm md:text-base'}>${order.payment?.total_price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="h-px bg-light-400 w-full"></div> */}

            <div className="py-5 px-5  rounded border border-light-400 bg-white/50 shadow-lg">
                <div>
                    <ShippingProcess shipping={order.shipping!} />
                </div>
            </div>

        </div>
    )
}

export default OrderTracking;